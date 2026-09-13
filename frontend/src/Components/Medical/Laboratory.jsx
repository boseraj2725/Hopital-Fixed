import React from "react";
import "./Laboratory.css";

function Laboratory() {
    return (
        <section className="laboratory-page">

            <div className="laboratory-container">

                <h1>🧪 Advanced Laboratory Services</h1>

                <p className="subtitle">
                    Our modern laboratory provides fast, reliable, and accurate
                    diagnostic testing using advanced medical technology.
                </p>

                <div className="laboratory-grid">

                    <div className="laboratory-card">
                        <h3>🩸 Blood Test</h3>
                        <p>
                            Complete Blood Count (CBC), Blood Sugar,
                            Cholesterol, Thyroid, Vitamin Tests and more.
                        </p>
                    </div>

                    <div className="laboratory-card">
                        <h3>🧬 Pathology</h3>
                        <p>
                            Advanced pathology testing for disease diagnosis
                            with accurate and reliable reports.
                        </p>
                    </div>

                    <div className="laboratory-card">
                        <h3>🦠 Microbiology</h3>
                        <p>
                            Detection of bacterial, viral, and fungal infections
                            using modern laboratory techniques.
                        </p>
                    </div>

                    <div className="laboratory-card">
                        <h3>⚡ Fast Reports</h3>
                        <p>
                            Most laboratory reports are delivered within
                            24 hours through our secure digital system.
                        </p>
                    </div>

                </div>

                <div className="lab-info">
                    <h2>⏰ Laboratory Timing</h2>
                    <p>Monday - Sunday</p>
                    <h3>24 × 7 Available</h3>
                </div>

            </div>

        </section>
    );
}

export default Laboratory;