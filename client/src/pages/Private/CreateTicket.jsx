import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const CreateTicket = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [userId, setUserId] = useState("");

  const getAllTickets = async () => {
    const response = await axios.get("http://localhost:8081/tickets");
    setTickets(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getAllTickets();
  }, []);

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

  const createTicket = async () => {
    try {
      const response = await axios.post("http://localhost:8081/tickets", {
        title: title,
        description: description,
        priority: priority,
        userId: userId, // Include the userId in the request body
      });

      console.log("Ticket created successfully:", response.data);
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  const resetForm = () =>{
    setTitle("");
    setDescription("");
    setPriority("");
    setUserId("");
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="absolute top-[5rem] left-56 right-0 bottom-0">
        <div className="flex justify-center ">
          <div className="m-5 drop-shadow-lg flex justify-center rounded-md w-11/12 h-full">
            <div className="w-full m-10">
              <div className="text-3xl mb-6">Create Your Ticket</div>
              <form className="flex flex-col gap-4">
                <label htmlFor="title" className="text-xl">
                  Add Your Title
                </label>
                <input
                  className="w-full h-8"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="desc" className="text-xl">
                  Add Your Content
                </label>
                <textarea
                  name="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="10"
                ></textarea>
                <label htmlFor="priority" className="text-xl">
                  Priority
                </label>
                <select
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critically">Critically</option>
                </select>
                <label htmlFor="assignee">Assignee to</label>
                <select
                  name="assignee"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option value="">Assignee</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between gap-4">
                  <button type="button" onClick={resetForm}>Cancel</button>
                  <button type="button" onClick={createTicket}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTicket;
