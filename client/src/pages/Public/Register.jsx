// E:/projek/client/src/pages/public/Register.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{7,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%._]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/signup", {
                username: username,
                email: email,
                password: password,
            });
            setUsername("");
            setEmail("");
            setPassword("");
            toast.success("🦄 Wow so easy!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            navigate("/login");
        } catch (error) {
            if (error.response) {
                toast.warning("Registrasi Gagal", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };

    return (
        <>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                    <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>
                        Register to <span className='text-blue-700'>AsAHelp</span>
                    </h2>
                    <form className='space-y-6'>
                        <div className=''>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Username:
                            </label>
                            <input
                                type='text'
                                placeholder='Username'
                                id='username'
                                className='border rounded w-full py-2 px-3 focus:outline-none'
                                value={username}
                                required
                                autoComplete='off'
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby='uidnote'
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                        </div>
                        <div className=''>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Email:
                            </label>
                            <input
                                type='email'
                                placeholder='Email Address'
                                className='border rounded w-full py-2 px-3 focus:outline-none'
                                value={email}
                                required
                                autoComplete='off'
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby='uidnote'
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                           
                        </div>
                        <div className=''>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Password:
                            </label>
                            <input
                                type='password'
                                placeholder='Passwordx'
                                className='border rounded w-full py-2 px-3 focus:outline-none'
                                value={password}
                                required
                                autoComplete='off'
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby='uidnote'
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            type='submit'
                            className='bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none w-full'
                        >
                            Register
                        </button>
                    </form>
                    <div className='mt-4 text-black text-center'>
                        Already have an account?{" "}
                        <NavLink to='/login' className='text-blue-700'>
                            Login here.
                        </NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
