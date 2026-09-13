import "./ChartCard.css";

function ChartCard({ title, children }) {

    return (

        <div className="chart-card">

            <h2>{title}</h2>

            <div className="chart-body">

                {children}

            </div>

        </div>

    );

}

export default ChartCard;