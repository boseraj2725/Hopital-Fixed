// ==========================================================
// Central place for backend URLs.
//
// Locally, these default to your machine's backend on :5000.
// In production (Render, Vercel, Netlify, etc.) set these as
// BUILD-TIME environment variables in your hosting dashboard
// (Vite bakes them in when the app is built):
//
//   VITE_API_URL    = https://your-backend.onrender.com/api
//   VITE_SOCKET_URL = https://your-backend.onrender.com
//
// After changing env vars on Render, trigger a new deploy/build
// of the frontend — Vite only reads them at build time, not at
// runtime like a normal Node server would.
// ==========================================================

export const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// Root of the backend without the trailing /api — used to build
// links to static assets like /uploads/profile/<file>.
export const SERVER_URL = API_URL.replace(/\/api\/?$/, "");
