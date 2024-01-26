import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Sidebar from "../../../components/Sidebar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import Contacts from "../../../components/Contacts.jsx";

const CreateTicket = () => {
    const [users, setUsers] = useState([]);
    const [email, setUserEmail] = useState();
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [assignee, setAsignee] = useState("");
    const form = useRef();

    const getAllTickets = async () => {
        const response = await axios.get("http://localhost:8081/tickets");
        setTickets(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getAllTickets();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8081/users");
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Decode the token to get user information
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Extract email from decoded token
            const { email } = decodedToken;

            setUserEmail(email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/tickets", {
                title: title,
                description: description,
                assignee: assignee,
                createdBy: email,
            });

            setTitle("");
            setDescription("");
            setAsignee("");
            setCreatedBy("");
            toast.success("Ticket created successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            console.log("Ticket created successfully:", response.data);
        } catch (error) {
            if (error.response) {
                toast.warning("Ticket creation failed", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }

        emailjs
            .sendForm("service_a6xw95m", "template_ryzbbdz", form.current, "oop6omlyhaDfqsSd4")
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const user_name = email;

    const options = users.map((user) => {
        if (user.roleId === 2)
            return (
                <option key={user.id} value={user.email}>
                    {user.email}
                </option>
            );
    });

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setAsignee("");
    };

    return (
        <>
            <Header />
            <Sidebar />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='flex justify-center '>
                    <div className='m-2 flex justify-center rounded-md w-11/12 h-full'>
                        <div className='w-full m-6'>
                            <div className='text-3xl mb-6'>Create Your Ticket</div>
                            <form ref={form} onSubmit={handleSubmit}>
                                {/* <input type="text" defaultValue={email}/> */}
                                <div className='mb-4'>
                                    <label htmlFor='title' className='block font-semibold mb-2'>
                                        Title
                                    </label>
                                    <input
                                        type='text'
                                        id='title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='createdBy' className='block font-semibold mb-2'>
                                        createdBy
                                    </label>
                                    <input
                                        placeholder={email}
                                        type='text'
                                        name="user_name"
                                        id='createdBy'
                                        defaultValue={createdBy}
                                        value={email}
                                        onChange={(e) => setCreatedBy(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='description'
                                        className='block font-semibold mb-2'
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id='description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                        required
                                    ></textarea>
                                </div>
                                {/* <div className='mb-4'>
                                    <label htmlFor='priority' className='block font-semibold mb-2'>
                                        Priority
                                    </label>
                                    <select
                                        id='priority'
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                        required
                                    >
                                        <option value=''>Select Priority</option>
                                        <option value='low'>Low</option>
                                        <option value='medium'>Medium</option>
                                        <option value='high'>High</option>
                                    </select>
                                </div> */}
                                <div className='mb-4'>
                                    <label htmlFor='assignee' className='block font-semibold mb-2'>
                                        Assignee To
                                    </label>
                                    <select
                                        id='assignee'
                                        name="assignee"
                                        value={assignee}
                                        onChange={(e) => setAsignee(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                        required
                                    >
                                        {options}
                                    </select>
                                </div>
                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none'
                                    >
                                        Create Ticket
                                    </button>
                                    <button
                                        type='button'
                                        onClick={resetForm}
                                        className='ml-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none'
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                            {/* <input
                                    type='text'
                                    hidden
                                    name='user_name'
                                    value={email}
                                    defaultValue={user_name}
                                />
                                <label htmlFor='title' className='text-xl'>
                                    Add Your Title
                                </label>
                                <input
                                    className='w-full h-8 border-2 border-black rounded-sm'
                                    type='text'
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label htmlFor='desc' className='text-xl'>
                                    Add Your Content
                                </label>
                                <textarea
                                    className='border-2 border-black rounded-sm'
                                    name='message'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols='30'
                                    rows='10'
                                ></textarea>
                                <label htmlFor='priority' className='text-xl'>
                                    Priority
                                </label>
                                <select
                                    className='border-2 border-black rounded-sm'
                                    name='priority'
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value=''>Priority</option>
                                    <option value='Low'>Low</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='High'>High</option>
                                    <option value='Critically'>Critically</option>
                                </select>
                                <label htmlFor='assignee'>Assignee to</label>
                                <select
                                    name='assignee'
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    <option value=''>Assignee</option>
                                    {options}
                                    {/* {users.map((user) => {
                                        if (user.roleId === 2) {
                                            return (
                                                <option key={user.id} value={user.id}>
                                                    {user.email}
                                                </option>
                                            );
                                        }
                                        return null;
                                    })}
                                </select> */}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default CreateTicket;
