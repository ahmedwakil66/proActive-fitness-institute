import CarouselHome from "./CarouselHome";
import FitnessShop from "./FitnessShop";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";

const Home = () => {
    return (
        <>
            <CarouselHome />
            <div className="my-container mb-sec">
                <PopularClasses />
                <PopularInstructors />
                <FitnessShop />
            </div>
        </>
    );
};

export default Home;