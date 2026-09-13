import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        console.log("User data error:", error);
    }

    // Token இல்லையென்றால் Login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Role check
    if (role && user?.role?.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
