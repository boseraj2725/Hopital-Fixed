import "./StatCard.css";

function StatCard({

    icon,

    title,

    value,

}) {

    return (

        <div className="stat-card">

            <div className="stat-icon">
                {icon}
            </div>

            <div>

                <h3>{title}</h3>

                <h1>{value}</h1>

            </div>

        </div>

    );

}

export default StatCard;