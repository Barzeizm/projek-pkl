import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

const CommentUser = () => {
    const location = useLocation();
    const [ticket, setTicket] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [tickets, setTickets] = useState([]);
    const { id } = useParams();

    const getTicketById = async () => {
        const response = await axios.get(`http://localhost:8081/tickets/${id}`);
        setTickets(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getTicketById();
    }, [id]);

    useEffect(() => {
        if (location.state && location.state.ticket) {
            setTicket(location.state.ticket);
        }
    }, [location.state]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8081/tickets/${id}/comments`, {
                content: comment,
                createdBy: "User",
            });

            // Add the comment to the comments list
            setComments((prevComments) => [...prevComments, response.data]);

            // Clear the comment input
            setComment("");
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
                <div className='p-4'>
                    <h2 className='text-2xl font-bold mb-4'>Comment Ticket</h2>
                    <div>{tickets.title}</div>
                    <div>{tickets.description}</div>

                    {/* Display existing comments */}
                    <div className='mb-4'>
                        <h3 className='text-lg font-semibold mb-2'>Comments:</h3>
                        {comments.map((comment, index) => (
                            <div key={index} className='mb-2'>
                                <p className='text-gray-800'>{comment.content}</p>
                                <p className='text-gray-400 text-sm'>By: {comment.createdBy}</p>
                            </div>
                        ))}
                    </div>

                    {/* Comment form */}
                    <form onSubmit={handleCommentSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='comment' className='block font-semibold mb-2'>
                                Comment:
                            </label>
                            <textarea
                                id='comment'
                                name='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                rows={4}
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
                        >
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CommentUser;