import loader from '../assets/loader.gif'

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
            <img src={loader} alt="" />
        </div>
    );
};

export default Loader;