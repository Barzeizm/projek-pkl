import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';
import ticketRoute from './route/ticketRoute.js';

const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
  res.send();
});

app.use(userRoute);
app.use(ticketRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});