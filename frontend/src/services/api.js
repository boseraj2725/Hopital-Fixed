import axios from "axios";
import { API_URL } from "./config";

const api = axios.create({

    baseURL: API_URL,

    timeout: 10000,

    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

});

// ===============================
// Request Interceptor
// ===============================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },

    (error) => Promise.reject(error)

);

// ===============================
// Response Interceptor
// ===============================

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

// ===============================
// Doctor APIs
// ===============================

export const getDoctors = () => api.get("/doctors");

export const addDoctor = (doctorData) =>
    api.post("/doctors/add", doctorData);

export const updateDoctor = (id, doctorData) =>
    api.put(`/doctors/update/${id}`, doctorData);

export const deleteDoctor = (id) =>
    api.delete(`/doctors/delete/${id}`);

// ===============================
// Patient APIs
// ===============================

export const getPatients = () => api.get("/patients");

export const getPatient = (id) =>
    api.get(`/patients/${id}`);

export const addPatient = (patientData) =>
    api.post("/patients/add", patientData);

export const updatePatient = (id, patientData) =>
    api.put(`/patients/update/${id}`, patientData);

export const deletePatient = (id) =>
    api.delete(`/patients/delete/${id}`);

// ===============================
// User Profile APIs
// ===============================

export const getProfile = () =>
    api.get("/users/profile");

export const updateProfile = (userData) =>
    api.put("/users/update-profile", userData);

export const uploadProfileImage = (formData) =>
    api.post(
        "/users/upload-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

export const changePassword = (passwordData) =>
    api.put("/users/change-password", passwordData);

// ===============================
// Default Export
// ===============================

export default api;