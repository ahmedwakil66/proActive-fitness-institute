import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='text-center' style={style}>
                <p className=' text-2xl pt-6 pb-3'>Page Not Found!</p>
                <button onClick={() => navigate(-1)} className='btn btn-outline btn-sm'>Go Back</button>
            </div>
        </div>
    );
};

const style = {
    "width": "100vw",
    "height": "100vh",
    "background-color": "#ffffff",
    "background-image": "url('https://i.ibb.co/Bfvcff8/404.jpg')",
    "background-position": "center",
    "background-repeat": "no-repeat"
}

export default ErrorPage;