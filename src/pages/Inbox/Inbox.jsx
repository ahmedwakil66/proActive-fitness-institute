import { useNavigation, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SendInputMessage from "../../components/SendInputMessage";
import { useQuery } from "@tanstack/react-query";

const Inbox = () => {
    const chatContainerRef = useRef();
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const navigation = useNavigation();
    const senderEmail = useParams().senderEmail;

    const { data: messages = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ['messages', senderEmail],
        queryFn: async () => {
            const res = await axiosSecure.post(`/messages-by-relation`, { relation: [senderEmail, user.email] });
            return res.data;
        }
    })

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages.length]);

    if (loading || navigation.state === 'loading') { return <p className="text-2xl text-center mt-6 font-semibold">Loading...</p> }

    return (
        <div>
            <h1 className="title-sec">Inbox</h1>
            <div ref={chatContainerRef} className="flex flex-col max-w-3xl max-h-[70vh] overflow-x-hidden overflow-y-auto mx-auto border rounded-lg p-4 font-semibold">
                {
                    messages.map(message => <Message key={message._id} message={message} user={user} />)
                }
            </div>
            <div className="max-w-3xl mx-auto mt-3">
                <SendInputMessage sender={user.email} receiver={senderEmail} reFetch={refetch} />
            </div>
        </div>
    );
};

const Message = ({ user, message }) => {
    const { sender, message: text } = message;

    return (
        <p
            className={`border px-5 py-2 max-w-[280px] sm:max-w-xl rounded-2xl w-fit my-1
                ${sender === user.email ?
                    'rounded-br-none self-end' :
                    'rounded-tl-none'
                }
            `}
        >
            {text}
        </p>
    )
}

export default Inbox;