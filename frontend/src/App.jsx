import React from "react";
import {  Routes, Route } from "react-router-dom";
// import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        // <AuthProvider>

            
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
           
        // {/* </AuthProvider> */}
    );
};

export default App;
