import Tickets from "../models/ticketModels.js";
import Comment from "../models/commentModels.js";

// Create a new comment for a ticket
export const createComment = async (req, res) => {
    try {
        const { ticketId, content, createdBy } = req.body;

        // Check if the ticket exists
        const ticket = await Tickets.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        // Create the comment
        const comment = await Comment.create({
            ticketId,
            content,
            createdBy,
        });

        return res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get all comments for a ticket
export const getCommentsByTicketId = async (req, res) => {
    try {
        const { ticketId } = req.params;

        // Check if the ticket exists
        const ticket = await Tickets.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        // Get all comments for the ticket
        const comments = await Comment.findAll({
            where: { ticketId },
            order: [["createdAt", "DESC"]],
        });

        return res.json(comments);
    } catch (error) {
        console.error("Error getting comments:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};