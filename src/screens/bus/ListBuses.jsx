import * as React from "react";
import {
  Avatar,
  Backdrop,
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
            <Link href={`/buses/${params.row._id}`}>
              <ModeEditOutlineOutlined
                style={{
                  color: palette.primary.main,
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
            </Link>
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
  const { loading, error, busses } = busList;

  React.useEffect(() => {
    dispatch(listBuses());
  }, []);

  return (
    <>
        <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {loading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}

          {error && (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          )}

          {busses && (
            <DataGridComponent
              buttonTitle={"Add Bus"}
              onClick={() => navigate("/createBus")}
              title={"Bus List"}
              columns={columns}
              rows={busses}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
