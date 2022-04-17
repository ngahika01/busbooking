import React from "react";
import { useTheme } from "@emotion/react";
import {
  Alert,
  AppBar,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BUS_CREATE_RESET } from "../../constants/busConstants";
import CustomSelectComponent from "../../components/form/CustomSelectComponent";
import SubmitButton from "../../components/form/SubmitComponent";
import Form from "../../components/form/Form";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import { createBus, listBuses } from "../../actions/busActions";
import { departureTimes, destinations } from "../../config/data";
import InputComponent from "../../components/form/InputComponent";
import { createBusDeparture } from "../../actions/busDepartureActions";
import CustomDatePicker from "../../components/form/CustomDatePicker";
import { BUS_DEPARTURE_CREATE_RESET } from "../../constants/busDepartureConstants";

const validationSchema = Yup.object().shape({
  bus: Yup.string().required("Bus is required"),

  departureDate: Yup.string().required("Departure date is required"),
  departureTime: Yup.string().required("Departure time is required"),
  price: Yup.number().required("Price is required"),
  origin: Yup.string().required("Origin is required"),
});

const CreateDeparture = () => {
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const navigate = useNavigate();

  const busDepartureCreate = useSelector((state) => state.busDepartureCreate);
  const { loading, error, success } = busDepartureCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const busList = useSelector((state) => state.busList);
  const { buses, loading: busLoad } = busList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    }
    if (success) {
      dispatch({ type: BUS_DEPARTURE_CREATE_RESET });
      navigate("/buses/departures");
      toast("Bus departure created successfully", {
        type: "success",
      });
    }
    dispatch(listBuses());
  }, [userInfo, dispatch, navigate, success]);

  const handleSubmit = async ({
    bus,
    departureDate,
    departureTime,
    price,
    origin,
  }) => {
    dispatch(
      createBusDeparture({
        bus,
        departureDate,
        departureTime,
        price,
        origin,
      })
    );
  };

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
        {error && <Alert severity="error">{error}</Alert>}

        <Typography
          style={{
            textAlign: "center",
            mt: 10,
          }}
          variant="h4"
          component={"div"}
        >
          {loading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          Create Bus Departure
        </Typography>
        <Grid container spacing={3}>
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              bus: "",
              departureDate: "",
              departureTime: "",
              price: "",
              origin: "",
            }}
          >
            <Grid item xs={12} md={6}>
              <CustomSelectComponent name={`origin`} item={destinations} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectComponent
                name={`departureTime`}
                item={departureTimes}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectComponent name={`bus`} item={buses} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputComponent label="price" type={"number"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDatePicker label={"departureDate"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <SubmitButton title={"Save Bus"} />
            </Grid>
          </Form>
        </Grid>
      </Box>
    </>
  );
};
export default CreateDeparture;
