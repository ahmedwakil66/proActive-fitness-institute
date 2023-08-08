import { Link, NavLink } from 'react-router-dom';
import Themes from '../../components/Themes';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const { person } = useUser()

    return (
        <div className='nav-link'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/instructors'}>Instructors</NavLink></li>
                            <li><NavLink to={'/classes'}>Classes</NavLink></li>
                            <li><NavLink to={'/dashboard'}>Dashboard </NavLink></li>
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost normal-case text-xl select-none">ProActive</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/instructors'}>Instructors</NavLink></li>
                        <li><NavLink to={'/classes'}>Classes</NavLink></li>
                        <li><NavLink to={'/dashboard'}>Dashboard </NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Themes />

                    {!user && <Link to={'/sign-in'} className="btn btn-sm">Login</Link>}

                    {user && <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={person?.image} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                                <li>
                                    <Link to={'/user/profile'} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link to={'/user/inbox'}>Inbox</Link></li>
                                <li><Link to={'/user/setting'}>Settings</Link></li>
                                <li><button onClick={logOut}>Logout</button></li>
                            </ul>
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    );
};

export default NavBar;