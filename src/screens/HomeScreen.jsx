import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import * as Yup from "yup";
import Form from "../components/form/Form";
import InputComponent from "../components/form/InputComponent";
import NavBar from "../components/NavBar";
import { CompareArrows } from "@mui/icons-material";
import CustomSelectComponent from "../components/form/CustomSelectComponent";
import { departureTimes, destinations } from "../config/data";
import CustomTimePicker from "../components/form/CustomTimePicker";
import CustomDatePicker from "../components/form/CustomDatePicker";
import SubmitButton from "../components/form/SubmitComponent";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { detailsSave } from "../actions/busActions";

const validationSchema = Yup.object().shape({
  origin: Yup.string().required("Origin is required"),
  destination: Yup.string().required("Destination is required"),
  departureDate: Yup.string().required("Departure Date is required"),
  departureTime: Yup.string().required("Departure Time is required"),
});
const HomeScreen = () => {
  const [st, setSt] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = ({
    origin,
    destination,
    departureDate,
    departureTime,
  }) => {
    if (origin === destination) {
      toast("Destination and origin must be different!", {
        type: "error",
      });
      return;
    }
    dispatch(
      detailsSave({
        origin,
        destination,
        departureDate,
        departureTime,
      })
    );

    navigate("/buses/booking");
  };
  const today = moment().format("MM/DD/YYYY");
  // time

  return (
    <>
      <NavBar />
      <Box
        sx={{
          p: {
            md: 10,
            xs: 5,
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
              departureDate: today,
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
              <CustomSelectComponent name={`departureTime`} item={departureTimes} />
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
