import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import saveNewUserToDatabase from "../utilities/saveNewUserToDatabase";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const SocialSignIn = ({from}) => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(async (result) => {
                const user = result.user;
                if (user) {
                    const newUser = {name: user.name, email: user.email, image: user.photoURL, role: 'student', enrolled_classes: [], isBanned: false, booked_classes: [] }
                    await saveNewUserToDatabase(newUser);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login Successful!',
                        color: '#FFF',
                        background: '#3D4451',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary hover:btn-info">Login With Google</button>
        </div>
    );
};

export default SocialSignIn;