import "../styles/Loader.css";

function Loader() {
    return (
        <div className="loader-overlay">
            <div className="loader"></div>
            <h3>Loading...</h3>
        </div>
    );
}

export default Loader;