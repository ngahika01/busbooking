import {
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import { io } from "socket.io-client";
import {
  createPayment,
  getPayment,
  updatePayment,
  updateToPiad,
} from "../../actions/paymentActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const socket = io("http://localhost:5000");

const PaymentsScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [ld, setLd] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);
  const [py, setPy] = React.useState(null);

  socket.on("querying", (data) => {
    setLd(true);
    setId(data.CheckoutRequestID);
    setDisabled(true);
  });

  socket.on("queried", (data) => {
    {
      setLd(false);
      setFeedback(data);
    }
  });
  socket.on("payment", (data) => {
    setPy(data);
  });

  const paymentUpdateToPaid = useSelector((state) => state.paymentUpdateToPaid);
  const { loading, success } = paymentUpdateToPaid;

  const bookingSave = useSelector((state) => state.bookingSave);
  const { booking: bk } = bookingSave;
  const dispatch = useDispatch();

  const paymentGet = useSelector((state) => state.paymentGet);
  const { payment: p } = paymentGet;

  const navigate = useNavigate();
  React.useEffect(() => {
    if (feedback === "Request cancelled by user") {
      setFeedback(null);
      toast.error("Request cancelled by user");
      navigate("/home", {
        replace: true,
      });
    } else if (feedback === "The service request is processed successfully.") {
      dispatch(updateToPiad(id));
      dispatch(getPayment(id));
      setFeedback(null);
    }
  }, [feedback, navigate, dispatch, id]);

  console.table(py);

  console.table(feedback);
  const handlePay = (e) => {
    e.preventDefault();
    dispatch(
      createPayment({
        booking: bk._id,
      })
    );
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: {
            xs: 5,
            md: 10,
          },
        }}
      >
        {ld && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h4"
        >
          Payment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <img
                src="https://hapakenya.com/wp-content/uploads/2019/06/lipa-na-mpesa-paybill-770x416.jpg"
                style={{
                  width: 300,
                  height: 300,
                  objectFit: "contain",
                }}
              />
              <Typography variant="h6" component="h2">
                Amount: {bk.price}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={(e) => handlePay(e)}
            >
              Pay via mpesa
            </Button>
          </Grid>
          <Grid item xs={12}>
            {p && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Booking Date</TableCell>
                      <TableCell>Booking Time</TableCell>
                      <TableCell>Bus</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Cancelled</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <TableCell>{p.user && p.user.name}</TableCell>
                      <TableCell>
                        {p.booking &&
                          moment(p.booking.departureDate).format(
                            "MMMM Do YYYY"
                          )}
                      </TableCell>
                      <TableCell>
                        {p.booking &&
                          moment(p.booking.departureTime).format("h:mm a")}
                      </TableCell>
                      <TableCell>{p.booking && p.booking.bus}</TableCell>
                      <TableCell>
                        {p.paid ? (
                          <Badge color="primary">Paid via mpesa</Badge>
                        ) : (
                          <Badge color="secondary">Not paid</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {p.cancelled ? (
                          <Badge color="secondary">Cancelled</Badge>
                        ) : (
                          <Badge color="primary">Not cancelled</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentsScreen;
