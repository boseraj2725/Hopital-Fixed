import "../styles/SystemStatus.css";

function SystemStatus() {

    return (

        <div className="system-status">

            {/* Header */}
            <h1>🏥 SmartCare AI - Quality Assurance Dashboard</h1>

            <div className="status-header">

                <div className="status-card success">
                    <h2>Project Status</h2>
                    <h3>🟢 Production Ready</h3>
                </div>

                <div className="status-card success">
                    <h2>Overall Progress</h2>
                    <h3>100%</h3>
                </div>

            </div>

            {/* =======================
                Phase 1
            ======================= */}

            <div className="phase-card">

                <h2>🔐 Phase 1 - Authentication Module</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Patient Registration</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Doctor Registration</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Admin Login</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>JWT Authentication</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Role Based Access</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Password Encryption</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                    </tbody>

                </table>

            </div>

            {/* =======================
                Phase 2
            ======================= */}

            <div className="phase-card">

                <h2>👨‍⚕️ Phase 2 - Doctor & Patient Management</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Add Doctor</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>View Doctors</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Edit Doctor</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Delete Doctor</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Add Patient</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>View Patients</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Edit Patient</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                        <tr>
                            <td>Delete Patient</td>
                            <td className="pass">✅ PASSED</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SystemStatus;