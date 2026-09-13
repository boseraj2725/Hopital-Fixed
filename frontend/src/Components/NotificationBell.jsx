import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/NotificationBell.css";

function NotificationBell() {

    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {

            const res = await api.get("/notifications");

            setNotifications(res.data.notifications);

        } catch (error) {

            console.log(error);

        }
    };

    const markAsRead = async (id) => {

        try {

            await api.put(`/notifications/read/${id}`);

            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteNotification = async (id) => {

        try {

            await api.delete(`/notifications/delete/${id}`);

            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const unreadCount = notifications.filter(
        (item) => !item.isRead
    ).length;

    return (

        <div className="notification-wrapper">

            <div
                className="notification-icon"
                onClick={() => setShow(!show)}
            >

                🔔

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount}
                    </span>
                )}

            </div>

            {show && (

                <div className="notification-dropdown">

                    <h3>Notifications</h3>

                    {notifications.length === 0 ? (

                        <p className="empty-text">
                            No Notifications
                        </p>

                    ) : (

                        notifications.map((item) => (

                            <div
                                key={item._id}
                                className={`notification-item ${item.isRead ? "read" : ""}`}
                            >

                                <h4>{item.title}</h4>

                                <p>{item.message}</p>

                                <small>
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleString()}
                                </small>

                                <div className="notification-actions">

                                    {!item.isRead && (

                                        <button
                                            className="read-btn"
                                            onClick={() =>
                                                markAsRead(item._id)
                                            }
                                        >
                                            ✔ Read
                                        </button>

                                    )}

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteNotification(item._id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}

        </div>

    );

}

export default NotificationBell;