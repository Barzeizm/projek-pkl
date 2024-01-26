import express from 'express';
import {
    createComment,
    getCommentsByTicketId
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/tickets/:ticketId/comments', getCommentsByTicketId);
router.post('/tickets/:ticketId/comments', createComment);

export default router;