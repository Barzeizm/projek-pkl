import express from 'express';
import {
    createTicket,
    getTicketById,
    deleteTicket,
    getAllTickets,
    updateTicket,
} from '../controllers/ticketController.js';

const router = express.Router();

router.get('/tickets', getAllTickets);
router.post('/tickets', createTicket);
router.get('/tickets/:id', getTicketById);
router.patch('/tickets/edit/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);

export default router;