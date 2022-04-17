import * as React from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutline,
  FastRewind,
  ModeEditOutlineOutlined,
  Redo,
  ResetTv,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import { deleteBus, listBuses, resetBus } from "../../actions/busActions";
import DataGridComponent from "../../components/DataGridComponent";
import NavBar from "../../components/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import { deleteBusDeparture, listAllBusDepartures } from "../../actions/busDepartureActions";
import moment from "moment";

export default function DepartureList() {
  const { palette } = useTheme();
  const busReset = useSelector((state) => state.busReset);
  const { loading: resload, success } = busReset;

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
      field: "bus",
      width: 200,
      headerName: "Bus",
      renderCell: (params) => {
        return <> {params.row.bus && params.row.bus.name} </>;
      },
    },
    {
      field: "departureTime",
      headerName: "Departure Time",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.departureTime} </>;
      },
    },
    {
      field: "departureDate",
      headerName: "Departure Date",
      width: 150,
      renderCell: (params) => {
        return <> {moment(params.row.departureDate).format("MM-DD-YYYY")} </>;
      },
    },
    {
      field: "origin",
      headerName: "Origin",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.origin} </>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.price} </>;
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
            <IconButton onClick={() => handleDelete(params.row._id)}>
              <DeleteOutline
                className="delIcon"
                sx={{
                  cursor: "pointer",
                  color: palette.error.main,
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(listAllBusDepartures());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      dispatch(deleteBusDeparture(id));
    }
  };

  const busDepartureAll = useSelector((state) => state.busDepartureAll);
  const { loading, error, buses } = busDepartureAll;


  const handleReset = (id) => {
    if (window.confirm("Are you sure you want to reset the Bus?")) {
      dispatch(resetBus(id));
    }
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
          variant="h4"
          component="div"
          style={{ textAlign: "center" }}
        >
          Bus Departures List
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <div
              style={{
                height: "70vh",
                width: "100%",
              }}
            >
              {loading && (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
              {buses && (
                <DataGridComponent
                  onClick={() => navigate("/createDeparture")}
                  title="Bus Departure List"
                  buttonTitle={`Create New Bus Departure`}
                  rows={buses}
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
