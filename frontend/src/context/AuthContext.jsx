import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create authentication context
export const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check session status on page load
    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/check-session", { withCredentials: true })
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => console.error("Session Check Failed:", err));
    }, []);

    // Login function
    const login = async (username, password) => {
        try {
            
            const res = await axios.post("http://localhost:5000/api/auth/login", 
                { username, password }
                // { withCredentials: true }
            );
            console.log(res)
            setUser(res.data.user);
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message || error.message);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/login"); // Redirect to login after logout
        } catch (error) {
            console.error("Logout Error:", error.response?.data?.message || error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

