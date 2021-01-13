import "./LoginPage.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUser } from "../features/user/userSlice";
import validator from "validator";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  return (
    <div className="loginPage">
      <div className="loginForm">
        <h1>WasteAlert</h1>
        <input
          type="text"
          placeholder="Numero di telefono"
          onChange={(event) => setPhone(event.target.value)}
        />
        <button
          className="filled"
          disabled={!validator.isMobilePhone(phone)}
          onClick={() => dispatch(setUser({ phone: phone, account: "user" }))}
        >
          ACCEDI
        </button>
        <p
          onClick={() => dispatch(setUser({ phone: phone, account: "admin" }))}
        >
          Vuoi accedere come <strong>amministratore</strong>?
        </p>
      </div>
    </div>
  );
};
