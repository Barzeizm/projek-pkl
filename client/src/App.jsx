import { useState, useEffect } from "react";
import Home from "./pages/Public/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Public/Login.jsx";
import AuthenticatedHome from "./pages/Private/AuthenticatedHome";
import Logout from "./pages/Private/Logout.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Profile from "./pages/Private/Profile.jsx";
import Register from "./pages/Public/Register.jsx";
import Ticket from "./pages/Private/Ticket.jsx";
import Board from "./pages/Private/Board.jsx";
import Report from "./pages/Private/Report.jsx";
import CreateTicket from "./pages/Private/CreateTicket.jsx";

function App() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     // Check authentication status (you might need to modify this)
    //     const token = localStorage.getItem("token");
    //     setIsAuthenticated(!!token);
    // }, []);

    return (
        <>
            <Router>
                {/* <Routes>
                    
                    <Route path='/login' element={<Login />} />
                    <Route
                        isAuthenticated={isAuthenticated}
                        path='/home'
                        element={<AuthenticatedHome />}
                    />
                    
                </Routes> */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route element={<PrivateRoutes />}>
                        <Route element={<AuthenticatedHome />} path='/home' exact />
                        <Route element={<Ticket />} path='/ticket' />
                        <Route element={<CreateTicket />} path='/ticket/create' />
                        <Route element={<Board />} path='/board' />
                        <Route element={<Report />} path='/report' />
                        <Route element={<Profile />} path='/profile' />
                        <Route path='/logout' element={<Logout />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
