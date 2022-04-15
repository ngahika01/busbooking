import * as React from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, ModeEditOutlineOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import { deleteBus, listBuses } from "../../actions/busActions";
import DataGridComponent from "../../components/DataGridComponent";
import NavBar from "../../components/NavBar";
import moment from "moment";
import { deleteBooking, listBookings } from "../../actions/bookingActions";

export default function MyBookings() {
  const { palette } = useTheme();
  const columns = [
    {
      field: "_id",
      width: 200,
      headerName: "ID",
      renderCell: (params) => {
        return <> {params.row._id} </>;
      },
    },
    {
      field: "origin",
      width: 200,
      headerName: "ORIGIN",
      renderCell: (params) => {
        return <> {params.row.origin} </>;
      },
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.destination} </>;
      },
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.destination} </>;
      },
    },
    {
      field: "departureDate",
      headerName: "DEPARTURE DATE",
      width: 150,
      renderCell: (params) => {
        return <> {moment(params.row.departureDate).format("MM-DD-YYYY")} </>;
      },
    },
    {
      field: "departureTime",
      headerName: "Departure Time",
      width: 150,
      renderCell: (params) => {
        return <> {moment(params.row.departureTime).format("h:mm a")} </>;
      },
    },
    {
      field: "bus",
      headerName: "Bus",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.bus && params.row.bus.name} </>;
      },
    },

    {
      field: "paid",
      headerName: "Paid",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {" "}
            {params.row.paid ? (
              <Typography
                sx={{
                  color: palette.secondary.main,
                }}
              >
                Paid
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: palette.primary.main,
                }}
              >
                Not Paid
              </Typography>
            )}{" "}
          </>
        );
      },
    },
    {
      field: "cancelled",
      headerName: "Cancelled",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {" "}
            {params.row.cancelled ? (
              <Typography
                sx={{
                  color: palette.secondary.main,
                }}
              >
                Cancelled
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: palette.primary.main,
                }}
              >
                Not Cancelled
              </Typography>
            )}{" "}
          </>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {/* <Link href={`/buses/${params.row._id}`}>
              <ModeEditOutlineOutlined
                style={{
                  color: palette.primary.main,
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
            </Link> */}
            <DeleteOutline
              className="delIcon"
              sx={{
                cursor: "pointer",
                color: palette.error.main,
              }}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the Booking?")) {
      dispatch(deleteBooking(id));
    }
  };

  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;

  const bookingDelete = useSelector((state) => state.bookingDelete);
  const { loading: loadingDel, error: errrDelete, success } = bookingDelete;

  React.useEffect(() => {
    dispatch(listBookings());
  }, [dispatch]);

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
          variant="h4"
          component="div"
          style={{ textAlign: "center" }}
        >
          My Bookings List
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <div
              style={{
                height: "70vh",
                width: "100%",
              }}
            >
              {loading ||
                (loadingDel && (
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
              {bookings && (
                <DataGridComponent
                  onClick={() => navigate("/home")}
                  title="Booking List"
                  buttonTitle={`Create New Booking`}
                  rows={bookings}
                  columns={columns}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
