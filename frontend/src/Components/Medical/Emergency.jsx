import React from "react";
import "./Emergency.css";

function Emergency() {
    return (
        <section className="emergency-page">

            <div className="emergency-container">

                <h1>🚑 24/7 Emergency Care</h1>

                <p className="subtitle">
                    Our emergency department is available 24 hours a day,
                    7 days a week with experienced doctors and advanced
                    medical facilities.
                </p>

                <div className="emergency-grid">

                    <div className="emergency-card">
                        <h3>⚡ Immediate Treatment</h3>
                        <p>
                            Quick response for accidents, injuries,
                            heart attacks, strokes, and critical
                            emergencies.
                        </p>
                    </div>

                    <div className="emergency-card">
                        <h3>👨‍⚕️ Expert Doctors</h3>
                        <p>
                            Highly qualified emergency physicians,
                            surgeons, nurses, and trauma specialists
                            available around the clock.
                        </p>
                    </div>

                    <div className="emergency-card">
                        <h3>🚑 Ambulance Service</h3>
                        <p>
                            Fast ambulance support with trained medical
                            staff for immediate transportation.
                        </p>
                    </div>

                    <div className="emergency-card">
                        <h3>🏥 Trauma Center</h3>
                        <p>
                            Modern ICU, emergency operation theatre,
                            trauma care, and life support equipment.
                        </p>
                    </div>

                </div>

                <div className="contact-box">
                    <h2>Emergency Helpline</h2>
                    <h3>📞 +91 98765 43210</h3>
                    <p>Available 24 Hours • Every Day</p>
                </div>

            </div>

        </section>
    );
}

export default Emergency;