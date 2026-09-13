import { useEffect, useState } from "react";
import api from "../../services/api";
import "../styles/AddAppointment.css";

function AddAppointment() {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [appointment, setAppointment] = useState({
        patient: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
    });


    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };


    useEffect(() => {

        fetchPatients();
        fetchDoctors();

    }, []);



    const fetchPatients = async () => {

        try {

            const res = await api.get(
                "/patients",
                config
            );

            setPatients(res.data.patients || []);

        } catch (error) {

            console.log(error);

        }

    };



    const fetchDoctors = async () => {

        try {

            const res = await api.get(
                "/doctors",
                config
            );


            setDoctors(res.data.doctors || []);


        } catch (error) {

            console.log(error);

        }

    };




    const handleChange = (e) => {

        setAppointment({

            ...appointment,

            [e.target.name]: e.target.value,

        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            const res = await api.post(

                "/appointments/add",

                appointment,

                config

            );


            alert(res.data.message);



            setAppointment({

                patient: "",
                doctor: "",
                appointmentDate: "",
                appointmentTime: "",
                reason: "",

            });



        } catch (error) {


            alert(
                error.response?.data?.message ||
                "Booking Failed"
            );


        }

    };



    return (

        <div className="appointment-container">


            <form
                className="appointment-form"
                onSubmit={handleSubmit}
            >


                <h1>
                    Book Appointment
                </h1>



                <select
                    name="patient"
                    value={appointment.patient}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Patient
                    </option>


                    {patients.map((patient)=>(

                        <option
                            key={patient._id}
                            value={patient._id}
                        >
                            {patient.name}
                        </option>

                    ))}


                </select>




                <select
                    name="doctor"
                    value={appointment.doctor}
                    onChange={handleChange}
                    required
                >


                    <option value="">
                        Select Doctor
                    </option>



                    {doctors.map((doctor)=>(

                        <option
                            key={doctor._id}
                            value={doctor._id}
                        >

                            {doctor.name}

                        </option>


                    ))}


                </select>




                <input

                    type="date"

                    name="appointmentDate"

                    value={appointment.appointmentDate}

                    onChange={handleChange}

                    required

                />




                <input

                    type="time"

                    name="appointmentTime"

                    value={appointment.appointmentTime}

                    onChange={handleChange}

                    required

                />




                <textarea

                    name="reason"

                    placeholder="Reason for Appointment"

                    value={appointment.reason}

                    onChange={handleChange}

                    required

                />




                <button type="submit">

                    Book Appointment

                </button>



            </form>


        </div>

    );

}


export default AddAppointment;