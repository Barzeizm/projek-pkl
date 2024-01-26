import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Tickets from "../models/ticketModels.js";
import Users from "../models/userModel.js";
import TicketActivity from "../models/ticketActivityModels.js";
import TicketStatus from "../models/ticketStatusModels.js";

export const getAllTickets = async (req, res) => {
    try {
        const response = await Tickets.findAll({
            include: [{ model: Users, attributes: ["email"], required: true }],
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getTicketById = async (req, res) => {
    try {
        const response = await Tickets.findOne({ where: { id: req.params.id } });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};


export const createTicket = async (req, res) => {
    const { title, description, assignee, activityType, statusType, createdBy } = req.body;

    try {
        // Create a new ticket with assigneeId set to user's id
        const newTicket = await Tickets.create({
            title,
            description,
            assignee,
            createdBy,
            statusType: statusType,
            activityType: activityType,
        });

        // Include assigneeEmail in the response
        res.status(201).json({
            message: "Ticket created successfully",
            ticket: {
                ...newTicket.dataValues,
            },
        });
    } catch (error) {
        console.error("Error creating ticket:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, userId, activityType, statusType } = req.body;

        // Cek apakah ticket dengan id yang diberikan ada
        const ticket = await Tickets.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Lakukan update hanya untuk field yang diberikan (gunakan spread operator)

        // Ambil data ticket setelah diupdate
        const updatedTicket = {
            title: title,
            description: description,
            priority: priority,
            userId: userId,
            activityType: activityType,
            statusType: statusType,
        };

        await ticket.update(updatedTicket);

        res.json(updatedTicket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user exists
        const ticket = await Tickets.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await ticket.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
