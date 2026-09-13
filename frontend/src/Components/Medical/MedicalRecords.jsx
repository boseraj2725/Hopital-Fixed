import React from "react";
import { FaNotesMedical, FaShieldAlt, FaFileMedical, FaLock } from "react-icons/fa";
import "./MedicalRecords.css";

function MedicalRecords() {
    return (
        <section className="medical-records">

            <div className="records-header">
                <FaNotesMedical className="records-icon" />
                <h1>Medical Records</h1>
                <p>
                    Securely manage and access your complete medical history,
                    prescriptions, reports, and treatment details anytime.
                </p>
            </div>

            <div className="records-grid">

                <div className="record-card">
                    <FaFileMedical className="card-icon" />
                    <h3>Patient History</h3>
                    <p>
                        View complete consultation history, diagnosis,
                        and previous treatments.
                    </p>
                </div>

                <div className="record-card">
                    <FaNotesMedical className="card-icon" />
                    <h3>Prescriptions</h3>
                    <p>
                        Access digital prescriptions from specialist
                        doctors with ease.
                    </p>
                </div>

                <div className="record-card">
                    <FaShieldAlt className="card-icon" />
                    <h3>Health Reports</h3>
                    <p>
                        Store blood test reports, X-Ray, MRI,
                        CT Scan and laboratory results securely.
                    </p>
                </div>

                <div className="record-card">
                    <FaLock className="card-icon" />
                    <h3>Secure Records</h3>
                    <p>
                        Your medical information is encrypted and
                        protected with advanced security.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default MedicalRecords;