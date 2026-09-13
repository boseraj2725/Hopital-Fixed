import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../styles/EditDoctor.css";

function EditDoctor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        department: "",
        experience: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(`/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDoctor(res.data.doctor);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to Load Doctor"
            );

        }

    };

    const handleChange = (e) => {

        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/doctors/update/${id}`,
                doctor,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Doctor Updated Successfully");

            navigate("/doctors");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    return (

        <div className="edit-doctor">

            <form
                className="edit-form"
                onSubmit={handleSubmit}
            >

                <h1>Edit Doctor</h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Doctor Name"
                    value={doctor.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={doctor.department}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience"
                    value={doctor.experience}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={doctor.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={doctor.phone}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Update Doctor
                </button>

            </form>

        </div>

    );

}

export default EditDoctor;