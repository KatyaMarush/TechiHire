import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("authToken");

        const googleUser = Cookies.get("googleUser");
        if (googleUser) {
            const { sub } = JSON.parse(googleUser);
            window.google?.accounts.id.revoke(sub, () => {
                console.log("User logged out from Google");
            });
        }

        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 500);
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
