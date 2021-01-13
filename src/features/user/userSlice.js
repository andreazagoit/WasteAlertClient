import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      phone: null,
      account: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      console.log("SET USER >>> ", action.payload);
      if (action.payload !== null) {
        AsyncStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        AsyncStorage.removeItem("user");
      }
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
