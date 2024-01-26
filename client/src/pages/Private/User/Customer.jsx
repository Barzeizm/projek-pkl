import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import TicketCustomer from "../../../components/TicketCustomer";

const Customer = () => {
    return (
        <>
            <Sidebar />
            <Header />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0 bg-gray-100'>
                <TicketCustomer />
            </div>
        </>
    );
};

export default Customer;
