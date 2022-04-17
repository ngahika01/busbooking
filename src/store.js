import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  busCreateReducer,
  busDeleteReducer,
  busGetReducer,
  busListReducer,
  busResetReducer,
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
  bookingAllReducer,
} from "./reducers/bookingReducers";
import {
  paymentCreateReducer,
  paymentDeleteReducer,
  paymentGetReducer,
  paymentListReducer,
  paymentUpdateReducer,
  paymentUpdateToCancelled,
  paymentUpdateToPaidReducer,
} from "./reducers/paymentReducers";
import {
  busDepartureAllReducer,
  busDepartureCreateReducer,
  busDepartureDeleteReducer,
  busDepartureListReducer,
} from "./reducers/busDepartureReducers";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  busCreate: busCreateReducer,
  busGet: busGetReducer,
  busList: busListReducer,
  busDelete: busDeleteReducer,
  busUpdate: busUpdateReducer,
  busReset: busResetReducer,
  busDeparture: busDepartureCreateReducer,
  busDepartureList: busDepartureListReducer,
  busDepartureDelete: busDepartureDeleteReducer,
  busDepartureAll: busDepartureAllReducer,
  saveDetails: saveDetailsReducer,
  bookingCreate: bookingCreateReducer,
  bookingDelete: bookingDeleteReducer,
  bookingUpdate: bookingUpdateReducer,
  bookingList: bookingListReducer,
  bookigngGet: bookingGetReducer,
  bookingAll: bookingAllReducer,
  seatToBooked: updateSeatToBookedReducer,
  bookingSave: bookingSaveReducer,
  paymentCreate: paymentCreateReducer,
  paymentList: paymentListReducer,
  paymentGet: paymentGetReducer,
  paymentDelete: paymentDeleteReducer,
  paymentUpdate: paymentUpdateReducer,
  paymentUpdateToPaid: paymentUpdateToPaidReducer,
  paymentCancel: paymentUpdateToCancelled,
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
