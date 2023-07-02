import { useLoaderData } from "react-router-dom";
import SendPrivateMessage from "../../components/SendPrivateMessage";
import { useEffect, useState } from "react";
import baseUrl from "../../utilities/URLs";
import ClassCard from "../../components/ClassCard";
import useUser from "../../hooks/useUser";

const InstructorProfile = () => {
    const { person, isLoading } = useUser();
    const instructor = useLoaderData();
    const { name, image, email, role } = instructor;

    const [hisClasses, setHisClasses] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/classes?email=${email}`)
            .then(res => res.json())
            .then(data => setHisClasses(data))
    }, [email])

    return (
        <div className='my-container mt-sec mb-sec'>
            <h1 className="title-sec">Instructor {name}{"'"}s Overview and Classes</h1>

            <div className="flex flex-wrap gap-7 justify-evenly mt-8 bg-slate-100 rounded-lg p-8 max-w-3xl mx-auto">
                <img src={image} alt={name} className="rounded-xl max-w-xs" />
                <div>
                    <h3 className="font-semibold text-xl md:text-2xl tracking-wider">{name}</h3>
                    <p><span className="font-bold">Email:</span> {email}</p>
                    <p><span className="font-bold">Role:</span> {role}</p>
                    {!isLoading && <SendPrivateMessage sender={person.email} receiver={instructor.email}/>}
                </div>
            </div>

            <div className="mt-sec">
                <h2 className="title-sec">All Classes</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {hisClasses.map(cls => <ClassCard key={cls._id} cls={cls} person={person} isLoading={isLoading} />)}
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;