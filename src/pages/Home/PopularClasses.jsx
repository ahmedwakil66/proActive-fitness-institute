import PopularClassCard from "../../components/PopularClassCard";
import useClasses from "../../hooks/useClasses";

const PopularClasses = () => {
    const {approvedClasses} = useClasses();
    
    return (
        <div className="my-container mt-sec">
            <h2 className="title-sec">Our Most Popular Classes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedClasses.slice(0, 6).map(approvedClass => <PopularClassCard key={approvedClass._id} approvedClass={approvedClass}/>)}
            </div>
        </div>
    );
};

export default PopularClasses;