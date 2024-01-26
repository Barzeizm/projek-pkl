import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import userRoute from "./route/userRoute.js";
import ticketRoute from "./route/ticketRoute.js";
import commentRoute from "./route/commentRoute.js";

const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "bezkoder-session",
        keys: "COOKIE_SECRET",
        httpOnly: true,
    })
);

app.get("/", (req, res) => {
    res.send();
});

app.use(userRoute);
app.use(ticketRoute);
app.use(commentRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
