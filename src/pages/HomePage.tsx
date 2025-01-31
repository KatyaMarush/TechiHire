import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove token
        navigate("/login"); // Redirect to login
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Home Page!
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};

export default HomePage;
