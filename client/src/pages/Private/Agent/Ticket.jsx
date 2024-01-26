import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import {  Pagination } from "flowbite-react";
import Header from "../../../components/Header";
import SidebarAgent from "../../../components/SidebarAgent";
import TicketList from "../../../components/TicketList";
import Paginations from "../../../components/Paginations";

const Ticket = () => {
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage, setTicketsPerPage] = useState(8);

    const getTickets = async () => {
        const response = await axios.get("http://localhost:8081/tickets");
        setTickets(response.data);
    };

    useEffect(() => {
        getTickets();
    }, []);

    const lastPostIndex = currentPage * ticketsPerPage;
    const firstPostIndex = lastPostIndex - ticketsPerPage;
    const currentPosts = tickets.slice(firstPostIndex, lastPostIndex);
    return (
        <>
            <SidebarAgent />
            <Header />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='font-bold text-xl mb-4'>Ticket List</div>
                <div className='h-[39rem] overflow-scroll overflow-x-hidden no-scrollbar mt-4 border-b-2'>
                    <TicketList tickets={currentPosts} />
                    <Paginations
                        totalPosts={tickets.length}
                        postsPerPage={ticketsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </>
    );
};

export default Ticket;
