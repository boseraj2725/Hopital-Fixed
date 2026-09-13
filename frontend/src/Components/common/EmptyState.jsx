import "./EmptyState.css";

function EmptyState({

    icon = "📂",

    title = "No Data Found",

    subtitle = "Nothing to display."

}) {

    return (

        <div className="empty-state">

            <div className="empty-icon">

                {icon}

            </div>

            <h2>{title}</h2>

            <p>{subtitle}</p>

        </div>

    );

}

export default EmptyState;