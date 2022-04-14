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
} from "./reducers/busReducers";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingUpdateReducer,
  bookingGetReducer,
  bookingListReducer,
} from "./reducers/bookingReducers";

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
