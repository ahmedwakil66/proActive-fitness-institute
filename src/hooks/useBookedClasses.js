import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useBookedClasses = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();

    const { data: bookedClasses = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ['booked-classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/booked?email=${user?.email}`);
            return res.data;
        }
    })
    
    return { bookedClasses, refetch }
};

export default useBookedClasses;