import "../styles/Prescription.css";

function Prescription() {
    return (
        <div className="prescription">

            <h1>Patient Prescription</h1>

            <div className="prescription-card">

                <h2>Patient Details</h2>

                <p><strong>Name :</strong> Bose Raj</p>
                <p><strong>Age :</strong> 22</p>
                <p><strong>Doctor :</strong> Dr. John Smith</p>
                <p><strong>Date :</strong> 15-07-2026</p>

                <hr />

                <h2>Medicines</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Dosage</th>
                            <th>Duration</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Paracetamol</td>
                            <td>1 Tablet - Morning & Night</td>
                            <td>5 Days</td>
                        </tr>

                        <tr>
                            <td>Vitamin C</td>
                            <td>1 Tablet - Morning</td>
                            <td>10 Days</td>
                        </tr>

                        <tr>
                            <td>Cough Syrup</td>
                            <td>10 ml - Twice Daily</td>
                            <td>7 Days</td>
                        </tr>

                    </tbody>

                </table>

                <button>Download Prescription</button>

            </div>

        </div>
    );
}

export default Prescription;