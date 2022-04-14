import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSelectComponent from "../../components/form/CustomSelectComponent";
import Form from "../../components/form/Form";
import NavBar from "../../components/NavBar";
import * as Yup from "yup";
import {
  getBus,
  listBuses,
  updateSeatToBooked,
} from "../../actions/busActions";
import { useFormikContext } from "formik";
import { useTheme } from "@emotion/react";
import moment from "moment";
import { createBooking, saveBooking } from "../../actions/bookingActions";
import { toast } from "react-toastify";
import { BOOKING_CREATE_RESET } from "../../constants/bookingConstants";

const validationSchema = Yup.object().shape({
  bus: Yup.string().required("Bus is required"),
});

const SelectBus = () => {
  const [selected, setSelected] = React.useState("");

  const [seat, setSeat] = React.useState([]);

  console.log([seat], "ff");

  console.log(selected);
  const [id, setId] = React.useState("");

  const busList = useSelector((state) => state.busList);
  const { buses, loading, error } = busList;

  const busGet = useSelector((state) => state.busGet);
  const { bus } = busGet;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const bookingCreate = useSelector((state) => state.bookingCreate);
  const {
    booking,
    loading: loadingCreate,
    error: errorCreate,
    success,
  } = bookingCreate;
  const seatToBooked = useSelector((state) => state.seatToBooked);
  const { loading: loadingUpdate, error: errorUpdate, bus: b } = seatToBooked;

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/", {
        replace: true,
      });
    }
    dispatch(listBuses());
    if (id !== "") {
      dispatch(getBus(id));
    }
    if (success) {
      dispatch(saveBooking(booking));
      toast.success("Booking created successfully");
      dispatch({
        type: BOOKING_CREATE_RESET,
      });
      navigate("/booking/pay", {
        replace: true,
      });
    }
  }, [userInfo, navigate, id, success, seat, dispatch, booking]);

  const handleSubmit = (values) => {};
  const { palette } = useTheme();

  const saveDetails = useSelector((state) => state.saveDetails);
  const { details } = saveDetails;

  const handleBooking = () => {
    dispatch(
      updateSeatToBooked(bus._id, {
        seatNumber: seat,
      })
    );
    // dispatch(saveBooking(
    //   {

    //   }
    // ))

    dispatch(
      createBooking({
        origin: details.origin,
        destination: details.destination,
        departureDate: details.departureDate,
        departureTime: details.departureTime,
        seatBooked: [
          {
            seatNumber: seat,
          },
        ],
        price: 1500,
        bus: bus._id,
      })
    );
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          p: {
            md: 5,

            xs: 5,
          },
        }}
      >
        <Typography
          style={{
            textAlign: "center",
          }}
          variant="h4"
          component={"div"}
        >
          Select Bus
        </Typography>
        <br />
        <Grid container spacing={3}>
          {loading ||
            (loadingCreate && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ))}
          {error ||
            (errorCreate && (
              <Alert severity="error" color="error">
                {error || errorCreate}{" "}
              </Alert>
            ))}
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              bus: "",
            }}
          >
            {buses && (
              <>
                <FormControl sx={{ mt: 2, mb: 2 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    SelectBus
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={id}
                    label={"bus"}
                    onChange={(e) => setId(e.target.value)}
                    className="form-note-control-selection"
                  >
                    {buses &&
                      buses.map((itm) => (
                        <MenuItem selected value={itm._id}>
                          {itm.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </>
            )}
          </Form>
          {/* maps all the seats and make them clickable to booking */}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div
              style={{
                display: "flex",

                maxWidth: 200,
                flexWrap: "wrap",
              }}
            >
              {bus &&
                bus.seats &&
                bus.seats.map((seat) => (
                  <>
                    {/* split into tow rows */}

                    <Button
                      onClick={() => {
                        setSeat(seat.seatNumber);
                        // set selected seat
                        setSelected(seat.seatNumber);
                      }}
                      variant="contained"
                      disabled={!seat.available}
                      disableElevation={true}
                      color={
                        selected === seat.seatNumber ? "primary" : "secondary"
                      }
                      sx={{
                        borderRadius: 0,
                        mr: 2,
                        mb: 2,
                      }}
                      key={seat._id}
                    >
                      <Typography> {seat.seatNumber}</Typography>
                    </Button>
                  </>
                ))}
            </div>
            <Box>
              <Typography>
                Total Seats : {bus && bus.seats && bus.seats.length}
                {seat && (
                  <>
                    <Typography
                      sx={{
                        color: palette.primary.main,
                      }}
                    >
                      Selected Seat : {seat || "No Seat"}
                    </Typography>
                  </>
                )}
              </Typography>
              <Typography>
                {/* key guide for colors */}
                <Button variant="contained" color="primary">
                  {" "}
                  Booked{" "}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    ml: 2,
                  }}
                >
                  {" "}
                  Not booked{" "}
                </Button>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component={"div"}>
              Details
            </Typography>
            <Typography variant="h6" component={"div"}>
              Name: {userInfo && userInfo.name}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Email: {userInfo && userInfo.email}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Phone: 0{userInfo && userInfo.phoneNumber}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Origin: {details && details.origin}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Price: {1500}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Destination: {details && details.destination}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Departure Date :{" "}
              {details && moment(details.departureDate).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Departure time :{" "}
              {details && moment(details.departureTime).format("hh:mm a")}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Seat Number : {selected ? selected : "No Seat Selected"}
            </Typography>
            <Typography variant="h6" component={"div"}>
              Bus : {bus ? bus.name : "No Bus Selected"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
              }}
              type="submit"
              disabled={selected === ""}
              onClick={handleBooking}
            >
              Place booking
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SelectBus;
