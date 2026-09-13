import { Navigate } from "react-router-dom";

function DoctorRoute({ children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "Doctor") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;

}

export default DoctorRoute;