import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  busCreateReducer,
  busDeleteReducer,
  busGetReducer,
  busListReducer,
  busUpdateReducer,
  saveDetailsReducer,
  updateSeatToBookedReducer,
} from "./reducers/busReducers";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingUpdateReducer,
  bookingGetReducer,
  bookingListReducer,
  bookingSaveReducer,
} from "./reducers/bookingReducers";
import {
  paymentCreateReducer,
  paymentDeleteReducer,
  paymentGetReducer,
  paymentListReducer,
  paymentUpdateReducer,
} from "./reducers/paymentReducers";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  busCreate: busCreateReducer,
  busGet: busGetReducer,
  busList: busListReducer,
  busDelete: busDeleteReducer,
  busUpdate: busUpdateReducer,
  saveDetails: saveDetailsReducer,
  bookingCreate: bookingCreateReducer,
  bookingDelete: bookingDeleteReducer,
  bookingUpdate: bookingUpdateReducer,
  bookingList: bookingListReducer,
  bookigngGet: bookingGetReducer,
  seatToBooked: updateSeatToBookedReducer,
  bookingSave: bookingSaveReducer,
  paymentCreate: paymentCreateReducer,
  paymentList: paymentListReducer,
  paymentGet: paymentGetReducer,
  paymentDelete: paymentDeleteReducer,
  paymentUpdate: paymentUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
