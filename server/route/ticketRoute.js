import express from 'express';
import {
    createTickets,
    deleteTicket,
    getAllTickets,
} from '../controllers/ticketController.js';

const router = express.Router();

router.get('/tickets', getAllTickets);
router.post('/tickets', createTickets);
router.delete('/tickets/:id', deleteTicket)

export default router;