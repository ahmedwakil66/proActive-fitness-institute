import addOrRemoveBooking from "../utilities/addOrRemoveBooking";

const ClassCard = ({ cls, person, refetch, isLoading }) => {
    const { _id, name, image, instructor_name, total_seats, enrolled_count, price, status } = cls;
    const { email, booked_classes, enrolled_classes, role } = person;
    const handleToggle = async () => {
        let text;
        if (booked_classes.indexOf(_id) === -1) {
            text = 'Booking Successful'
        } else {
            text = 'Removed from booking'
        }
        await addOrRemoveBooking(_id, email, text);
        if (refetch) {
            refetch();
        }
    }

    if (status === 'pending') { return null }
    if (status === 'denied') { return null }

    return (
        <div className={`card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all ${(total_seats - enrolled_count) === 0 && 'bg-red-200'}`}>
            <figure className="h-[250px] overflow-hidden"><img src={image} alt="" className="w-full h-full"/></figure>
            <div className="card-body">
                <h1 className="card-title">{name}</h1>
                <h2>Instructor: {instructor_name}</h2>
                <h3>Available seats: {total_seats - enrolled_count}</h3>
                <h4>Price: ${price}</h4>

                <div className="card-actions justify-center mt-3">
                    {
                        (!isLoading && person.role === 'student') &&
                        <button
                            onClick={handleToggle}
                            disabled={person.enrolled_classes.indexOf(_id) !== -1 || total_seats - enrolled_count === 0}
                            className={`btn btn-block btn-accent ${booked_classes.indexOf(_id) !== -1 ? 'btn-error' : ''}`}
                        >
                            {booked_classes.indexOf(_id) !== -1 ? 'Remove Booking' : enrolled_classes.indexOf(_id) !== -1 ? 'Already Enrolled' : "Enroll Now"}
                        </button>
                    }
                    {
                        role !== 'student' &&
                        <p className="btn btn-block ">An {role} can not buy a class</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default ClassCard;