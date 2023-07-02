import { Link } from "react-router-dom";

const PopularClassCard = ({approvedClass}) => {
    return (
        <Link>
            <div className="card bg-base-100 shadow-xl hover:scale-105 transition-[3s]">
                <figure><img src={approvedClass.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title block w-full text-center">{approvedClass.name}</h2>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PopularClassCard;

