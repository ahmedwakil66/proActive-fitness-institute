import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import addOrRemoveBooking from "../../../utilities/addOrRemoveBooking";
import useBookedClasses from "../../../hooks/useBookedClasses";

const SelectedClasses = () => {
    const { user } = useAuth();
    const {bookedClasses, refetch} = useBookedClasses();
    const navigate = useNavigate();

    return (
        <div className="my-container mt-sec">
            <h2 className="title-sec">Your All Booked Classes</h2>
            <div className="overflow-x-auto">
                <table className="table max-w-3xl mx-auto">
                    <thead>
                        <tr className="text-base">
                            <th>#</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedClasses.map((bClass, index) => <TableRow key={bClass._id} bookedClass={bClass} index={index} email={user?.email} refetch={refetch} />)}
                    </tbody>
                    <tfoot>
                        <tr className="bg-base-200 text-base">
                            <td colSpan={4} className="text-end font-semibold">Total</td>
                            <td className="">${bookedClasses.reduce((sum, current) => sum + current.price, 0)}</td>
                            <td className="text-center">
                                <button
                                    onClick={ () => navigate('/dashboard/payment')}
                                    disabled={bookedClasses.length === 0}
                                    className="btn btn-sm btn-accent"
                                >
                                    pay
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

const TableRow = ({ bookedClass, index, email, refetch }) => {
    const { _id, name, instructor_name, price, total_seats, enrolled_count } = bookedClass;
    const availableSeats = total_seats - enrolled_count;

    const handleRemove = async () => {
        await addOrRemoveBooking(_id, email, 'Removed from booking');
        refetch();
    }

    return (
        <tr className={availableSeats === 0 ? 'bg-red-200' : ''}>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{instructor_name}</td>
            <td>{availableSeats}</td>
            <td>${price}</td>
            <td className="text-center">
                <button
                    onClick={handleRemove}
                    className="btn btn-xs btn-neutral"
                    title="Remove booking"
                    disabled={availableSeats === 0}
                >
                    X
                </button>
            </td>
        </tr>
    )
}

export default SelectedClasses;