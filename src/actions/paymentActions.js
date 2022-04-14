import axios from "axios";
import { url } from "../config/url";
import { logout } from "./userActions";
import {
  PAYMENT_CREATE_FAIL,
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_DELETE_FAIL,
  PAYMENT_DELETE_REQUEST,
  PAYMENT_DELETE_SUCCESS,
  PAYMENT_GET_FAIL,
  PAYMENT_GET_REQUEST,
  PAYMENT_GET_SUCCESS,
  PAYMENT_LIST_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_UPDATE_FAIL,
  PAYMENT_UPDATE_REQUEST,
  PAYMENT_UPDATE_SUCCESS,
  PAYMENT_UPDATE_TO_CANCELLED_FAIL,
  PAYMENT_UPDATE_TO_CANCELLED_REQUEST,
  PAYMENT_UPDATE_TO_CANCELLED_SUCCESS,
  PAYMENT_UPDATE_TO_PAID_REQUEST,
  PAYMENT_UPDATE_TO_PAID_SUCCESS,
} from "../constants/paymentConstants";

export const createPayment = (booking) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/payments`, booking, config);
    dispatch({
      type: PAYMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listpayments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/payments`, config);

    dispatch({
      type: PAYMENT_LIST_SUCCESS,
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
      type: PAYMENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const getPayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/payments/${id}`, config);

    dispatch({
      type: PAYMENT_GET_SUCCESS,
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
      type: PAYMENT_GET_FAIL,
      payload: message,
    });
  }
};

export const updatePayment = (payment) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/payments/${payment._id}`,
      payment,
      config
    );
    dispatch({
      type: PAYMENT_UPDATE_SUCCESS,
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
      type: PAYMENT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deletePayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${url}/payments/${id}`, config);
    dispatch({
      type: PAYMENT_DELETE_SUCCESS,
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
      type: PAYMENT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateToPiad = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_UPDATE_TO_PAID_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/payments/updateToPaid/${id}`,
      {},
      config
    );
    dispatch({
      type: PAYMENT_UPDATE_TO_PAID_SUCCESS,
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
      type: PAYMENT_UPDATE_TO_CANCELLED_FAIL,
      payload: message,
    });
  }
}

export const updateToCancelled = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_UPDATE_TO_CANCELLED_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/payments/updateToCancelled/${id}`,
      {},
      config
    );
    dispatch({
      type: PAYMENT_UPDATE_TO_CANCELLED_SUCCESS,
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
      type: PAYMENT_UPDATE_TO_CANCELLED_FAIL,
      payload: message,
    });
  }
}
