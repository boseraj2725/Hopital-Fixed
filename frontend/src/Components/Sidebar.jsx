import { NavLink, useNavigate } from "react-router-dom";
import "./styles/Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="sidebar">

            <div className="sidebar-logo">
                <h2>🏥 Medlora Hospital</h2>
            </div>

            <nav className="sidebar-menu">

                <NavLink to="/admin-dashboard">
                    📊 Dashboard
                </NavLink>

                <NavLink to="/doctors">
                    👨‍⚕️ Doctors
                </NavLink>

                <NavLink to="/patients">
                    🧑 Patients
                </NavLink>

                <NavLink to="/appointments">
                    📅 Appointments
                </NavLink>

                <NavLink to="/billing">
                    💳 Billing
                </NavLink>

                <NavLink to="/analytics">
                    📈 Analytics
                </NavLink>

                <NavLink to="/reports">
                    📄 Reports
                </NavLink>

                <NavLink to="/settings">
                    ⚙️ Settings
                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>

    );

}

export default Sidebar;