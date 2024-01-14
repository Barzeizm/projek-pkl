// E:/projek/client/src/pages/Public/Home.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return (
        <div className='bg-gradient-to-b from-blue-900 to-blue-500 text-white min-h-screen'>
            <div className='container mx-auto flex justify-between items-center py-4'>
                <div className='text-2xl font-extrabold tracking-tight'>
                    <NavLink to='/'>
                        <div>AsAHelp</div>
                    </NavLink>
                </div>
                <div className='flex items-center gap-4'>
                    <NavLink to='/register' className='flex items-center justify-center text-white hover:bg-blue-950 w-24 h-10'>
                        Register
                    </NavLink>
                    <NavLink to='/login' className='flex items-center justify-center text-white hover:bg-blue-950 w-24 h-10'>
                        Login
                    </NavLink>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center text-center'>
                <div className='text-4xl font-extrabold mb-4'>
                    Welcome to <span className='text-blue-500'>AsAHelp</span>
                </div>
                <div className='text-lg text-white mb-8 max-w-3xl'>
                    AsAHelp is a powerful ticketing system designed to streamline your support
                    process. Whether you are a customer seeking assistance or a team member managing
                    tickets, AsAHelp is here to make your experience seamless.
                </div>
                <div className='text-lg text-white mb-8 max-w-3xl'>
                    Our platform provides a centralized hub for submitting, tracking, and resolving
                    support tickets. Join us in delivering exceptional support and resolving issues
                    effectively.
                </div>
            </div>
        </div>
    );
};

export default Home;
