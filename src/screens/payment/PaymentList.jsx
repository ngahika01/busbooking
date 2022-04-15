import { useTheme } from "@emotion/react";
import Pdf from "react-to-pdf";

import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getPayment } from "../../actions/paymentActions";
import NavBar from "../../components/NavBar";
import { getBus } from "../../actions/busActions";
import { Download } from "@mui/icons-material";

const PaymentList = () => {
  const { state } = useLocation();
  const ref = React.createRef();

  const paymentGet = useSelector((state) => state.paymentGet);
  const { payment, loading } = paymentGet;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const busGet = useSelector((state) => state.busGet);
  const { bus } = busGet;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getPayment(state.id));
  }, [userInfo, navigate, dispatch, state.id]);

  const { palette } = useTheme();

  const options = {
    orientation: "landscape",
    unit: "in",
    format: [6, 8],
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
        {loading && (
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
          Payment Recept
        </Typography>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                ref={ref}
                sx={{
                  bgcolor: palette.primary.main,
                  color: "white",
                  p: 2,
                  mb: 2,
                  textAlign: "center",
                  md: {
                    width: "50%",
                  },
                  xs: {
                    width: "88%",
                  },
                }}
              >
                <Typography variant="h5" component={"div"}>
                  Payment Receipt for Booking ID: {state.id}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "justify",
                  }}
                >
                  <Divider />
                  <Typography variant="h6" component={"div"}>
                    Name: {userInfo && userInfo.name}
                  </Typography>
                  <Typography variant="h6" component={"div"}>
                    Amount: {payment && payment.amount}
                  </Typography>
                  <Typography variant="h6" component={"div"}>
                    Departure Date:{" "}
                    {payment &&
                      moment(payment.departureDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography variant="h6" component={"div"}>
                    Departure Time :{" "}
                    {payment && moment(payment.departureTime).format("hh:mm a")}
                  </Typography>
                  <Typography variant="h6" component={"div"}>
                    Amount: {payment && payment.amount}
                  </Typography>
                  <Typography variant="h6" component={"div"}>
                    Bus:{" "}
                    {payment &&
                      payment.booking &&
                      (() => dispatch(getBus(payment.booking.bus))) && (
                        <>{bus && bus.name}</>
                      )}
                  </Typography>
                  <Typography variant="h6" component={"div"}>
                    Seat Number :{" "}
                    {payment && payment.booking.seatBooked[0].seatNumber}
                  </Typography>
                  <>
                    Payment Status :{" "}
                    {payment && payment.paid ? (
                      <span
                        style={{
                          color: palette.success.main,
                        }}
                        component={"div"}
                      >
                        Paid via Mpesa
                      </span>
                    ) : (
                      <span
                        style={{
                          color: palette.secondary.main,
                        }}
                      >
                        Not Paid
                      </span>
                    )}
                  </>
                </Typography>
                <Divider />
                <footer>
                  <Typography variant="body2" component={"subtitle"}>
                    Powered by bus booking system.
                  </Typography>
                  <Typography variant="body2" component={"subtitle"}>
                    This is a system generated receipt. Generated on{" "}
                    {moment().format("MM-DD-YYYY:hh:mm:ss a")}
                  </Typography>
                </footer>
              </Card>
              <Pdf targetRef={ref} options={options}  filename={`${payment?._id}.pdf`}>
                {({ toPdf }) => (
                  <IconButton
                    color="primary"
                    variant="contained"
                    onClick={toPdf}
                  >
                    <Download />
                    Print
                  </IconButton>
                )}
              </Pdf>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PaymentList;
