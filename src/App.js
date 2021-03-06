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
import ListBuses from "./screens/bus/ListBuses";
import CreateBus from "./screens/bus/CreateBus";
import EditBus from "./screens/bus/EditBus";
import SelectBus from "./screens/bus/SelectBus";
import PaymentsScreen from "./screens/payment/PaymentsScreen";
import MyBookings from "./screens/bookings/MyBookings";
import BookingsScreen from "./screens/bookings/BookingsScreen";
import AboutScreen from "./screens/AboutScreen";
import PaymentList from "./screens/payment/PaymentList";
import DepartureList from "./screens/depart/DepartureList";
import CreateDeparture from "./screens/depart/CreateDeparture";

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
              <Route path="/buses" element={<ListBuses />} />
              <Route path="/createBus" element={<CreateBus />} />
              <Route path="/buses/departures" element={<DepartureList />} />
              <Route path="/createDeparture" element={<CreateDeparture />} />
              <Route path="/buses/booking" element={<SelectBus />} />
              <Route path="/booking/pay" element={<PaymentsScreen />} />
              <Route path="/mybookings" element={<MyBookings />} />
              <Route path="/bookings" element={<BookingsScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/reciept" element={<PaymentList />} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
