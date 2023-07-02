import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const {user, loading} = useAuth();
    const {axiosSecure} = useAxiosSecure();

    const {data: person = {}, refetch, isLoading} = useQuery({
        enabled: !loading,
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-by-email/${user?.email}`)
            return res.data;
        }
    })
    
    return {person, refetch, isLoading}
};

export default useUser;