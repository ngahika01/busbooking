import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_RESET,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DELETE_REQUEST,
  BOOKING_GET_FAIL,
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_RESET,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DELETE_RESET,
  SAVE_BOOKING,
} from "../constants/bookingConstants";

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
        success: true,
      };
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOKING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingListReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_LIST_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
        success: true,
      };
    case BOOKING_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const bookingGetReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_GET_REQUEST:
      return { loading: true, ...state };
    case BOOKING_GET_SUCCESS:
      return { loading: false, booking: action.payload, success: true };
    case BOOKING_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingUpdateReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_UPDATE_REQUEST:
      return { loading: true };
    case BOOKING_UPDATE_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOKING_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_DELETE_REQUEST:
      return { loading: true };
    case BOOKING_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOKING_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
    case BOOKING_DELETE_RESET:
      return {};
  }
};

export const bookingSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_BOOKING:
      return { ...state, booking: action.payload };
    default:
      return state;
  }
};
