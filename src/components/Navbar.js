import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/user/userSlice";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { setPlace } from "../features/places/placesSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const logout = () => {
    dispatch(setUser(null));
    dispatch(setPlace(null));
  };

  return (
    <div className="navbar">
      <div className="container">
        <h1>WasteAlert</h1>
        <div className="logout" onClick={logout}>
          <p className="logout__phone">{user?.phone || "ADMIN"}</p>
          <div className="logout__button">
            <ExitToAppIcon className="logout__button" />
          </div>
        </div>
      </div>
    </div>
  );
};
