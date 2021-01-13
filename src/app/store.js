import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "../features/places/placesSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    places: placesReducer,
    user: userReducer,
  },
});
