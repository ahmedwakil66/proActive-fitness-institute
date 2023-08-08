import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import imageUploader from "../../../utilities/imageUploader";

const AddAClass = () => {
    const { user } = useAuth();
    const {axiosSecure} = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddClass = async (data) => {
        const { name, total_seats, price } = data;
        const toastId = toast.loading('Uploading image');

        const newClass = {
            name,
            category: 'sports',
            instructor_name: user.displayName,
            instructor_email: user.email,
            total_seats: parseInt(total_seats),
            price: Number(price),
            issued_at: new Date().getTime(),
            enrolled_count: 0,
            enrolled_students: {},
            status: 'pending',
            feedback: null
        }
        console.log(newClass);

        try {
            const resData = await imageUploader(data.image[0]);
            if (resData.isStored) {
                toast.loading('Uploading class information', { id: toastId });
                newClass.image = resData.cdnUrl;
                const res = await axiosSecure.post('/classes', newClass)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your class is submitted and waiting for approval.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message, { id: toastId })
        }
        finally {
            toast.remove(toastId)
        }

    }

    return (
        <div className="bg-[url(https://ucarecdn.com/e0b1b730-4ff9-4928-b736-5c5d979724b4/)] bg-no-repeat bg-cover bg-center pt-sec pb-sec">
            <div className="my-container">
                <h1 className="text-2xl font-semibold text-center">Add a Class</h1>
                <form onSubmit={handleSubmit(handleAddClass)} className="max-w-lg mx-auto mt-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="font-semibold">What is your class name?</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("name", { required: true })} />
                        {errors.name && <p role="alert" className="text-xs">This field is required.</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="font-semibold">Instructor name</span>
                        </label>
                        <input type="text" className="input input-bordered w-full" defaultValue={user?.displayName} readOnly />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="font-semibold">Instructor email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full" defaultValue={user?.email} readOnly />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="font-semibold">Available seats?</span>
                        </label>
                        <input type="text" placeholder="Numbers only" className="input input-bordered w-full" {...register("total_seats", { required: true })} />
                        {errors.total_seats && <p role="alert" className="text-xs">This field is required.</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="font-semibold">Price?</span>
                        </label>
                        <input type="text" placeholder="Numbers only" className="input input-bordered w-full" {...register("price", { required: true })} />
                        {errors.price && <p role="alert" className="text-xs">This field is required.</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Pick a file</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image", { required: true })} />
                        {errors.image && <p role="alert" className="text-xs">This field is required.</p>}
                    </div>

                    <button className="btn btn-block btn-neutral mt-8">Add Class</button>
                </form>
            </div>
        </div>

    );
};

export default AddAClass;