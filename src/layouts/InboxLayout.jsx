import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar";
import useMessageSenders from "../hooks/useMessageSenders";


const InboxLayout = () => {
    const {senders} = useMessageSenders();

    return (
        <div>
            <NavBar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-neutral btn-xs drawer-button lg:hidden">Open Side Panel</label>
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content inbox-nav">
                        {/* Sidebar content here */}
                        {
                            senders.map(sender => <li key={sender._d}>
                                <NavLink to={`/user/inbox/message/${sender.email}`}>{sender.name}</NavLink>
                            </li>)
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default InboxLayout;