import {
  BUS_CREATE_FAIL,
  BUS_CREATE_REQUEST,
  BUS_CREATE_RESET,
  BUS_CREATE_SUCCESS,
  BUS_DELETE_REQUEST,
  BUS_GET_FAIL,
  BUS_GET_REQUEST,
  BUS_GET_SUCCESS,
  BUS_LIST_FAIL,
  BUS_LIST_REQUEST,
  BUS_LIST_SUCCESS,
  BUS_UPDATE_FAIL,
  BUS_UPDATE_REQUEST,
  BUS_UPDATE_RESET,
  BUS_UPDATE_SUCCESS,
  BUS_DELETE_SUCCESS,
  BUS_DELETE_FAIL,
  BUS_DELETE_RESET,
} from "../constants/busConstants";

export const busCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BUS_CREATE_SUCCESS:
      return {
        loading: false,
        bus: action.payload,
        success: true,
      };
    case BUS_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BUS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const busListReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BUS_LIST_SUCCESS:
      return {
        loading: false,
        buses: action.payload,
        success: true,
      };
    case BUS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const busGetReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_GET_REQUEST:
      return { loading: true, ...state };
    case BUS_GET_SUCCESS:
      return { loading: false, bus: action.payload, success: true };
    case BUS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const busUpdateReducer = (state = { BUS: {} }, action) => {
  switch (action.type) {
    case BUS_UPDATE_REQUEST:
      return { loading: true };
    case BUS_UPDATE_SUCCESS:
      return { loading: false, success: true, bus: action.payload };
    case BUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BUS_UPDATE_RESET:
      return { BUS: {} };
    default:
      return state;
  }
};

export const busDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DELETE_REQUEST:
      return { loading: true };
    case BUS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BUS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
    case BUS_DELETE_RESET:
      return {};
  }
};
