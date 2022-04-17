import axios from "axios";
import { url } from "../config/url";
import { logout } from "./userActions";
import {
  BUS_DEPARTURE_ALL_FAIL,
  BUS_DEPARTURE_ALL_REQUEST,
  BUS_DEPARTURE_ALL_SUCCESS,
  BUS_DEPARTURE_CREATE_FAIL,
  BUS_DEPARTURE_CREATE_REQUEST,
  BUS_DEPARTURE_CREATE_SUCCESS,
  BUS_DEPARTURE_DELETE_FAIL,
  BUS_DEPARTURE_DELETE_REQUEST,
  BUS_DEPARTURE_DELETE_SUCCESS,
  BUS_DEPARTURE_LIST_FAIL,
  BUS_DEPARTURE_LIST_REQUEST,
  BUS_DEPARTURE_LIST_SUCCESS,
  BUS_DEPARTURE_UPDATE_FAIL,
  BUS_DEPARTURE_UPDATE_REQUEST,
  BUS_DEPARTURE_UPDATE_SUCCESS,
} from "../constants/busDepartureConstants";

export const createBusDeparture = (bus) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUS_DEPARTURE_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/departures`, bus, config);
    dispatch({
      type: BUS_DEPARTURE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUS_DEPARTURE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBusesDepatures =
  ({ departureDate, departureTime, origin }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BUS_DEPARTURE_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${url}/departures?departureDate=${departureDate}&departureTime=${departureTime}&origin=${origin}`,
        config
      );

      dispatch({
        type: BUS_DEPARTURE_LIST_SUCCESS,
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
        type: BUS_DEPARTURE_LIST_FAIL,
        payload: message,
      });
    }
  };

export const updateBusDeparture = (bus) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUS_DEPARTURE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/departures/${bus._id}`,
      bus,
      config
    );
    dispatch({
      type: BUS_DEPARTURE_UPDATE_SUCCESS,
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
      type: BUS_DEPARTURE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBusDeparture = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_DEPARTURE_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${url}/departures/${id}`, config);
    dispatch({
      type: BUS_DEPARTURE_DELETE_SUCCESS,
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
      type: BUS_DEPARTURE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const listAllBusDepartures =
  () =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BUS_DEPARTURE_ALL_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${url}/departures/all`,
        config
      );

      dispatch({
        type: BUS_DEPARTURE_ALL_SUCCESS,
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
        type: BUS_DEPARTURE_ALL_FAIL,
        payload: message,
      });
    }
  };
