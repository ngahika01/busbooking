import axios from "axios";
import { url } from "../config/url";
import { logout } from "./userActions";
import {
  BOOKING_ALL_FAIL,
  BOOKING_ALL_REQUEST,
  BOOKING_ALL_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_GET_FAIL,
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  SAVE_BOOKING,
  SAVE_DETAILS,
} from "../constants/bookingConstants";

export const createBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/bookings`, booking, config);
    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/bookings`, config);

    dispatch({
      type: BOOKING_LIST_SUCCESS,
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
      type: BOOKING_LIST_FAIL,
      payload: message,
    });
  }
};

export const getBooking = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/bookings/${id}`, config);

    dispatch({
      type: BOOKING_GET_SUCCESS,
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
      type: BOOKING_GET_FAIL,
      payload: message,
    });
  }
};

export const updateBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/bookings/${booking._id}`,
      booking,
      config
    );
    dispatch({
      type: BOOKING_UPDATE_SUCCESS,
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
      type: BOOKING_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBooking = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${url}/bookings/${id}`, config);
    dispatch({
      type: BOOKING_DELETE_SUCCESS,
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
      type: BOOKING_DELETE_FAIL,
      payload: message,
    });
  }
};

export const saveBooking = (booking) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_BOOKING,
    payload: booking,
  });
};

export const listAllBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_ALL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/bookings/all`, config);

    dispatch({
      type: BOOKING_ALL_SUCCESS,
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
      type: BOOKING_ALL_FAIL,
      payload: message,
    });
  }
};
