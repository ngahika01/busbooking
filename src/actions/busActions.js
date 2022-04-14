import axios from "axios";
import { url } from "../config/url";
import { logout } from "./userActions";
import {
  BUS_CREATE_FAIL,
  BUS_CREATE_REQUEST,
  BUS_CREATE_SUCCESS,
  BUS_DELETE_FAIL,
  BUS_DELETE_REQUEST,
  BUS_DELETE_SUCCESS,
  BUS_GET_FAIL,
  BUS_GET_REQUEST,
  BUS_GET_SUCCESS,
  BUS_LIST_FAIL,
  BUS_LIST_REQUEST,
  BUS_LIST_SUCCESS,
  BUS_UPDATE_FAIL,
  BUS_UPDATE_REQUEST,
  BUS_UPDATE_SUCCESS,
  SAVE_DETAILS,
  UPDATE_SEAT_TO_BOOKED_FAIL,
  UPDATE_SEAT_TO_BOOKED_REQUEST,
  UPDATE_SEAT_TO_BOOKED_SUCCESS,
} from "../constants/busConstants";

export const createBus = (bus) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUS_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/buses`, bus, config);
    dispatch({
      type: BUS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBuses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/buses`, config);

    dispatch({
      type: BUS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    console.log(message);

    dispatch({
      type: BUS_LIST_FAIL,
      payload: message,
    });
  }
};

export const getBus = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/buses/${id}`, config);

    dispatch({
      type: BUS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    console.log(message);

    dispatch({
      type: BUS_GET_FAIL,
      payload: message,
    });
  }
};

export const updateBus = (bus) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUS_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`${url}/buses/${bus._id}`, bus, config);
    dispatch({
      type: BUS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BUS_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBus = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${url}/buses/${id}`, config);
    dispatch({
      type: BUS_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BUS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const detailsSave = (details) => async (dispatch) => {
  dispatch({
    type: SAVE_DETAILS,
    payload: details,
  });
};

export const updateSeatToPaid =
  (id, seatNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_SEAT_TO_BOOKED_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`${url}/buses/${id}`, seatNumber, config);
      dispatch({
        type: UPDATE_SEAT_TO_BOOKED_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: UPDATE_SEAT_TO_BOOKED_FAIL,
        payload: message,
      });
    }
  };
