import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import Header from "../../components/Header";
import SidebarAgent from "../../components/SidebarAgent";
import { useParams, useNavigate, Form } from "react-router-dom";

const TicketEdit = () => {
    const [ticket, setTicket] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const getTicketById = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/tickets/${id}`);
            setTicket(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        getTicketById();
    }, [id]);

    const updateTicket = async () => {
        try {
            const response = await axios.patch(`http://localhost:8081/tickets/edit/${id}`, ticket);
            console.log("Ticket updated successfully:", response.data);
            // Redirect to ticket details page or another route after updating
            alert("Berhasil");
        } catch (error) {
            console.error("Error updating ticket", error);
        }
        navigate(`/agent/ticket`);
    };

    const handleInputChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />
            <SidebarAgent />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='flex justify-center '>
                    <div className='m-2 flex justify-center rounded-md w-11/12 h-full'>
                        <div className='w-full m-6'>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateTicket();
                                }}
                                className='flex flex-col gap-4'
                            >
                                <label htmlFor='title'>Title:</label>
                                <input
                                    className='w-full h-8 border-2 border-black rounded-sm'
                                    type='text'
                                    id='title'
                                    name='title'
                                    value={ticket.title || ""}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor='description'>Description:</label>
                                <textarea
                                    id='description'
                                    name='description'
                                    value={ticket.description || ""}
                                    onChange={handleInputChange}
                                ></textarea>

                                <label htmlFor='priority'>Priority:</label>
                                <select
                                    id='priority'
                                    name='priority'
                                    value={ticket.priority || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value='Low'>Low</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='High'>High</option>
                                    <option value='Critically'>Critically</option>
                                </select>

                                <label htmlFor='assignee'>Assignee:</label>
                                <input
                                    type='text'
                                    id='assignee'
                                    name='assignee'
                                    value={ticket.assignee || ""}
                                    onChange={handleInputChange}
                                />

                                <label htmlFor='statusType'>Status:</label>
                                <select
                                    id='statusType'
                                    name='statusType'
                                    value={ticket.statusType || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Set Status</option>
                                    <option value='Open'>Open</option>
                                    <option value='Closed'>Closed</option>
                                    <option value='Warning'>Warning</option>
                                </select>

                                <label htmlFor='activityType'>Activity:</label>
                                <select
                                    id='activityType'
                                    name='activityType'
                                    value={ticket.activityType || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value='Not Started'>Not Started</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done</option>
                                </select>

                                <button type='submit'>Update Ticket</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketEdit;
