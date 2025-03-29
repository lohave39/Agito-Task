import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // Set page title
    useEffect(() => {
        document.title = "Login Page";
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username,credentials.password);
            navigate("/dashboard");
        } catch {
            setError("❌ Invalid username or password.");
        }
    };

    return (
        <Container>
            <FormContainer>
                <h2>Login</h2>
                <Form onSubmit={handleLogin}>
                    <Input type="text" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required />
                    <Input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
                    <Button type="submit">Login</Button>
                </Form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <p>Don't have an account? <StyledLink to="/register">Register</StyledLink></p>
            </FormContainer>
        </Container>
    );
};

export default Login;

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
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;

const StyledLink = styled(Link)`
    color: #007BFF;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
