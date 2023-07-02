import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (user) { return children }

    if (loading) {
        return <Loader />
    }

    toast('You must Login first!');
    
    return <Navigate to={'/sign-in'} state={{ from: location }}></Navigate>
};

export default PrivateRoute;