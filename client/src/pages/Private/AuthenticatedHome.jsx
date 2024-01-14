import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

const AuthenticatedHome = () => {
    const [ticketCounts, setTicketCounts] = useState({
        total: 0,
        open: 0,
        closed: 0,
        inProgress: 0,
        warning: 0,
    });

    useEffect(() => {
        // Mock ticket data
        const ticketData = [
            { id: 1, status: "open", createdDate: "2022-01-01" },
            // ... (your other ticket data)
        ];

        // Calculate ticket counts
        const totalCount = ticketData.length;
        const openCount = ticketData.filter((ticket) => ticket.status === "open").length;
        const closedCount = ticketData.filter((ticket) => ticket.status === "closed").length;
        const inProgressCount = ticketData.filter(
            (ticket) => ticket.status === "inProgress"
        ).length;
        const warningCount = ticketData.filter(
            (ticket) =>
                (ticket.status === "open" || ticket.status === "inProgress") &&
                Math.floor((new Date() - new Date(ticket.createdDate)) / (1000 * 60 * 60 * 24)) > 2
        ).length;

        setTicketCounts({
            total: totalCount,
            open: openCount,
            closed: closedCount,
            inProgress: inProgressCount,
            warning: warningCount,
        });
    }, []);

    return (
        <>
            <Sidebar />
            <Header />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0 bg-gray-100'>
                <h2 className='text-2xl font-bold mb-4'>Ticket Statistics</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {Object.entries(ticketCounts).map(([key, value]) => (
                        <div
                            key={key}
                            className='bg-white p-6 rounded-lg shadow-md flex items-center justify-between'
                        >
                            <div className='flex items-center'>
                                <FontAwesomeIcon
                                    icon={
                                        key === "open"
                                            ? faExclamationTriangle
                                            : key === "closed"
                                            ? faCheckCircle
                                            : faSpinner
                                    }
                                    className={`text-${
                                        key === "open"
                                            ? "yellow"
                                            : key === "closed"
                                            ? "green"
                                            : "blue"
                                    }-500 mr-2`}
                                />
                                <div>
                                    <p className='text-lg font-semibold'>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </p>
                                    <p className='text-3xl font-bold'>{value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AuthenticatedHome;
