import { useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserSegnalations } from "./features/places/placesSlice";
import { selectUser, setUser } from "./features/user/userSlice";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("user").then((data) => {
      console.log("LOGGING WITH USER DATA >>> ", JSON.parse(data));
      if (data) {
        dispatch(setUser(JSON.parse(data)));
      }
    });
  }, []);

  return (
    <div className="app">
      {!user?.account ? (
        <LoginPage />
      ) : user?.account == "admin" ? (
        <AdminPage />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;
