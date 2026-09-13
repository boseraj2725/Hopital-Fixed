import { Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

// Public Pages
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import Dashboard from "./Components/pages/Dashboard";

// Dashboards
import AdminDashboard from "./Components/pages/AdminDashboard";
import DoctorDashboard from "./Components/pages/DoctorDashboard";
import PatientDashboard from "./Components/pages/PatientDashboard";

// Doctor
import DoctorList from "./Components/pages/DoctorList";
import AddDoctor from "./Components/pages/AddDoctor";
import EditDoctor from "./Components/pages/EditDoctor";
import DoctorProfile from "./Components/pages/DoctorProfile";

// Patient
import PatientList from "./Components/pages/PatientList";
import AddPatient from "./Components/pages/AddPatient";
import EditPatient from "./Components/pages/EditPatient";
import PatientProfile from "./Components/pages/PatientProfile";
import BookAppointment from "./Components/pages/BookAppointment";

// Appointment
import Appointment from "./Components/pages/Appointment";
import AddAppointment from "./Components/pages/AddAppointment";
import AppointmentList from "./Components/pages/AppointmentList";
import EditAppointment from "./Components/pages/EditAppointment";

// Billing
import AddBill from "./Components/pages/AddBill";
import BillList from "./Components/pages/BillList";
import EditBill from "./Components/pages/EditBill";
import Invoice from "./Components/pages/Invoice";

// Dashboard
import DashboardStats from "./Components/pages/DashboardStats";
import Analytics from "./Components/pages/Analytics";
import Reports from "./Components/pages/Reports";

// Other Pages
import Prescription from "./Components/pages/Prescription";
import Medicine from "./Components/pages/Medicine";
import Notifications from "./Components/pages/Notifications";
import Settings from "./Components/pages/Settings";
import SystemStatus from "./Components/pages/SystemStatus";
import NotFound from "./Components/pages/NotFound";
import EditProfile from "./Components/pages/EditProfile";
import Profile from "./Components/pages/Profile";
import ChangePassword from "./Components/pages/ChangePassword";
import UploadProfileImage from "./Components/pages/UploadProfileImage";
import ForgotPassword from "./Components/pages/ForgotPassword";
import ResetPassword from "./Components/pages/ResetPassword";
import ExpertDoctors from "./Components/Medical/ExpertDoctors";
import Cardiology from "./Components/Medical/Cardiology";
import Emergency from "./Components/Medical/Emergency";
import Laboratory from "./Components/Medical/Laboratory";
import Radiology from "./Components/Medical/Radiology";
import MedicalRecords from "./Components/Medical/MedicalRecords";
import Pro from "./Components/Medical/Pro";
import MyAppointments from "./Components/pages/MyAppointments";
import VideoCall from "./Components/pages/VideoCall";
import Top from "./Components/pages/Top";


function App() {

    return (

        <>
                <Top />

            <Routes>
                {/* ================= PUBLIC ROUTES ================= */}

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/video-call/:roomId" element={<VideoCall />} />

                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />


                {/* ================= PATIENT ================= */}

                <Route
                    path="/patient-dashboard"
                    element={
                        <ProtectedRoute role="Patient">
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patient-profile"
                    element={
                        <ProtectedRoute role="Patient">
                            <PatientProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/book-appointment"
                    element={
                        <ProtectedRoute role="Patient">
                            <BookAppointment />
                        </ProtectedRoute>
                    }
                />

                {/* ================= DOCTOR ================= */}

                <Route
                    path="/doctor-dashboard"
                    element={
                        <ProtectedRoute role="Doctor">
                            <DoctorDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctor-profile"
                    element={
                        <ProtectedRoute role="Doctor">
                            <DoctorProfile />
                        </ProtectedRoute>
                    }
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute role="Admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute role="Admin">
                            <DoctorList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-doctor"
                    element={
                        <ProtectedRoute role="Admin">
                            <AddDoctor />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-doctor/:id"
                    element={
                        <ProtectedRoute role="Admin">
                            <EditDoctor />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute role="Admin">
                            <PatientList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-patient"
                    element={
                        <ProtectedRoute role="Admin">
                            <AddPatient />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-patient/:id"
                    element={
                        <ProtectedRoute role="Admin">
                            <EditPatient />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointment"
                    element={
                        <ProtectedRoute role="Admin">
                            <Appointment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-appointment"
                    element={
                        <ProtectedRoute role="Admin">
                            <AddAppointment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute role="Admin">
                            <AppointmentList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-appointment/:id"
                    element={
                        <ProtectedRoute role="Admin">
                            <EditAppointment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/billing"
                    element={
                        <ProtectedRoute role="Admin">
                            <BillList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-bill"
                    element={
                        <ProtectedRoute role="Admin">
                            <AddBill />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-bill/:id"
                    element={
                        <ProtectedRoute role="Admin">
                            <EditBill />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/invoice/:id"
                    element={
                        <ProtectedRoute role="Admin">
                            <Invoice />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute role="Admin">
                            <Analytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute role="Admin">
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard-stats"
                    element={
                        <ProtectedRoute role="Admin">
                            <DashboardStats />
                        </ProtectedRoute>
                    }
                />

                {/* ================= COMMON AUTH ================= */}

                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/upload-profile-image"
                    element={
                        <ProtectedRoute>
                            <UploadProfileImage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />

                {/* ================= COMMON ================= */}


                <Route path="/notifications" element={<Notifications />} />

                <Route path="/prescription" element={<Prescription />} />

                <Route path="/medicine" element={<Medicine />} />

                <Route path="/settings" element={<Settings />} />

                <Route path="/system-status" element={<SystemStatus />} />

                {/* ================= 404 ================= */}

                <Route path="*" element={<NotFound />} />


                <Route path="/expert-doctors" element={<ExpertDoctors />} />
                <Route path="/cardiology" element={<Cardiology />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/laboratory" element={<Laboratory />} />
                <Route path="/radiology" element={<Radiology />} />
                <Route path="/medical-records" element={<MedicalRecords />} />

                <Route path="/doctor/:id" element={<Pro />} />

                <Route path="/my-appointments" element={<MyAppointments />} />


            </Routes>

            <Footer />

        </>

    );

}

export default App;