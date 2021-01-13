import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../../helpers/helpers";

export const placesSlice = createSlice({
  name: "places",
  initialState: {
    value: [],
  },
  reducers: {
    setPlace: (state, action) => {
      console.log("SET PLACE >>> ", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setPlace } = placesSlice.actions;

export const getUserSegnalations = (phone) => (dispatch) => {
  console.log("GET USER SEGNALATION");
  axios.get(`http://localhost:5000?phone=${phone}`).then((response) => {
    console.log("RESPONDE STATUS", response);
    if (response.status !== 200) {
      alert("Errore nella ricezione dei dati");
    } else {
      if (response.data.result.status == "error") {
        alert(getErrorMessage(response.data.result.data));
      } else {
        dispatch(setPlace(response.data.result.data));
      }
    }
  });
};

export const getAllUserSegnalations = () => (dispatch) => {
  console.log("GET ALL USER SEGNALATION");
  axios.get(`http://localhost:5000/admin`).then((response) => {
    console.log(response);
    if (response.status !== 200) {
      alert("Errore nella ricezione dei dati");
    } else {
      if (response.data.result.status == "error") {
        alert(getErrorMessage(response.data.result.data));
      } else {
        dispatch(setPlace(response.data.result.data));
      }
    }
  });
};

export const addUserSegnalations = async (phone, latitude, longitude, type) => (
  dispatch
) => {
  console.log("ADD USER SEGNALATION");
  const result = new Promise((resolve) => {
    axios
      .post(`http://localhost:5000`, {
        phone,
        latitude,
        longitude,
        type,
      })
      .then((response) => {
        resolve(response);
      });
  });
  result.then((response) => {
    dispatch(getUserSegnalations(phone));
  });
};

export const removeUserSegnalations = (id, phone, account) => (dispatch) => {
  console.log("REMOVE USER SEGNALATION");
  axios
    .delete(`http://localhost:5000`, { data: { id: id } })
    .then((response) => {
      if (response.status !== 200) {
        alert("Errore nella ricezione dei dati");
      } else {
        if (response.data.result.status == "error") {
          alert(response.data.result.data);
        } else {
          if (account == "admin") {
            dispatch(getAllUserSegnalations());
          } else {
            dispatch(getUserSegnalations(phone));
          }
        }
      }
    });
};

export const selectPlaces = (state) => state.places.value;

export default placesSlice.reducer;
