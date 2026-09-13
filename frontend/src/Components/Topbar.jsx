import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./styles/Topbar.css";

function Topbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const unread = res.data.notifications.filter(
                (item) => !item.isRead
            ).length;

            setCount(unread);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="topbar">

            <div>
                <h2>🏥 Medlora Hospital</h2>
                <p>Welcome {user?.name}</p>
            </div>

            <div className="topbar-right">

                <Link
                    to="/notifications"
                    className="notification-link"
                >
                    🔔

                    {count > 0 && (
                        <span className="notification-badge">
                            {count}
                        </span>
                    )}
                </Link>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Topbar;