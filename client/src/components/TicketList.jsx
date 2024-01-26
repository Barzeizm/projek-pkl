import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button, Table, TextInput, Select, Pagination } from "flowbite-react";

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(9);
    const history = useNavigate();

    useEffect(() => {
        getAllTickets();
    }, []);

    const getAllTickets = async () => {
        try {
            const response = await axios.get("http://localhost:8081/tickets");
            setTickets(response.data);
            console.log(response.data);
            console.log(setTickets)
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const handleTicketSelection = (ticketId) => {
        if (selectedTickets.includes(ticketId)) {
            setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
        } else {
            setSelectedTickets([...selectedTickets, ticketId]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedTickets([]);
        } else {
            setSelectedTickets(tickets.map((ticket) => ticket.id));
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteSelected = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-overlay'>
                        <div className='react-confirm-alert'>
                            <h2>Confirm Deletion</h2>
                            <p>Are you sure you want to delete the selected tickets?</p>
                            <div className='flex flex-row justify-evenly'>
                                <Button
                                    color='failure'
                                    onClick={async () => {
                                        try {
                                            // Iterate over selectedTickets and delete each ticket by its id
                                            for (const ticketId of selectedTickets) {
                                                await axios.delete(
                                                    `http://localhost:8081/tickets/${ticketId}`
                                                );
                                            }
                                            toast.success("");

                                            getAllTickets(); // Refresh the ticket list after deletion
                                            setSelectedTickets([]); // Clear the selected tickets after deletion
                                            setSelectAll(false); // Reset the "Select All" checkbox
                                        } catch (error) {
                                            console.error("Error deleting tickets:", error);
                                        }
                                        onClose();
                                    }}
                                >
                                    Yes
                                </Button>
                                <Button color='success' onClick={onClose}>
                                    No
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    };

    const searchInput = (e) => {};

    const handleSortBy = (value) => {
        setSortBy(value);
    };

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    // const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex flex-row mx-4 gap-4'>
                    <Button
                        color='failure'
                        pill
                        className=''
                        onClick={handleDeleteSelected}
                        disabled={selectedTickets.length === 0}
                    >
                        Delete Selected
                    </Button>
                    <Link to='/ticket/create'>
                        <Button color='blue' pill className=''>
                            Create Ticket
                        </Button>
                    </Link>
                </div>
                <div className='flex mx-4'>
                    <Select onChange={(e) => handleSortBy(e.target.value)}>
                        <option value=''>Sort By</option>
                        <option value='title'>Title</option>
                        <option value='assignee'>Assignee</option>
                        <option value='statusType'>Status</option>
                        <option value='activityType'>activityType</option>
                    </Select>
                    <form>
                        <TextInput
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Serach'
                        />
                    </form>
                </div>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                        <label>
                            <input
                                type='checkbox'
                                className='checkbox'
                                id='checkedAll'
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </label>
                    </Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Assignee To</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tickets
                        .filter((ticket) => {
                            return search.toLowerCase() === ""
                                ? ticket
                                : ticket.title.toLowerCase().includes(search);
                        })
                        .sort((a, b) => {
                            if (sortBy === "title") {
                                return a.title.localeCompare(b.title);
                            } else if (sortBy === "assignee") {
                                return a.user.email.localeCompare(b.user.email);
                            } else if (sortBy === "statusType") {
                                return a.statusType.localeCompare(b.statusType);
                            } else {
                                return 0;
                            }
                        })
                        .map((ticket, index) => (
                            <Table.Row key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                <Table.Cell className='py-2'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            className='checkbox'
                                            checked={selectedTickets.includes(ticket.id)}
                                            onChange={() => handleTicketSelection(ticket.id)}
                                        />
                                    </label>
                                </Table.Cell>
                                <Table.Cell className='py-2'>
                                    <div className='flex items-center space-x-3'>
                                        <div>
                                            <div className='font-bold'>{ticket.title}</div>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='py-2'>{ticket.description}</Table.Cell>
                                <Table.Cell className='py-2'>{ticket.statusType}</Table.Cell>
                                <Table.Cell className='py-2'>{ticket.priority}</Table.Cell>
                                <Table.Cell className='py-2'>{ticket.user.email}</Table.Cell>
                                <Table.Cell className='py-2 flex gap-2'>
                                    <Link to={`/agent/ticket/edit/${ticket.id}`}>
                                        <Button color='blue' pill>
                                            Edit
                                        </Button>
                                    </Link>

                                    <Link to={`/agent/ticket/${ticket.id}`}>
                                        <Button pill>Details</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
            {/* <Pagination
                currentPage={currentPage}
                itemsPerPage={ticketsPerPage}
                totalItems={tickets.length}
                paginate={paginate}
            /> */}
        </>
    );
};

export default TicketList;
