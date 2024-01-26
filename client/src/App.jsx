import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Public/Home";
import Login from "./pages/Public/Login.jsx";
import Logout from "./pages/Private/Logout.jsx";
import ProtectedRouteAgent from "./utils/ProtectedRouteAgent.jsx";
import ProtectedRouteCustomer from "./utils/ProtectedRouteCustomer.jsx";
import Register from "./pages/Public/Register.jsx";
import Ticket from "./pages/Private/Agent/Ticket.jsx";
import TicketDetail from "./pages/Private/Agent/Detail.jsx";
import Board from "./pages/Private/User/Board.jsx";
import Report from "./pages/Private/Agent/Report.jsx";
import CreateTicket from "./pages/Private/User/CreateTicket.jsx";
import TicketEdit from "./pages/Private/TicketEdit.jsx";
import Customer from "./pages/Private/User/Customer.jsx";
import BoardAgent from "./pages/Private/Agent/BoardAgent.jsx";
import Dashboard from "./pages/Private/Agent/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import NotFoundAgent from "./pages/Private/Agent/NotFoundAgent.jsx";
import NotFoundCustomer from "./pages/Private/User/NotFoundCustomer.jsx";
import Detail from "./pages/Private/Agent/Detail.jsx";
import Settings from "./pages/Private/Agent/Settings.jsx";
import CommentAgent from "./pages/Private/Agent/CommentAgent.jsx";
import CommentUser from "./pages/Private/User/CommentUser.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);

        if (token) {
            const tokenParts = token.split(".");
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                const roleId = payload.roleId;
                setRoleId(roleId);
            }
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />
                <Route element={<ProtectedRouteAgent />}>
                    <Route element={<Dashboard />} path='/agent/dashboard' />
                    <Route element={<Settings />} path='/agent/settings' />
                    <Route element={<Ticket />} path='/agent/ticket' />
                    <Route element={<BoardAgent />} path='/agent/board' />
                    <Route element={<CommentAgent />} path='/agent/comment' />
                    <Route element={<Report />} path='/agent/report' />
                    <Route element={<Detail />} path='/agent/ticket/:id' />
                    <Route element={<TicketEdit />} path='/agent/ticket/edit/:id' />
                    <Route element={<NotFoundAgent />} path='/agent/notfound' />
                </Route>
                //untuk user
                <Route element={<ProtectedRouteCustomer />}>
                    <Route element={<Customer />} path='/customer/home' />
                    {/* <Route element={<Settings />} path='/agent/settings' /> */}
                    <Route element={<Ticket />} path='/customer/ticket' />
                    <Route element={<Board />} path='/customer/board' />
                    <Route element={<CommentUser />} path='/customer/board/comment/:id' />
                    <Route element={<CreateTicket />} path='/customer/ticket/create' />
                    <Route element={<NotFoundCustomer />} path='/customer/notfound' />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
