import { useEffect, useState } from "react";
import api from "../../services/api";
import socket from "../../services/socket";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "./Loader";
import "../styles/Notifications.css";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Notifications
    // ==========================
    const fetchNotifications = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNotifications(res.data.notifications || []);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load notifications"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Initial Load + Socket.IO
    // ==========================
    useEffect(() => {

        fetchNotifications();

        socket.on("newNotification", (notification) => {

            setNotifications((prev) => [
                notification,
                ...prev,
            ]);

            toast.info(notification.title);

        });

        return () => {

            socket.off("newNotification");

        };

    }, []);

    // ==========================
    // Unread Count
    // ==========================
    const unreadCount = notifications.filter(
        (item) => !item.isRead
    ).length;

    // ==========================
    // Mark As Read
    // ==========================
    const markAsRead = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/notifications/read/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNotifications((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            isRead: true,
                        }
                        : item
                )
            );

            toast.success("Notification Marked as Read");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    // ==========================
    // Delete Notification
    // ==========================
    const deleteNotification = async (id) => {

        const result = await Swal.fire({
            title: "Delete Notification?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/notifications/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNotifications((prev) =>
                prev.filter((item) => item._id !== id)
            );

            toast.success("Notification Deleted");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    // ==========================
    // Clear All Notifications
    // ==========================
    const clearAll = async () => {

        const result = await Swal.fire({
            title: "Clear All Notifications?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Clear All",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete("/notifications/clear", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNotifications([]);

            toast.success("All Notifications Cleared");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Clear Notifications"
            );

        }

    };

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="notifications-container">

            <div className="notification-header">

                <h1>🔔 Notifications</h1>

                <span className="badge">
                    {unreadCount}
                </span>

                <button
                    className="clear-btn"
                    onClick={clearAll}
                >
                    Clear All
                </button>

            </div>

            {
                notifications.length === 0 ? (

                    <h2 className="empty">
                        No Notifications
                    </h2>

                ) : (

                    notifications.map((item) => (

                        <div
                            key={item._id}
                            className={`notification ${item.isRead ? "read" : ""}`}
                        >

                            <h3>{item.title}</h3>

                            <p>{item.message}</p>

                            <span>
                                {new Date(item.createdAt).toLocaleString()}
                            </span>

                            <div className="notification-actions">

                                {
                                    !item.isRead && (

                                        <button
                                            className="read-btn"
                                            onClick={() =>
                                                markAsRead(item._id)
                                            }
                                        >
                                            Mark Read
                                        </button>

                                    )
                                }

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteNotification(item._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )
            }

        </div>

    );

}

export default Notifications;