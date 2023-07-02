import useUser from "../../../hooks/useUser";

const Profile = () => {
    const {person} = useUser();

    return (
        <div className='my-container mt-sec mb-sec'>
            <h1 className="title-sec">Your Profile</h1>
            <div className="flex flex-wrap gap-7 justify-evenly mt-8 bg-slate-100 rounded-lg p-8 max-w-3xl mx-auto">
                <img src={person?.image} alt={person?.name} className="rounded-xl max-w-xs"/>
                <div className="">
                    <h3 className="font-semibold text-xl md:text-2xl tracking-wider">{person?.name}</h3>
                    <p><span className="font-bold">Email:</span> {person?.email}</p>
                    <p><span className="font-bold">Role:</span> {person?.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;