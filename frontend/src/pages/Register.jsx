import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Set page title
    useEffect(() => {
        document.title = "Register Page";
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            
            const respose =await axios.post("http://localhost:5000/api/auth/register", user);
            console.log(respose)

            setMessage("✅ Registration successful! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage("❌ Registration failed! Try again.");
        }
    };

    return (
        <Container>
            <FormContainer>
                <h2>Register</h2>
                <Form onSubmit={handleRegister}>
                    <Input type="text" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} required />
                    <Input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                    <Button type="submit">Register</Button>
                </Form>
                <p>{message}</p>
                <p>Have an account? <StyledLink to="/">Login</StyledLink></p>
            </FormContainer>
        </Container>
    );
};

export default Register;

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6;
`;

const FormContainer = styled.div`
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
`;

const Button = styled.button`
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #218838;
    }
`;

const StyledLink = styled(Link)`
    color: #007BFF;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
