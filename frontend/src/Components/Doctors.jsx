import "../Components/styles/Doctors.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const doctors = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialization: "Cardiologist",
        experience: "12 Years Experience",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Dr. Sarah Johnson",
        specialization: "Neurologist",
        experience: "10 Years Experience",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 3,
        name: "Dr. Michael Lee",
        specialization: "Orthopedic",
        experience: "8 Years Experience",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
];


function Doctors() {

    const navigate = useNavigate();

    const [search,setSearch] = useState("");

    const [speciality,setSpeciality] = useState("");


    const filteredDoctors = doctors.filter((doctor)=>{

        return (

            doctor.name
            .toLowerCase()
            .includes(search.toLowerCase())

            &&

            (
                speciality === ""
                ||
                doctor.specialization === speciality
            )

        );

    });



    return (

        <section className="doctors">


            <div className="doctor-heading">

                <h2>
                    Find Your Doctor
                </h2>

                <p>
                    Search and book appointments with our specialists
                </p>

            </div>



            <div className="doctor-search">


                <input

                    type="text"

                    placeholder="Search doctor name..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />



                <select

                    value={speciality}

                    onChange={(e)=>setSpeciality(e.target.value)}

                >

                    <option value="">
                        All Specialization
                    </option>

                    <option>
                        Cardiologist
                    </option>

                    <option>
                        Neurologist
                    </option>

                    <option>
                        Orthopedic
                    </option>


                </select>


            </div>




            <div className="doctor-grid">


                {
                    filteredDoctors.map((doctor)=>(

                        <div
                        className="doctor-card"
                        key={doctor.id}
                        >


                            <div className="doctor-img">

                                <img
                                src={doctor.image}
                                alt={doctor.name}
                                />

                            </div>


                            <h3>
                                {doctor.name}
                            </h3>


                            <span className="specialization">
                                {doctor.specialization}
                            </span>


                            <p className="experience">
                                {doctor.experience}
                            </p>



                            <button

                            onClick={()=>
                            navigate(`/doctor/${doctor.id}`)
                            }

                            >
                                View Profile
                            </button>


                        </div>

                    ))
                }


            </div>


        </section>

    );

}

export default Doctors;