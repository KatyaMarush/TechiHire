import React from "react";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import AppRoutes from "./components/AppRoutes";

function App() {
  console.log("App component is rendering!"); // 🔍 Debugging
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <AppRoutes />
    // </ThemeProvider>
    <div style={{ color: "blue", fontSize: "30px" }}>
      🚀 React is working!
    </div>
  );
}

export default App;
