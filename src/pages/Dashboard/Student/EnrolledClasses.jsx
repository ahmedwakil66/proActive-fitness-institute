import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const EnrolledClasses = () => {
    const { enrolledClasses } = useEnrolledClasses();

    return (
        <div className="my-container mt-sec">
            <h2 className="title-sec">Your All Enrolled Classes</h2>
            <div className="overflow-x-auto">
                <table className="table max-w-3xl mx-auto">
                    <thead>
                        <tr className="text-base">
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Total Seats</th>
                            <th>Total Enrolled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledClasses.map((enClass, index) => <TableRow key={enClass._id} enrolledClass={enClass} index={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TableRow = ({enrolledClass, index}) => {
    const { name, instructor_name, total_seats, enrolled_count } = enrolledClass;

    return(
        <tr>
            <th>{index+1}</th>
            <td>{name}</td>
            <td>{instructor_name}</td>
            <td>{total_seats}</td>
            <td>{enrolled_count}</td>
        </tr>
    )
}

export default EnrolledClasses;