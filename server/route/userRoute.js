import express from "express"
import {
    getAllUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    loginUser
} from "../controllers/userController.js"

const router = express.Router()

router.post('/signup', createUsers);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.patch('/users/edit/:id', updateUsers)
router.delete('/users/delete/:id', deleteUsers)

export default router;