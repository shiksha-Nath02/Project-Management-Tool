// NavBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"; // optional

const NavBar = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">Project Management</h2>
            <ul className="nav-links">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/project" className={({ isActive }) => (isActive ? "active" : "")}>
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/newproject" className={({ isActive }) => (isActive ? "active" : "")}>
                        Admin Portal
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                        Signup
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
