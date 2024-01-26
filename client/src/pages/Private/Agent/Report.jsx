import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import { Table, TextInput } from "flowbite-react";
import SidebarAgent from "../../../components/SidebarAgent";

const Report = () => {
    const [ticketData, setTicketData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

    // Filter ticket data based on startDate and endDate
    const filteredTicketData = ticketData.filter((ticket) => {
        const ticketDate = new Date(ticket.createdAt);
        return (
            (!startDate || ticketDate >= new Date(startDate)) &&
            (!endDate || ticketDate <= new Date(endDate))
        );
    });

    return (
        <>
            <Header />
            <SidebarAgent />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='p-8'>
                    <h2 className='text-2xl font-bold mb-4'>Ticket Report</h2>
                    <div className="flex justify-end gap-4">
                        <div className='mb-4'>
                            <label htmlFor='startDate' className='mr-2'>
                                Start Date:
                            </label>
                            <TextInput
                                type='date'
                                id='startDate'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='endDate' className='mr-2'>
                                End Date:
                            </label>
                            <TextInput
                                type='date'
                                id='endDate'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Created At</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Priority</Table.HeadCell>
                            <Table.HeadCell>Assignee</Table.HeadCell>
                            {/* Add more table headers as needed */}
                        </Table.Head>
                        <Table.Body>
                            {filteredTicketData.map((ticket) => (
                                <Table.Row
                                    key={ticket.id}
                                    className={ticket.id % 2 === 0 ? "bg-gray-50" : ""}
                                >
                                    <Table.Cell>{ticket.title}</Table.Cell>
                                    <Table.Cell>
                                        {new Date(ticket.createdAt).toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell>{ticket.statusType}</Table.Cell>
                                    <Table.Cell>{ticket.priority}</Table.Cell>
                                    <Table.Cell>{ticket.user.email}</Table.Cell>
                                    {/* Add more table cells as needed */}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                {/* Additional report content and charts can be added here based on your requirements */}
            </div>
        </>
    );
};

export default Report;
