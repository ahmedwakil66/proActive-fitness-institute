import { Link } from "react-router-dom";

const InstructorHome = () => {
    return (
        <div className="grid sm:grid-cols-2 min-h-[92vh]">

            <div className="flex flex-col items-center justify-center bg-slate-300">
                <div className="hover:animate-ping">
                    <h1 className="text-2xl font-semibold text-center">Welcome Instructor!</h1>
                    <h3 className="text-lg text-center">What you want to do?</h3>
                </div>
            </div>

            <div className="bg-orange-300">
                <Link to={'/dashboard/add-a-class'}>
                    <button className="h-[50%] w-full border-b border-orange-400 text-xl font-semibold hover:bg-orange-400 flex justify-center items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.15em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                        <span>Add a Class</span>
                    </button>
                </Link>

                <Link to={'/dashboard/my-classes'}>
                    <button className="h-[50%] w-full border-t border-orange-400 text-xl font-semibold hover:bg-orange-400 flex justify-center items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.15em" viewBox="0 0 512 512"><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                        <span>My Classes</span>
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default InstructorHome;