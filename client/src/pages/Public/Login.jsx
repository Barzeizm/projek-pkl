// E:/projek/client/src/pages/Public/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8081/login", {
                email,
                password,
            });

            // Assuming the server sends a token upon successful login
            const { token } = response.data;

            // You can store the token in localStorage or session storage
            // For example, to store it in localStorage:
            localStorage.setItem("token", token);

            navigate("/home");
            // Redirect or perform any other actions upon successful login
            toast.success("🦄 Wow so easy!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } catch (error) {
            toast.error("🦄 Wow so easy!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            console.error("Login failed:", error.response.data.message);
        }
    };

    return (
        <>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                    <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>
                        Login to <span className='text-blue-700'>AsAHelp</span>
                    </h2>
                    <form className='space-y-6'>
                        <div>
                            <label
                                htmlFor='email-address'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email:
                            </label>
                            <input
                                id='email-address'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Password:
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type='button'
                                className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className='mt-4 text-black text-center'>
                        Don't have an account?{" "}
                        <NavLink to='/register' className='underline text-blue-700'>
                            Register here.
                        </NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
