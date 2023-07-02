import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../utilities/URLs";

const InstructorCard = ({ instructor }) => {
    const navigate = useNavigate();
    const { _id, name, image, email } = instructor;
    const [hisClasses, setHisClasses] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/classes?email=${email}`)
            .then(res => res.json())
            .then(data => setHisClasses(data))
    }, [email])

    return (
        <div className="card sm:card-side sm:flex-row-reverse bg-base-100 shadow-xl">
            <figure className="sm:rounded-ss-none sm:rounded-bl-none lg:flex-1">
                <img src={image} alt="Instructor" className="h-full rounded-xl sm:rounded-ss-none sm:rounded-bl-none" />
            </figure>
            <div className="card-body lg:flex-1">
                <h2 className="card-title">{name}</h2>
                <p>Email: {email}</p>
                <div>
                    <h3 className="font-semibold">{hisClasses.length} Available Classes -</h3>
                    <ol>
                        {hisClasses.map(hisClass => <li key={hisClass._id}><Link to={`/classes/${hisClass._id}`}>{hisClass.name}</Link></li>)}
                    </ol>
                </div>
                <div className="card-actions justify-end mt-3">
                    <button onClick={() => navigate(`/instructors/${_id}`)} className="btn btn-accent btn-block">Show All Classes</button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;