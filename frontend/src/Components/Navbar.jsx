import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./styles/Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {

        fetchNotifications();

        const interval = setInterval(() => {
            fetchNotifications();
        }, 5000);

        return () => clearInterval(interval);

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

    return (

        <nav className="navbar">

            {/* Logo */}
            <div className="logo">
                🏥 <span>Medlora Hospital</span>
            </div>

            {/* Mobile Menu */}
            <div
                className="menu-icon"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            {/* Navigation */}
            <ul className={menuOpen ? "nav-links active" : "nav-links"}>

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/doctors">Doctors</Link>
                </li>


                <li>

                    <Link to="/login">

                        <button className="login-btn">
                            Login
                        </button>

                    </Link>

                </li>

            </ul>

        </nav>

    );

}

export default Navbar;