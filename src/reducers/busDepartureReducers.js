import {
  BUS_DEPARTURE_CREATE_FAIL,
  BUS_DEPARTURE_CREATE_REQUEST,
  BUS_DEPARTURE_CREATE_RESET,
  BUS_DEPARTURE_CREATE_SUCCESS,
  BUS_DEPARTURE_DELETE_REQUEST,
  BUS_DEPARTURE_GET_FAIL,
  BUS_DEPARTURE_GET_REQUEST,
  BUS_DEPARTURE_GET_SUCCESS,
  BUS_DEPARTURE_LIST_FAIL,
  BUS_DEPARTURE_LIST_REQUEST,
  BUS_DEPARTURE_LIST_SUCCESS,
  BUS_DEPARTURE_UPDATE_FAIL,
  BUS_DEPARTURE_UPDATE_REQUEST,
  BUS_DEPARTURE_UPDATE_RESET,
  BUS_DEPARTURE_UPDATE_SUCCESS,
  BUS_DEPARTURE_DELETE_SUCCESS,
  BUS_DEPARTURE_DELETE_FAIL,
  BUS_DEPARTURE_DELETE_RESET,
  BUS_DEPARTURE_ALL_REQUEST,
  BUS_DEPARTURE_ALL_SUCCESS,
  BUS_DEPARTURE_ALL_FAIL,
} from "../constants/busDepartureConstants";

export const busDepartureCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DEPARTURE_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BUS_DEPARTURE_CREATE_SUCCESS:
      return {
        loading: false,
        bus: action.payload,
        success: true,
      };
    case BUS_DEPARTURE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BUS_DEPARTURE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const busDepartureListReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DEPARTURE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BUS_DEPARTURE_LIST_SUCCESS:
      return {
        loading: false,
        buses: action.payload,
        success: true,
      };
    case BUS_DEPARTURE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const busDepartureGetReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DEPARTURE_GET_REQUEST:
      return { loading: true, ...state };
    case BUS_DEPARTURE_GET_SUCCESS:
      return { loading: false, bus: action.payload, success: true };
    case BUS_DEPARTURE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const busDepartureUpdateReducer = (state = { BUS: {} }, action) => {
  switch (action.type) {
    case BUS_DEPARTURE_UPDATE_REQUEST:
      return { loading: true };
    case BUS_DEPARTURE_UPDATE_SUCCESS:
      return { loading: false, success: true, bus: action.payload };
    case BUS_DEPARTURE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BUS_DEPARTURE_UPDATE_RESET:
      return { BUS: {} };
    default:
      return state;
  }
};

export const busDepartureDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DEPARTURE_DELETE_REQUEST:
      return { loading: true };
    case BUS_DEPARTURE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BUS_DEPARTURE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
    case BUS_DEPARTURE_DELETE_RESET:
      return {};
  }
};

export const busDepartureAllReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DEPARTURE_ALL_REQUEST:
      return { loading: true };
    case BUS_DEPARTURE_ALL_SUCCESS:
      return { loading: false, success: true, buses: action.payload };
    case BUS_DEPARTURE_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
