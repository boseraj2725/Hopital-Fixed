require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// ==============================
// Routes
// ==============================
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const billingRoutes = require("./routes/billingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ==============================
// CORS
// ==============================
const allowedOrigins = [
    "http://localhost:5173",
    ...(process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL
            .split(",")
            .map((url) => url.trim())
        : []),
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

// ==============================
// HTTP Server
// ==============================
const server = http.createServer(app);

// ==============================
// Socket.IO
// ==============================
const io = new Server(server, {
    cors: corsOptions,
});

app.set("io", io);

// ==============================
// MongoDB
// ==============================
connectDB();

// ==============================
// Middlewares
// ==============================
app.use(cors(corsOptions));
app.use(express.json());

// ==============================
// Static Uploads
// ==============================
app.use(
    "/uploads",
    express.static("uploads")
);

// ==============================
// Home Route
// ==============================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🏥 SmartCare AI Hospital Backend Running...",
    });
});

// ==============================
// Test Route
// ==============================
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API Working Successfully",
    });
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/billing", billingRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/users", userRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/invoice", invoiceRoutes);

app.use("/api/forgot-password", forgotPasswordRoutes);

app.use("/api/reports", reportRoutes);

// ==============================
// Socket Connection
// ==============================
io.on("connection", (socket) => {
    console.log("🟢 User Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔴 User Disconnected:", socket.id);
    });
});

// ==============================
// 404 Route
// ==============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server Running : http://localhost:${PORT}`);
});
