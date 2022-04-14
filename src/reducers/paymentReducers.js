import {
  PAYMENT_CREATE_FAIL,
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_RESET,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_DELETE_REQUEST,
  PAYMENT_GET_FAIL,
  PAYMENT_GET_REQUEST,
  PAYMENT_GET_SUCCESS,
  PAYMENT_LIST_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_UPDATE_FAIL,
  PAYMENT_UPDATE_REQUEST,
  PAYMENT_UPDATE_RESET,
  PAYMENT_UPDATE_SUCCESS,
  PAYMENT_DELETE_SUCCESS,
  PAYMENT_DELETE_FAIL,
  PAYMENT_DELETE_RESET,
} from "../constants/paymentConstants";

export const paymentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_CREATE_SUCCESS:
      return {
        loading: false,
        bus: action.payload,
        success: true,
      };
    case PAYMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAYMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const paymentListReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_LIST_SUCCESS:
      return {
        loading: false,
        buses: action.payload,
        success: true,
      };
    case PAYMENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentGetReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_GET_REQUEST:
      return { loading: true, ...state };
    case PAYMENT_GET_SUCCESS:
      return { loading: false, bus: action.payload, success: true };
    case PAYMENT_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const paymentUpdateReducer = (state = { BUS: {} }, action) => {
  switch (action.type) {
    case PAYMENT_UPDATE_REQUEST:
      return { loading: true };
    case PAYMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, bus: action.payload };
    case PAYMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_UPDATE_RESET:
      return { BUS: {} };
    default:
      return state;
  }
};

export const paymentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_DELETE_REQUEST:
      return { loading: true };
    case PAYMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PAYMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
    case PAYMENT_DELETE_RESET:
      return {};
  }
};
