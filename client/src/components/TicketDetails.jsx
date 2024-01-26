import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetails = () => {
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

    return (
        <>
            <div>
                <div>{tickets.title}</div>
            </div>
        </>
    );
};

export default TicketDetails;
