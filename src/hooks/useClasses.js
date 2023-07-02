import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
    const { axiosSecure } = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    })

    const approvedClasses = classes.filter(approvedClass => approvedClass.status === 'approved');
    const pendingClasses = classes.filter(pendingClass => pendingClass.status === 'pending');
    const deniedClasses = classes.filter(deniedClass => deniedClass.status === 'denied');

    return { classes, approvedClasses, pendingClasses, deniedClasses, refetch }
}

export default useClasses;