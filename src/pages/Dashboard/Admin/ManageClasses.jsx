import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClasses from "../../../hooks/useClasses";
import Swal from "sweetalert2";


const ManageClasses = () => {
    const { classes, refetch } = useClasses();
    const { axiosSecure } = useAxiosSecure();

    return (
        <div className="my-container mt-sec mb-sec">
            <h1 className="title-sec">Manage Classes</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-base">
                            <th># of {classes?.length}</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Class Stats</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((singleClass, index) => <TableRow key={singleClass._id} singleClass={singleClass} index={index} refetch={refetch} axiosSecure={axiosSecure} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TableRow = ({ singleClass, index, refetch, axiosSecure }) => {
    const { _id, name, image, instructor_name, instructor_email, total_seats, enrolled_count, price, status } = singleClass;

    const handleStatusChange = async (status) => {
        const toastId = toast.loading('Updating')
        await axiosSecure.patch(`/classes/${_id}`, { status: status })
            .then(resData => {
                console.log(resData);
                if (resData.data.modifiedCount) {
                    refetch();
                    toast.success('Status Updated', { id: toastId });
                }
            })
            .catch(error => toast.error(error.message, { id: toastId }))
    }

    const handleSendFeedback = () => {
        Swal.fire({
            title: `Write your feedback for class: ${name}`,
            imageUrl: image,
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Send Feedback',
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                return axiosSecure.patch(`/classes/${_id}`, { feedback: inputValue })
                    .then(resData => resData)
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result)
            if(result.isConfirmed){
                if (result.value.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: `Feedback successfully sent`,
                        imageUrl: image
                    })
                }
            }
        })
    }



    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-24 h-24">
                        <img src={image} alt={name} />
                    </div>
                </div>
            </td>

            <td> {name} </td>

            <td>
                <p><span className="font-semibold">Name:</span> {instructor_name}</p>
                <p><span className="font-semibold">Email:</span> {instructor_email}</p>
            </td>

            <td> ${price} </td>

            <td>
                <p className="flex justify-between"><span className="font-semibold">Total Seats:</span> {total_seats}</p>
                <p className="flex justify-between"><span className="font-semibold">Enrolled Count:</span> {enrolled_count}</p>
                <p className="flex justify-between"><span className="font-semibold">Available Seats:</span> {total_seats - enrolled_count}</p>
            </td>

            <td>
                <span
                    className={`badge pb-1 font-semibold 
                    ${status === 'pending' ?
                            'badge-neutral' :
                            status === 'approved' ?
                                'badge-success' :
                                'badge-error'
                        }`}
                >
                    {status}
                </span>
            </td>

            <th>
                <button
                    onClick={() => handleStatusChange('denied')}
                    disabled={status !== 'pending'} 
                    className="btn block max-w-[150px] btn-outline btn-ghost btn-xs"
                >
                    Deny
                </button>

                <button
                    onClick={() => handleStatusChange('approved')}
                    disabled={status !== 'pending'} 
                    className="btn block max-w-[150px] btn-outline btn-ghost btn-xs my-1"
                >
                    Approve
                </button>

                <button
                    onClick={handleSendFeedback}
                    className="btn block max-w-[150px] btn-outline btn-ghost btn-xs"
                >
                    Send Feedback
                </button>
            </th>
        </tr>
    )
}

export default ManageClasses;