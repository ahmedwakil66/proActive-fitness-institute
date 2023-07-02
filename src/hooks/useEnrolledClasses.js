import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEnrolledClasses = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();

    const { data: enrolledClasses = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ['booked-classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/enrolled?email=${user?.email}`);
            return res.data;
        }
    })

    return { enrolledClasses, refetch }
};

export default useEnrolledClasses;