import React from 'react';
import './LandingPage.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BanImg from '../images/corinne-kutz-eeqFjT6q_sQ-unsplash.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTag, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
    return (
        <div>
            <Header />
            <div className="home-page">
                <div className="banner-container">
                    <img src={BanImg} alt="Banner" className="banner-img" />
                    <div className="overlay"></div>
                    <div className="text-container">
                        <h1>Organize Your Tasks Effortlessly with Taskly!</h1>
                        <p>Manage your tasks and labels with ease and efficiency</p>
                        <a href="/login" className="btn-main bg-light text-black">Get Started!</a>
                    </div>
                </div>
                
                <section className="features-section">
                    <div className="container">
                        <div className="feature">
                            <FontAwesomeIcon icon={faTasks} className="feature-icon" />
                            <h2>Task Management</h2>
                            <p>Easily add, organize, and track your tasks to stay productive.</p>
                        </div>
                        <div className="feature">
                            <FontAwesomeIcon icon={faTag} className="feature-icon" />
                            <h2>Customizable Labels</h2>
                            <p>Create and customize labels to categorize your tasks effectively.</p>
                        </div>
                        <div className="feature">
                            <FontAwesomeIcon icon={faUserFriends} className="feature-icon" />
                            <h2>User-Friendly Interface</h2>
                            <p>Enjoy a clean and intuitive interface that makes task management a breeze.</p>
                        </div>
                    </div>
                </section>

                <section className="testimonials-section">
                    <div className="container">
                        <h2>What Our Users Say!</h2>
                        <div className="testimonial">
                            <p>"Taskly has completely transformed how I manage my daily tasks. It's simple yet powerful!"</p>
                            <h5>- Emily R.</h5>
                        </div>
                        <div className="testimonial">
                            <p>"I love the customizable labels feature. It helps me keep my tasks organized and prioritized."</p>
                            <h5>- James K.</h5>
                        </div>
                    </div>
                </section>
                
                <section className="cta-section">
                    <div className="container">
                        <h2>Ready to Enhance Your Productivity?</h2>
                        <p>Join thousands of users who are organizing their tasks with Taskly.</p>
                        <a href="/signup" className="btn-main bg-light text-black">Get Started</a>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default LandingPage;
