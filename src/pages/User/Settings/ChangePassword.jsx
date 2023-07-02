import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const { changePassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handlePasswordChange = (data) => {
        const toastId = toast.loading('Updating');
        changePassword(data.newPassword)
        .then(() => {
            toast.remove(toastId);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Password changed',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(error => toast.error(error.message, {id: toastId}))
    }


    return (
        <details className="bg-slate-100 p-4 rounded-lg">
            <summary className="select-none cursor-pointer">Change password</summary>
            <form onSubmit={handleSubmit(handlePasswordChange)} className="max-w-xl mx-auto pb-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Enter new password:</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        {...register("newPassword", { required: true, minLength: 6 })}
                    />
                    {errors.newPassword?.type === 'minLength' && <p role="alert" className="text-xs">Password must be at least 6 characters long.</p>}
                    {errors.newPassword?.type === 'required' && <p role="alert" className="text-xs">This field is required</p>}

                    <button disabled={errors.newPassword} className="btn btn-neutral btn-outline btn-sm mt-3">Submit</button>
                </div>
            </form>
        </details>
    );
};

export default ChangePassword;