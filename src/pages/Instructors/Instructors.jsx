import { useQuery } from "@tanstack/react-query";
import InstructorCard from "../../components/InstructorCard";
import baseUrl from "../../utilities/URLs";

const Instructors = () => {
    const {data: instructors = []} = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = fetch(`${baseUrl}/instructors`);
            return (await res).json();
        }
    });

    return (
        <div className="my-container mt-sec mb-sec">
            <h2 className="title-sec">Our Instructors</h2>
            <div className="grid lg:grid-cols-2 gap-6">
                {instructors.map(instructor => <InstructorCard key={instructor._id} instructor={instructor}/>)}
            </div>
        </div>
    );
};

export default Instructors;