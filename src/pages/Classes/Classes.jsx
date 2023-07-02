import ClassCard from "../../components/ClassCard";
import useClasses from "../../hooks/useClasses";
import useUser from "../../hooks/useUser";


const Classes = () => {
    const { person, refetch, isLoading } = useUser();
    const { classes } = useClasses();

    return (
        <div className="my-container mt-sec mb-sec">
            <h2 className="title-sec">Our Classes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {classes.map(cls => <ClassCard key={cls._id} cls={cls} person={person} refetch={refetch} isLoading={isLoading} />)}
            </div>
        </div>
    );
};


export default Classes;