import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextInput } from "flowbite-react";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Decode the token to get user information
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      // Extract email from decoded token
      const { userId, username, email, password } = decodedToken;

      // Set the user information in state
      setUserName(username);
      setUserEmail(email);
      setUserPassword(password);
    }
  }, []);

  const updateUser = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Decode the token to get user information
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      // Extract user ID from decoded token
      const { userId } = decodedToken;

      // Create a payload object with the updated user data
      const payload = {
        username: username,
        email: email,
        password: password,
      };

      // Send the PATCH request to update the user
      const response = await axios.patch(
        `http://localhost:8081/users/edit/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response and update the user state if necessary
      // ...

      console.log("User updated successfully", response.data);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Profile Settings</h2>
      <div className="flex flex-col gap-4">
        <TextInput
          className="w-4/5"
          placeholder={username}
          onChange={(e) => setUserName(e.target.value)}
        ></TextInput>
        <TextInput
          className="w-4/5"
          placeholder={email}
          onChange={(e) => setUserEmail(e.target.value)}
        ></TextInput>
        <TextInput
        type="password"
          className="w-4/5"
        //   placeholder={password}
          onChange={(e) => setUserPassword(e.target.value)}
        ></TextInput>
        {/* <div>{userId}</div> */}
      </div>
      {/* Add other profile settings fields here */}
      <button onClick={updateUser}>Update User</button>
    </div>
  );
};

export default Profile;