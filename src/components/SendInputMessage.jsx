
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-hot-toast";


const SendInputMessage = ({ sender, receiver, reFetch }) => {
    const { register, handleSubmit, reset } = useForm()
    const { axiosSecure } = useAxiosSecure();
    const [disable, setDisable] = useState(false);

    const handleSendMessage = (data) => {
        setDisable(true);
        const toastId = toast.loading('Sending message')
        axiosSecure.post('/messages', { message: data.text, sender, receiver })
            .then(data => {
                if (data.data.insertedId) {
                    reset();
                    reFetch();
                    setDisable(false);
                    toast.success('Message sent', {id: toastId})
                }
            })
            .catch(error => {
                toast.error(error.message, {id: toastId});
                setDisable(false);
            })
    }

    return (
        <form onSubmit={handleSubmit(handleSendMessage)} className="grid gap-4" style={{ gridTemplateColumns: '3fr 1fr' }}>
            <textarea rows="1" className="textarea textarea-accent w-full" placeholder="Type here..." {...register("text", { required: true })}></textarea>

            <button
                disabled={disable}
                className="btn btn-outline btn-sm h-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
                <span>Send Message</span>
            </button>
        </form>
    );
};

export default SendInputMessage;