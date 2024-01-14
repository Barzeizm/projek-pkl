import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import Roles from "../models/roleModels.js";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "default-secret-key";
const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10;

export const getAllUsers = async (req, res) => {
    try {
        const response = await Users.findAll();
        res.status(200).json(response); 
    } catch (error) {
        console.log(error.message);
    }
};

export const createUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists by email or username
        const existingUser = await Users.findOne({
            where: {
                [Sequelize.Op.or]: [{ email }, { username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({ message: "Email already in use" });
            } else if (existingUser.username === username) {
                return res.status(409).json({ message: "Username already in use" });
            }
        }

        // Assign a default role or determine the role based on certain criteria
        const defaultRole = await Roles.findOne({
            where: { roleName: "Customer" }, // Change this based on your criteria
        });

        if (!defaultRole) {
            return res.status(500).json({ message: "Default role not found" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the user with the default roleId
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
            roleId: defaultRole.id,
        });

        // Create and sign a JWT token
        const token = jwt.sign({ email: newUser.email }, secretKey, {
            expiresIn: "1h",
        });

        res.status(201).json({ message: "User created", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        // Extract user credentials from the request body
        const { email, password } = req.body;

        // Find the user by email in the Users table
        const user = await Users.findOne({
            where: { email },
        });

        // If the user is not found, return an authentication failed response
        if (!user) {
            return res.status(401).json({ message: "Authentication failed. User not found." });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is not valid, return an authentication failed response
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Authentication failed. Invalid password." });
        }

        // Create and sign a JWT token with user's email and set expiration time
        const token = jwt.sign({ email: user.email, userId: user.id }, secretKey, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Send a successful response with the generated token and status code 200
        res.status(200).json({ message: "Authentication successful", token, email });
    } catch (error) {
        // Log any errors and send an error response with status code 500
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, roleId } = req.body;

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUserData = {
            username: username || user.username,
            email: email || user.email,
            password: password ? await bcrypt.hash(password, saltRounds) : user.password,
            roleId: roleId,
        };

        await user.update(updatedUserData);

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Check if the user exists
        const user = await Users.findByPk(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Delete the user
        await user.destroy();
    
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}