import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import Form from "../components/form/Form";
import InputComponent from "../components/form/InputComponent";
import NavBar from "../components/NavBar";
import { CompareArrows } from "@mui/icons-material";
import { CustomSelectComponent } from "../components/form/CustomSelectComponent";
import { destinations } from "../config/data";
import CustomTimePicker from "../components/form/CustomTimePicker";
import CustomDatePicker from "../components/form/CustomDatePicker";
import SubmitButton from "../components/form/SubmitComponent";

const validationSchema = Yup.object().shape({
  origin: Yup.string().required("Origin is required"),
  destination: Yup.string().required("Destination is required"),
  departureDate: Yup.string().required("Departure Date is required"),
  departureTime: Yup.string().required("Departure Time is required"),
  seatBooked: Yup.array().required("Seat Booked is required"),
  price: Yup.string().required("Price is required"),
  bus: Yup.string().required("Bus is required"),
});
const HomeScreen = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          p: {
            md: 10,
          },
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            mt: 10,
          }}
          variant="h4"
          component={"div"}
        >
          Welcome to Bus Booking System
        </Typography>
        <Grid container spacing={3}>
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              origin: "",
              destination: "",
              departureDate: "",
              departureTime: "",
              price: 1500,
            }}
          >
            <Grid item xs={12}>
              <CustomSelectComponent name={`origin`} item={destinations} />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <CompareArrows
                  sx={{
                    color: "primary",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: 40,
                    transform: "rotate(90deg)",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <CustomSelectComponent name={`destination`} item={destinations} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDatePicker label={"departureDate"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTimePicker label={"departureTime"} />
            </Grid>
            <Grid item xs={12}>
              <InputComponent label="price" disabled />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton title={"Continue"} />
            </Grid>
          </Form>
        </Grid>
      </Box>
    </>
  );
};

export default HomeScreen;
