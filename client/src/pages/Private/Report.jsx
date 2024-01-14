import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Report = () => {
    const [ticketData, setTicketData] = useState([]);

    useEffect(() => {
        // Fetch ticket data from the server or API
        const fetchTicketData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/tickets");
                setTicketData(response.data);
            } catch (error) {
                console.error("Error fetching ticket data:", error);
            }
        };

        fetchTicketData();
    }, []);

    // Calculate report statistics based on ticket data
    const totalTickets = ticketData.length;
    const openTickets = ticketData.filter((ticket) => ticket.status === "Open").length;
    const closedTickets = ticketData.filter((ticket) => ticket.status === "Closed").length;

    return (
        <>
            <Header />
            <Sidebar />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='p-8'>
                    <h2 className='text-2xl font-bold mb-4'>Ticket Report</h2>
                    <div className='grid grid-cols-4 gap-4'>
                        {ticketData.map((ticket) => (
                            <div
                                key={ticket.id}
                                className='bg-white p-4 border rounded-md shadow-md'
                            >
                                <h3 className='text-lg font-bold mb-2'>{ticket.title}</h3>
                                <p>
                                    <strong>Created At:</strong>{" "}
                                    {new Date(ticket.createdDate).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Status:</strong> {ticket.status}
                                </p>
                                <p>
                                    <strong>Priority:</strong> {ticket.priority}
                                </p>
                                {/* Add more ticket details as needed */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional report content and charts can be added here based on your requirements */}
            </div>
        </>
    );
};

export default Report;
