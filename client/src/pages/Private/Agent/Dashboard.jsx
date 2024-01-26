import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import SidebarAgent from "../../../components/SidebarAgent";
import { Table, Pagination } from "flowbite-react";

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const [openTickets, setOpenTickets] = useState(0);
    const [warningTickets, setWarningTickets] = useState(0);
    const [openTicketsList, setOpenTicketsList] = useState([]);

    const ticketFilter = async () => {
        try {
            const response = await axios.get("http://localhost:8081/tickets");
            setTickets(response.data);
            setTotalTickets(response.data.length);

            const openTicketsCount = response.data.filter(
                (ticket) => ticket.statusType === "Open"
            ).length;
            setOpenTickets(openTicketsCount);

            const warningTicketsCount = response.data.filter(
                (ticket) => ticket.statusType === "Warning"
            ).length;
            setWarningTickets(warningTicketsCount);

            const openTickets = response.data.filter((ticket) => ticket.statusType === "Open");
            setOpenTicketsList(openTickets);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        ticketFilter();
    }, []);

    return (
        <>
            <SidebarAgent />
            <Header />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0 bg-gray-100'>
                <h2 className='text-2xl font-bold mb-4'>Ticket Statistics</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div className='bg-white p-6 rounded-lg shadow-md flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div>
                                <p className='text-lg font-semibold'>Total</p>
                                <p className='text-3xl font-bold'>{totalTickets}</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div>
                                <p className='text-lg font-semibold'>Open</p>
                                <p className='text-3xl font-bold'>{openTickets}</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div>
                                <p className='text-lg font-semibold'>Warning</p>
                                <p className='text-3xl font-bold'>{warningTickets}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-2xl font-bold mt-4'>Open Tickets</div>
                <div>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Assignee</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {openTicketsList.map((ticket) => (
                                <Table.Row
                                    key={ticket.id}
                                    className={ticket.id % 2 === 0 ? "bg-gray-50" : ""}
                                >
                                    <Table.Cell>{ticket.title}</Table.Cell>
                                    <Table.Cell>{ticket.description}</Table.Cell>
                                    <Table.Cell>{ticket.user.email}</Table.Cell>
                                    <Table.Cell>{ticket.statusType}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <div>
                        </div>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
