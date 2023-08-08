import { Link } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../../../hooks/useUser";

const AdminHome = () => {
    const {person} = useUser();

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute('data-theme', 'dark');
    }, [])

    const bgStyle = {
        backgroundImage: `url(${person?.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div className={`grid sm:grid-cols-2 min-h-[93vh]`}>

            <div className={`flex flex-col items-center justify-center bg-slate-300`} style={bgStyle}>
                <div className="h-full w-full text-white flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, .7)' }}>
                    <h1 className="text-2xl font-semibold text-center hover:animate-ping">Welcome Admin!</h1>
                    <h3 className="text-lg text-center hover:animate-ping">What you want to do?</h3>
                </div>
            </div>

            <div style={bgStyle}>
                <Link to={'/dashboard/manage-classes'}>
                    <button className="h-[50%] w-full text-slate-500  text-xl font-semibold hover:text-white hover:text-2xl transition-all flex justify-center items-center gap-3" style={{ backgroundColor: 'rgba(0, 0, 0, .93)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="1.15em" viewBox="0 0 512 512"><path d="M152.2 236.4c-7.7-8.2-19.7-7.7-24.8 2.8L1.6 490.2c-5 10 2.4 21.7 13.4 21.7h175c5.8.1 11-3.2 13.4-8.4 37.9-77.8 15.1-196.3-51.2-267.1zM244.4 8.1c-122.3 193.4-8.5 348.6 65 495.5 2.5 5.1 7.7 8.4 13.4 8.4H497c11.2 0 18.4-11.8 13.4-21.7 0 0-234.5-470.6-240.4-482.3-5.3-10.6-18.8-10.8-25.6.1z" /></svg>
                        <span>Manage Classes</span>
                    </button>
                </Link>

                <Link to={'/dashboard/manage-users'}>
                    <button className="h-[50%] w-full text-slate-500 text-xl font-semibold hover:text-white hover:text-2xl transition-all flex justify-center items-center gap-3" style={{ backgroundColor: 'rgba(0, 0, 0, .93)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="1.15em" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>
                        <span>Manage Users</span>
                    </button>
                </Link>
            </div>

        </div>
    );
};


export default AdminHome;