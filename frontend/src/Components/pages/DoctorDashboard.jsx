import "../styles/DoctorDashboard.css";

function DoctorDashboard() {
    return (
        <div className="doctor-dashboard">

            <h1>Doctor Dashboard</h1>

            <div className="dashboard-cards">

                <div className="card">
                    <h2>Total Patients</h2>
                    <p>120</p>
                </div>

                <div className="card">
                    <h2>Today's Appointments</h2>
                    <p>18</p>
                </div>

                <div className="card">
                    <h2>Prescriptions</h2>
                    <p>52</p>
                </div>

                <div className="card">
                    <h2>Available Slots</h2>
                    <p>10</p>
                </div>

            </div>

        </div>
    );
}

export default DoctorDashboard;