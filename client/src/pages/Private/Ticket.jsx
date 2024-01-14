import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Ticket = () => {
    const [tickets, setTickets] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTickets, setSelectedTickets] = useState([]);
    //   const history = useHistory();

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

    const handleDeleteSelected = async () => {
      try {
        // Iterate over selectedTickets and delete each ticket by its id
        for (const ticketId of selectedTickets) {
          await axios.delete(`http://localhost:8081/tickets/${ticketId}`);
        }
    
        getAllTickets(); // Refresh the ticket list after deletion
        setSelectedTickets([]); // Clear the selected tickets after deletion
        setSelectAll(false); // Reset the "Select All" checkbox
      } catch (error) {
        console.error("Error deleting tickets:", error);
      }
    };
    

    //   const handleEditTicket = (ticketId) => {
    //     history.push(`/ticket/edit/${ticketId}`);
    //   };

    return (
        <>
            <Sidebar />
            <Header />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='font-bold text-xl mb-4'>Ticket List</div>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <button
                            className='btn btn-primary mr-2'
                            onClick={handleDeleteSelected}
                            disabled={selectedTickets.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div>
                        <Link to='/ticket/create'>
                            <button className='btn btn-primary'>Create Ticket</button>
                        </Link>
                    </div>
                </div>
                <div className='h-[39rem] overflow-scroll overflow-x-hidden no-scrollbar mt-4 border-b-2'>
                    <table className='min-w-full bg-white border rounded'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='py-2'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            className='checkbox'
                                            id='checkedAll'
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </label>
                                </th>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Description</th>
                                <th className='py-2'>Status</th>
                                <th className='py-2'>Priority</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className='py-2'>
                                        <label>
                                            <input
                                                type='checkbox'
                                                className='checkbox'
                                                checked={selectedTickets.includes(ticket.id)}
                                                onChange={() => handleTicketSelection(ticket.id)}
                                            />
                                        </label>
                                    </td>
                                    <td className='py-2'>
                                        <div className='flex items-center space-x-3'>
                                            <div>
                                                <div className='font-bold'>{ticket.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2'>{ticket.description}</td>
                                    <td className='py-2'>{ticket.status}</td>
                                    <td className='py-2'>{ticket.priority}</td>
                                    <td className='py-2'>
                                        <button
                                            className='btn btn-ghost btn-xs mr-2'
                                            onClick={() => handleEditTicket(ticket.id)}
                                        >
                                            Edit
                                        </button>
                                        <Link to={`/ticket/${ticket.id}`}>
                                            <button className='btn btn-ghost btn-xs'>
                                                Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Ticket;
