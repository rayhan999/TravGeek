import {
    faBook,
    faCog,
    faCommentDots,
    faFileMedical,
    faListUl,
    faShoppingCart,
    faSignOutAlt,
    faUserCircle,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import Logo from '../../../images/TravGeek.jpg';
import { handleSignOut, initializeLoginFramework } from '../../Login/LoginManager';
import SidebarLoader from './SidebarLoader.js';

const Sidebar = ({ show, adminLoading, setShowSidebar }) => {
    const { isAdmin, setLoggedInUser } = useContext(UserContext);
    const { panel } = useParams();
    const signOut = () => {
        initializeLoginFramework();
        handleSignOut()
            .then(res => {
                setLoggedInUser(res)
                toast.error('Logged Out!');
            })
    }
    return (
        <nav id="sidebar" className={show ? "active" : ""}>
            <div className="sidebar-header d-flex">
                <img
                    alt="Logo"
                    src={Logo}
                    width="42"
                    height="42"
                    className="d-inline-block align-top"
                />{' '}
                <h2 className="d-inline-block"><Link to="/">TravGeek</Link></h2>
                <button
                    onClick={() => setShowSidebar(!show)}
                    type="button" id="sidebarCollapse"
                    className={show ? "navbar-btn active d-block ml-3" : "navbar-btn d-none"}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            {adminLoading ? <SidebarLoader /> :
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard/profile" className={panel === "profile" ? "link-active" : ""}>
                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "1.3rem" }} /> <span>Profile</span>
                        </Link>
                    </li>
                    {isAdmin ?
                        <>
                            <li>
                                <Link to="/dashboard/orderList" className={panel === "orderList" ? "link-active" : ""} data-toggle="collapse">
                                    <FontAwesomeIcon icon={faListUl} /> <span>Order List</span>
                                </Link>
                                
                            </li>
                            <li>
                                <Link to="/dashboard/addService" className={panel === "addService" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faFileMedical} /> <span>Add Service</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/makeAdmin" className={panel === "makeAdmin" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manageServices" className={panel === "manageServices" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faCog} /> <span>Manage Services</span>
                                </Link>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link to="/dashboard/book" className={panel === "book" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> <span>Book</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/bookingList" className={panel === "bookingList" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faBook} /> <span>Booking List</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/review" className={panel === "review" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faCommentDots} /> <span>Review</span>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            }
            <ul className="list-unstyled nav-footer">
                <li>
                    <Link className="back-home btn-main text-white" onClick={signOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;