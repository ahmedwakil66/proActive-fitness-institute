import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

const useMessageSenders = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();

    const { data: senders = [] } = useQuery({
        enabled: !loading,
        queryKey: ['messages-senders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/messages-senders/${user?.email}`);
            return res.data?.senders;
        }
    })

    return {senders}
};

export default useMessageSenders;