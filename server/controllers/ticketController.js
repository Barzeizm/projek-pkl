import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Tickets from "../models/ticketModels.js";
import Users from "../models/userModel.js";

export const getAllTickets = async (req, res) => {
    try {
        const response = await Tickets.findAll({
            include: [{ model: Users, attributes: ["email"], required: true, }],
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

//ticketControllers.js
export const createTickets = async (req, res) => {
    const { title, description, status, priority, userId } = req.body;

    try {
        // Create a new ticket with assigneeId set to user's id
        const newTicket = await Tickets.create({
            title,
            description,
            status,
            priority,
            userId: userId,
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


export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Check if the user exists
        const ticket = await Tickets.findByPk(id);
    
        if (!ticket) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Delete the user
        await ticket.destroy();
    
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}
