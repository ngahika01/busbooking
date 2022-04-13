import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import LoginScreen from "./screens/auth/LoginScreen";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./config/theme";
import RegisterScreen from "./screens/auth/RegisterScreen";
const App = () => {
  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<RegisterScreen />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
