import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import baseUrl from "../../utilities/URLs";

const PopularInstructors = () => {

    const [popTrainers, setPopTrainers] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/popular-instructors`)
            .then(res => res.json())
            .then(data => setPopTrainers(data))
            .catch(error => console.log(error))
    }, [])


    return (
        <div className="my-container mt-sec">
            <h2 className="title-sec">Our Most Popular Instructors</h2>
            <div className="hidden sm:block">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    // centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        popTrainers.map(popTrainer => {
                            const { _id, name, image } = popTrainer;
                            return <SwiperSlide key={_id}>
                                <Link to={'/'} className="block relative">
                                    <img src={image} alt="" className="w-full border-4 border-black rounded-lg" />
                                    <p className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg transition-all"></p>
                                    <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl hover:text-2xl text-center font-semibold transition-all">{name}</h3>
                                </Link>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            <div className="sm:hidden">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    // centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        popTrainers.map(popTrainer => {
                            const { _id, name, image } = popTrainer;
                            return <SwiperSlide key={_id}>
                                <Link to={'/'} className="block relative">
                                    <img src={image} alt="" className="w-full border-4 border-black rounded-lg" />
                                    <p className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg transition-all"></p>
                                    <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl hover:text-2xl text-center font-semibold transition-all">{name}</h3>
                                </Link>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default PopularInstructors;