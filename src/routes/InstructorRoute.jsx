import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const InstructorRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    const {person, isLoading} = useUser();

    if ( user && person.role === 'instructor') { return children }

    if (loading || (user && isLoading)) {
        return <Loader />
    } 

    if(!user){
        toast('You must Login first!');
    } else {
        toast('You must be a registered Instructor!');
    }
    
    return <Navigate to={'/sign-in'} state={{ from: location }}></Navigate>
};

export default InstructorRoute;