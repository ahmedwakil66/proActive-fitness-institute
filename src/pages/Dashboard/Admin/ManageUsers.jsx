import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";


const ManageUsers = () => {
    const { loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();

    const { data: persons = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data;
        }
    })

    return (
        <div className="my-container mt-sec mb-sec">
            <h1 className="title-sec">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-base">
                            <th># of {persons?.length}</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            persons.map((person, index) => <TableRow key={person._id} person={person} index={index} refetch={refetch} axiosSecure={axiosSecure}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TableRow = ({ person, index, refetch, axiosSecure }) => {
    const { _id, name, image, email, role } = person;

    const handleRoleChange = (role) => {
        const toastId = toast.loading('Updating')
        axiosSecure.patch(`/users/${_id}`, { role: role })
            .then(resData => {
                toast.remove(toastId);
                refetch();
                if (resData.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${name} is now ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => toast.error(error.message, { id: toastId }))
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14">
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{email}</div>
                    </div>
                </div>
            </td>

            <td>
                <small className={`${role === 'admin' ? 'font-bold' : role === 'instructor' ? 'font-semibold' : ''}`}>{role?.toUpperCase()}</small>
            </td>

            <th>
                <button
                    onClick={() => handleRoleChange('instructor')}
                    disabled={role === 'instructor'}
                    className="btn block max-w-[150px] btn-outline btn-ghost btn-xs"
                >
                    Make Instructor
                </button>

                <button
                    onClick={() => handleRoleChange('admin')}
                    disabled={role === 'admin'}
                    className="btn block max-w-[150px] btn-outline btn-ghost btn-xs my-1"
                >
                    Make Admin
                </button>

                <button
                    onClick={() => handleRoleChange('student')}
                    disabled={role === 'student'}
                    className="btn block max-w-[150px] btn-outline btn-ghost btn-xs"
                >
                    Reset
                </button>
            </th>
        </tr>
    )
}

export default ManageUsers;