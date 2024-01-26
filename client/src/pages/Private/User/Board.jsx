import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import SidebarAgent from "../../../components/SidebarAgent";
import Contacts from "../../../components/Contacts.jsx";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Board = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicketComment, setSelectedTicketComment] = useState("");

    useEffect(() => {
        getAllTickets();
    }, []);

    const getAllTickets = async () => {
        try {
            const response = await axios.get("http://localhost:8081/tickets");
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const renderTicketsByStatus = (activityType) => {
        return tickets
            .filter((ticket) => ticket.activityType === activityType)
            .map((ticket) => (
                <div key={ticket.id} className='bg-white p-4 mb-4 rounded border'>
                    <h3 className='text-lg font-bold'>{ticket.title}</h3>
                    <p className='text-sm'>{ticket.description}</p>
                    <Link to={`/customer/board/comment/${ticket.id}`}>
                        <Button pill>Details</Button>
                    </Link>
                </div>
            ));
    };

    return (
        <>
            <Header />
            <Sidebar />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='flex p-8 space-x-8'>
                    <div className='w-1/3'>
                        <h2 className='text-xl font-bold mb-4'>Not Started</h2>
                        {renderTicketsByStatus("Not Started")}
                    </div>
                    <div className='w-1/3'>
                        <h2 className='text-xl font-bold mb-4'>In Progress</h2>
                        {renderTicketsByStatus("In Progress")}
                    </div>
                    <div className='w-1/3'>
                        <h2 className='text-xl font-bold mb-4'>Done</h2>
                        {renderTicketsByStatus("Done")}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Board;
