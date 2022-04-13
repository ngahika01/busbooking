import * as React from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
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
import { DataGrid } from "@mui/x-data-grid";

export default function ListBuses() {
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
      field: "name",
      width: 200,
      headerName: "NAME",
      renderCell: (params) => {
        return <> {params.row.name} </>;
      },
    },
    {
      field: "numberPlate",
      headerName: "Number Plate",
      width: 150,
      renderCell: (params) => {
        return <> {params.row.numberPlate} </>;
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
    if (window.confirm("Are you sure you want to delete the Product?")) {
      dispatch(deleteBus(id));
    }
  };

  const busList = useSelector((state) => state.busList);
  const { loading, error, buses } = busList;

  React.useEffect(() => {
    dispatch(listBuses());
  }, []);

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
          Bus List
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
                  onClick={() => navigate("/createBus")}
                  title="Bus List"
                  buttonTitle={`Create New Bus`}
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
