import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

const Contacts = () => {
    const [users, setUsers] = useState([]);
    const [email, setUserEmail] = useState();
    const form = useRef();

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8081/users");
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Decode the token to get user information
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Extract email from decoded token
            const { email } = decodedToken;

            setUserEmail(email);
        }
    }, []);

    const user_name = email;

    const options = users.map((user) => {
        if (user.roleId === 2)
            return (
                <option key={user.email} value={user.email}>
                    {user.email}
                </option>
            );
    });

    // const assignee = () => {
    //     {
    //         users.map((user) => {
    //             if (user.roleId === 2) {
    //                 {
    //                     user.email;
    //                 }
    //             }
    //         });
    //     }
    // };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_a6xw95m", "template_ryzbbdz", form.current, "oop6omlyhaDfqsSd4")
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <>
            <div>
                <form ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type='text' name='user_name' value={email} defaultValue={user_name} hidden/>
                    <label>Email</label>
                    <select name='assignee'>{options}</select>
                    <label>Message</label>
                    <textarea name='message' />
                    <input type='submit' value='Send' />
                </form>
            </div>
        </>
    );
};

export default Contacts;
