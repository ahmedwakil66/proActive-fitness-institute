import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
    const { resetPassword } = useAuth();

    const handlePasswordReset = () => {
        Swal.fire({
            title: 'Enter your email address',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            resetPassword(result.value)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'A password reset link has been sent to your email',
                    })
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        text: error.message,
                    })
                })
        })
    }

    return (
        <div>
            <button
                onClick={handlePasswordReset}
                type="button"
                className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
                Forgot Password?
            </button>
        </div>
    );
};

export default ResetPassword;