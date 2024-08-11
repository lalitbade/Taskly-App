import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BanImg from '../images/corinne-kutz-eeqFjT6q_sQ-unsplash.jpg';
import Header from '../components/Header';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token and user data in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirect to the dashboard
                navigate('/dashboard');
            } else {
                // Display error message from the server
                setError(data.message || 'Failed to login');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <Header />
            <div className="login-background">
                <img src={BanImg} className="background-img" alt="Background" />
            </div>
            <div className="overlay"></div>
            <div className="login-box">
                <h2>Let's Get Started!</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>
                    <p className="forgot-password">Forgot your password?</p>
                </form>
                <button type="button" onClick={handleSignUpClick} className="login-btn">Sign Up</button>
            </div>
        </div>
    );
}

export default Login;
