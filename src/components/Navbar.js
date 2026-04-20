import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../css/Navbar.css';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { useState } from "react";
import Hamburger from 'hamburger-react';
import Logo from '../assets/Indore Logo.png';

const Navbar = (props) =>{
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isLoggedIn = token!==null;
    return(
        <div className="main-container">
            <div className="navbar-container">
                <Link to="/" className="nav-link">
                    <img src={Logo} className="title"></img>
                </Link>
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={20}/>
                </div>
                <nav className={`mobile-menu ${menuOpen ? "active" : ""}`}>
                    <ul className="ul-link ">
                        <Link to="/" className="nav-link" onClick={()=>setMenuOpen(false)}>Home</Link>
                        <Link to="aboutcity" className="nav-link" onClick={()=>setMenuOpen(false)}>About City</Link>
                        <Link to="viewrating" className="nav-link" onClick={()=>setMenuOpen(false)}>View Ratings</Link>
                        <Link to="reportissue" className="nav-link" onClick={()=>setMenuOpen(false)}>Report Issue</Link>
                        <Link to="cityservices" className="nav-link" onClick={()=>setMenuOpen(false)}>City Services</Link>
                    </ul>
                </nav>
                <div className="login-signup">
                    { !isLoggedIn &&
                        <Link to="/login" className="nav-link">
                            <button className="login-btn" onClick={()=>setMenuOpen(false)}>
                                Log In
                            </button>
                        </Link>
                    }
                    { !isLoggedIn &&
                        <Link to="/signup" className="nav-link">
                            <button className="signup-btn" onClick={()=>setMenuOpen(false)}>
                                Sign Up
                            </button>
                        </Link>
                    }
                    { isLoggedIn &&
                        <div className="nav-link">
                            <button className="logout-btn" onClick={()=>{dispatch(logout());
                            dispatch(setUser(null));
                            toast.success("Logged Out");
                            navigate("/");
                            }} className="logout-btn">
                                    Log Out
                            </button>
                        </div>
                    }
                    { isLoggedIn &&
                        <Link to="/dashboard" className="nav-link">
                            <button className="dashboard-btn" onClick={()=>setMenuOpen(false)}>
                                DashBoard
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}
export default Navbar