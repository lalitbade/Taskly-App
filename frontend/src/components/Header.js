import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaTasks, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);

        // Handle clicks outside the menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuVisible(prev => !prev);
    };

    return (
        <div className='navbar-container'>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand" href="/"><FaTasks className="logo-icon" /> Taskly</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-items">
                            <a className="nav-links" href="/">Home</a>
                        </li>
                        <li className="nav-items">
                            <a className="nav-links" href="/dashboard">Dashboard</a>
                        </li>
                        <li className="nav-items">
                            <a className="nav-links" href="/features">Features</a>
                        </li>
                        <li className="nav-items">
                            <a className="nav-links" href="/notifications">Notifications</a>
                        </li>
                        <li className="nav-items">
                            <div className="nav-links user-menu" onClick={toggleMenu} ref={menuRef}>
                                <FaUserCircle className="avatar-icon" />
                                {menuVisible && (
                                    <div className="user-menu-options">
                                        {isLoggedIn ? (
                                            <>
                                               
                                                <button onClick={handleLogout} className="user-menu-button">Logout</button>
                                            </>
                                        ) : (
                                            <button onClick={handleLogin} className="user-menu-button">Login</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;
