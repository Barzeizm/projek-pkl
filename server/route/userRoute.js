import express from "express"
import {
    getAllUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    Login,
    getProfile
} from "../controllers/userController.js"

const router = express.Router()

router.post('/signup', createUsers);
router.post('/login', Login);
router.get('/profile', getProfile);
router.get('/users', getAllUsers);
router.patch('/users/edit/:id', updateUsers)
router.delete('/users/delete/:id', deleteUsers)

export default router;