import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>
                The page you are looking for doesn't exist.
            </p>

            <Link to="/">
                <button>🏠 Go Home</button>
            </Link>
        </div>
    );
}

export default NotFound;