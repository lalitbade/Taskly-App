import React from 'react';
import './Features.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTag, faUserFriends, faBell, faCalendarCheck, faChartLine } from '@fortawesome/free-solid-svg-icons';

const FeaturesPage = () => {
    return (
        <div>
            <Header />
            <div className="features-page">
                <section className="features-intro">
                    <div className="container">
                        <h1>Explore Taskly Features</h1>
                        <p>Discover the powerful tools that help you stay organized and productive.</p>
                    </div>
                </section>

                <section className="feature-details">
                    <div className="container">
                        <div className="feature-item">
                            <FontAwesomeIcon icon={faTasks} className="feature-icon" />
                            <h2>Task Management</h2>
                            <p>Effortlessly add, edit, and organize tasks. Track your progress and stay on top of your to-dos.</p>
                        </div>
                        <div className="feature-item">
                            <FontAwesomeIcon icon={faTag} className="feature-icon" />
                            <h2>Customizable Labels</h2>
                            <p>Create labels that suit your needs. Categorize tasks for better organization and focus.</p>
                        </div>
                        <div className="feature-item">
                            <FontAwesomeIcon icon={faUserFriends} className="feature-icon" />
                            <h2>User-Friendly Interface</h2>
                            <p>A clean, intuitive design that simplifies task management, making it accessible for everyone.</p>
                        </div>
                        <div className="feature-item">
                            <FontAwesomeIcon icon={faBell} className="feature-icon" />
                            <h2>Reminders & Notifications</h2>
                            <p>Set reminders and receive notifications to ensure you never miss a task deadline.</p>
                        </div>
                        <div className="feature-item">
                            <FontAwesomeIcon icon={faCalendarCheck} className="feature-icon" />
                            <h2>Calendar Integration</h2>
                            <p>Sync your tasks with your calendar to keep track of deadlines and important dates.</p>
                        </div>
                        <div className="feature-item">
                            <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
                            <h2>Progress Tracking</h2>
                            <p>Monitor your progress with visual charts and insights that help you stay motivated.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default FeaturesPage;
