import { Link } from "react-router-dom";
import {
    UserPlus,
    Stethoscope,
    CalendarPlus,
    Receipt,
    Bell,
    BarChart3,
} from "lucide-react";

import "../styles/QuickActions.css";

function QuickActions() {

    return (

        <div className="quick-actions">

            <h2>⚡ Quick Actions</h2>

            <div className="quick-grid">

                <Link
                    to="/add-doctor"
                    className="quick-card"
                >
                    <Stethoscope size={40} />
                    <span>Add Doctor</span>
                </Link>

                <Link
                    to="/add-patient"
                    className="quick-card"
                >
                    <UserPlus size={40} />
                    <span>Add Patient</span>
                </Link>

                <Link
                    to="/add-appointment"
                    className="quick-card"
                >
                    <CalendarPlus size={40} />
                    <span>Book Appointment</span>
                </Link>

                <Link
                    to="/add-bill"
                    className="quick-card"
                >
                    <Receipt size={40} />
                    <span>Create Bill</span>
                </Link>

                <Link
                    to="/analytics"
                    className="quick-card"
                >
                    <BarChart3 size={40} />
                    <span>Analytics</span>
                </Link>

                <Link
                    to="/notifications"
                    className="quick-card"
                >
                    <Bell size={40} />
                    <span>Notifications</span>
                </Link>

            </div>

        </div>

    );

}

export default QuickActions;