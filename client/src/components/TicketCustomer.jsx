import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";

const TicketCustomer = () => {
    const [tickets, setTickets] = useState([]);
    const [email, setUserEmail] = useState();

    useEffect(() => {
        // Fetch tickets based on the email of the logged-in user
        const fetchTickets = async () => {
            try {
                const response = await axios.get("http://localhost:8081/tickets")
                // const storedTickets = JSON.parse(localStorage.getItem("tickets"));

                // if (storedTickets && storedTickets.length > 0) {
                //     setTickets(storedTickets);
                // } else {
                    // const response = await axios.get("http://localhost:8081/", {
                        // headers: {
                        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
                        // },
                    // });
                    const token = localStorage.getItem("token");

                    // Decode the token to get user information
                    if (token) {
                        const decodedToken = JSON.parse(atob(token.split(".")[1]));

                        // Extract email from decoded token
                        const { email } = decodedToken;

                        setUserEmail(email);
                    }
                    const filteredTickets = response.data.filter((ticket) => {
                        return ticket.createdBy === email;
                    });
                    setTickets(filteredTickets);
                    // localStorage.setItem("tickets", JSON.stringify(filteredTickets));
                    console.log(response.data);
                // }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <>
            <div className=''>My Tickets</div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Assigne To</Table.HeadCell>
                    <Table.HeadCell>Created By</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tickets.map((ticket, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{ticket.title}</Table.Cell>
                            <Table.Cell>{ticket.description}</Table.Cell>
                            <Table.Cell>{ticket.assignee}</Table.Cell>
                            <Table.Cell>{ticket.createdBy}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {/*             
                <div
                    className='flex justify-between border-2 rounded-md p-3 bg-slate-200'
                    key={ticket.id}
                >
                    <div>
                        <div>{ticket.title}</div>
                    </div>
                    <div>
                        <div>{ticket.status}</div>
                        <div>{ticket.assignee}</div>
                    </div>
                    <div>{ticket.createdBy}</div>
                </div> */}
        </>
    );
};

export default TicketCustomer;
