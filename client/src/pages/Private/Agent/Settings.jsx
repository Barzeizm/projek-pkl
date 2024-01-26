import React from "react";
import Profile from "../../../components/Profile";
import Header from "../../../components/Header";
import SidebarAgent from "../../../components/SidebarAgent";

const Settings = () => {
    return (
        <>
            <Header />
            <SidebarAgent />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <Profile />
            </div>
        </>
    );
};

export default Settings;
