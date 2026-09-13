import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/Login.css";


function Login() {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        email: "",
        password: "",

    });


    const [loading, setLoading] = useState(false);




    const handleChange = (e) => {


        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });


    };





    const handleSubmit = async (e) => {


        e.preventDefault();


        if (loading) return;


        setLoading(true);



        try {


            const res = await api.post(
                "/auth/login",
                form
            );



            // Save Token

            localStorage.setItem(
                "token",
                res.data.token
            );



            // Save User

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );



            toast.success(
                res.data.message || "Login Successful"
            );





            // Role Based Navigation

            switch (res.data.user.role) {



                case "Admin":

                    navigate(
                        "/admin-dashboard",
                        {
                            replace:true,
                        }
                    );

                    break;




                case "Doctor":

                    navigate(
                        "/doctor-dashboard",
                        {
                            replace:true,
                        }
                    );

                    break;




                case "Patient":

                    navigate(
                        "/book-appointment",
                        {
                            replace:true,
                        }
                    );

                    break;




                default:

                    navigate(
                        "/",
                        {
                            replace:true,
                        }
                    );


            }



        } catch(error) {


            toast.error(

                error.response?.data?.message ||

                "Login Failed"

            );


        } finally {


            setLoading(false);


        }


    };


    return (

        <div className="login-container">
            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <h2>
                    🏥 Medlora Hospital Login
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}

                >
                    {
                        loading
                        ? "Logging in..."
                        : "Login"
                    }
                </button>
                <div className="login-links">
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
export default Login;