import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const StudentRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    const {person, isLoading} = useUser();

    if ( user && person.role === 'student') { return children }

    if (loading || (user && isLoading)) {
        return <Loader />
    } 

    if(!user){
        toast('You must Login first!');
    } else {
        toast('You must be a registered student!');
    }
    
    return <Navigate to={'/sign-in'} state={{ from: location }}></Navigate>
};

export default StudentRoute;