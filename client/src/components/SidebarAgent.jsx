import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFlag,
    faHome,
    faList,
    faRightFromBracket,
    faGear,
    faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

const SidebarAgent = () => {
    // const [showSidebar, setShowSidebar] = useState(true);

    const menus = [
        {
            name: "Dashboard",
            to: "/agent/dashboard",
            icon: faHome,
        },
        {
            name: "Ticket",
            to: "/agent/ticket",
            icon: faList,
        },
        {
            name: "Board",
            to: "/agent/board",
            icon: faSquareCheck,
        },
        {
            name: "Report",
            to: "/agent/report",
            icon: faFlag,
        },
        {
            name: "Settings",
            to: "/agent/settings",
            icon: faGear,
        },
    ];

    return (
        <>
            <div className='w-56 h-screen bg-white shadow'>
                <div className='p-[1.7rem] bg-blue-500 text-white'>
                    <h2 className='text-xl font-bold'>AsAHelp</h2>
                </div>
                {menus.map((item, index) => (
                    <div key={index}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center gap-4 py-3 px-6 text-blue-500 bg-gray-100"
                                    : "flex items-center gap-4 py-3 px-6 text-gray-600 hover:bg-gray-100 transition-all"
                            }
                        >
                            <div>
                                <FontAwesomeIcon icon={item.icon} className='text-xl' />
                            </div>
                            <div>{item.name}</div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SidebarAgent;
