import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../utilities/URLs";

const MyClasses = () => {
    const { user } = useAuth();
    const [myClasses, setMyClasses] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/classes?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyClasses(data))
    }, [user?.email])


    return (
        <div className="my-container mt-sec mb-sec">
            <h1 className="text-2xl font-semibold text-center">My Classes</h1>
            <div className="overflow-x-auto mt-6">
                <table className="table bg-slate-100 max-w-4xl mx-auto">
                    {/* head */}
                    <thead className="text-base">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myClasses.map((myClass, index) => <MyClassesRow key={myClass._id} myClass={myClass} index={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MyClassesRow = ({ myClass, index }) => {
    const { _id, name, status, enrolled_count, feedback } = myClass;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td><span
                className={`badge ${status === 'pending' 
                ? 'badge-accent' 
                : status === 'approved' 
                ? 'badge-success' 
                : 'badge-error'}`}
            >
                {status}
            </span></td>
            <td>{enrolled_count}</td>
            <td>{feedback || <small>NOT APPLICABLE</small>}</td>
            <td><button className="btn btn-xs btn-outline">Update</button></td>
        </tr>
    )
}

export default MyClasses;