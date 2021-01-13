import "./SegnalationList.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserSegnalations,
  getUserSegnalations,
  removeUserSegnalations,
  selectPlaces,
} from "../features/places/placesSlice";
import { selectUser } from "../features/user/userSlice";
import { useEffect } from "react";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";

export const SegnalationList = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const places = useSelector(selectPlaces);

  useEffect(() => {
    console.log(user);
    if (user.account == "admin") {
      dispatch(getAllUserSegnalations());
    } else {
      dispatch(getUserSegnalations(user.phone));
    }
  }, []);

  return (
    <div className="segnalationList">
      <div className="segnalation__title">
        <div className="container">
          <h1>Le mie segnalazioni: </h1>
        </div>
      </div>
      <div className="segnalation__container">
        <div className="container">
          {places?.map(({ ID, phone, latitude, longitude, type }) => (
            <div className="segnalation" key={ID}>
              <div className="segnalation__container">
                <div
                  className="segnalation__containerImage"
                  style={{
                    background: `url(http://localhost:5000/uploads/${ID}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="segnalation__containerData">
                  <h2>{type}</h2>
                  {user?.account == "admin" && (
                    <div className="step">
                      <div className="badge">
                        <PhoneIcon />
                      </div>
                      <h2>{phone}</h2>
                    </div>
                  )}
                  <div className="step">
                    <div className="badge">
                      <RoomIcon />
                    </div>
                    <h2>{parseFloat(latitude).toFixed(3)} LATITUDINE</h2>
                    <h2>{parseFloat(longitude).toFixed(3)} LONGITUDINE</h2>
                  </div>
                </div>
              </div>
              <div className="segnalation__hover">
                <div className="segnalation__hoverButtons">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/${latitude},${longitude}`,
                        "_blank"
                      )
                    }
                  >
                    Apri
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        removeUserSegnalations(ID, user.phone, user.account)
                      )
                    }
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
