import "../styles/PatientStats.css";

function PatientStats() {
    const stats = [
        { title: "Appointments", value: 5, icon: "📅" },
        { title: "Doctors", value: 12, icon: "👨‍⚕️" },
        { title: "Reports", value: 8, icon: "📄" },
        { title: "Medicines", value: 15, icon: "💊" },
    ];

    return (
        <div className="stats-grid">
            {stats.map((item, index) => (
                <div className="stats-card" key={index}>
                    <h1>{item.icon}</h1>
                    <h2>{item.value}</h2>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    );
}

export default PatientStats;