import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronDown, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [dropDown, setDropDown] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const dropdownMenus = [
        {
            name: "Profile",
            to: "/profile",
            icon: faUser,
        },
        {
            name: "Logout",
            to: "/logout",
            icon: faRightFromBracket,
        },
    ];

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Decode the token to get user information
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Extract email from decoded token
            const { email } = decodedToken;

            setUserEmail(email);
        }
    }, []);

    return (
        <>
            {/* <div className='bg-blue-500 py-4 px-6 text-white flex justify-between items-center'>
                <div className='text-2xl font-bold'>AsAHelp</div>
                <div>Email: {userEmail}</div>
            </div> */}
            <div className='bg-blue-500 py-4 px-6 text-black flex items-center justify-end absolute top-0 left-56 right-0 bottom-0 h-[5rem]'>
                <div className='flex items-center gap-2 pr-10'>
                    <div className="text-white">{userEmail}</div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`${
                            dropDown
                                ? "text-white cursor-pointer rotate-180 transition-all"
                                : "text-white cursor-pointer rotate-360 transition-all"
                        }`}
                        onClick={() => setDropDown((prev) => !prev)}
                    />
                    {dropDown && (
                        <div className='font-first bg-[rgba(255,255,255,1)] rounded-md drop-shadow-lg absolute right-10 top-16 z-40'>
                            <div className='px-2 my-1'>{userEmail}</div>
                            {dropdownMenus.map((item, index) => (
                                <div key={index}>
                                    <NavLink
                                        to={item.to}
                                        className='flex items-center gap-2 pl-4 py-1 hover:text-blue-400'
                                    >
                                        <div>
                                            <FontAwesomeIcon icon={item.icon} />
                                        </div>

                                        <div className='w-40'>{item.name}</div>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* <div className='bg-sky-700 h-14 col-span-3'>p</div>
                <div className='bg-sky-700 h-14 col-span-3 col-start-4'>p</div> */}
            </div>
        </>
    );
};

export default Header;
