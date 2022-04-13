import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, CssBaseline, Grid } from "@mui/material";
import LoginScreen from "./screens/auth/LoginScreen";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./config/theme";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Grid container>
        <Grid item xs={12}>
          <Router>
            <CssBaseline />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/signup" element={<RegisterScreen />} />
            </Routes>
            <Routes>
              <Route path="/home" element={<HomeScreen />} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
