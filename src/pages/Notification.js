import React from 'react';
import './Notification.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Notification = () => {
    return (
        <div>
            <Header />
            <div className="notifications-page">
                <section className="notifications-intro">
                    <div className="container">
                        <h1>Your Notifications</h1>
                        <p>Stay updated with the latest task reminders and updates.</p>
                    </div>
                </section>

                <section className="notifications-list">
                    <div className="container">
                        <div className="notification-item success">
                            <FontAwesomeIcon icon={faCheckCircle} className="notification-icon" />
                            <div className="notification-content">
                                <h2>Task Completed</h2>
                                <p>You successfully completed the task: "Finish Project Report".</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                        <div className="notification-item reminder">
                            <FontAwesomeIcon icon={faBell} className="notification-icon" />
                            <div className="notification-content">
                                <h2>Upcoming Deadline</h2>
                                <p>Don't forget to complete: "Team Meeting Preparation".</p>
                                <span>1 day ago</span>
                            </div>
                        </div>
                        <div className="notification-item error">
                            <FontAwesomeIcon icon={faTimesCircle} className="notification-icon" />
                            <div className="notification-content">
                                <h2>Task Overdue</h2>
                                <p>You missed the deadline for: "Submit Expense Report".</p>
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Notification;
