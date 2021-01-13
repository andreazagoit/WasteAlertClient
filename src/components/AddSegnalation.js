import { useState } from "react";
import "./AddSegnalation.scss";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { setPlace } from "../features/places/placesSlice";
import RoomIcon from "@material-ui/icons/Room";

export const AddSegnalation = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [file, setFile] = useState();
  const [position, setPosition] = useState(null);
  const [type, setType] = useState("Rifiuti abbandonati");

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((geoData) => {
      setPosition({
        latitude: geoData.coords.latitude,
        longitude: geoData.coords.longitude,
      });
    });
  };

  const send = (event) => {
    event.preventDefault();

    if (
      user.phone &&
      position?.latitude &&
      position?.longitude &&
      type &&
      file
    ) {
      const data = new FormData();
      data.append("phone", user.phone);
      data.append("latitude", position.latitude);
      data.append("longitude", position.longitude);
      data.append("type", type);
      data.append("file", file);

      Axios.post("http://localhost:5000/", data).then((response) => {
        console.log(response);
        //dispatch(setPlace(result.data.result2));
        if (response.status !== 200) {
          alert("Errore nella ricezione dei dati");
        } else {
          if (response.data.result.status == "error") {
            alert(response.data.result.data);
          } else {
            dispatch(setPlace(response.data.result.data));
          }
        }
      });
    } else {
      alert("INSERIRE I DATI MANCANTI");
    }
  };

  return (
    <div className="addSegnalation">
      <div className="container">
        {file ? (
          <img
            className="addSegnalation__preview"
            src={URL.createObjectURL(file)}
            alt=""
          />
        ) : (
          <div className="addSegnalation__preview">
            <p>PREVIEW</p>
          </div>
        )}
        <form>
          <h1>CARICA SEGNALAZIONE</h1>
          {!position ? (
            <label onClick={() => getPosition()}>
              Consenti accesso a posizione
            </label>
          ) : (
            <div className="step">
              <div className="badge">
                <RoomIcon />
              </div>
              <h2>{parseFloat(position?.latitude).toFixed(3)} LATITUDE</h2>
              <h2>{parseFloat(position?.longitude).toFixed(3)} LONGITUDE</h2>
            </div>
          )}
          <label htmlFor="file" className="file">
            Seleziona immagine
          </label>
          <input
            type="file"
            id="file"
            accept=".jpg"
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
          />
          <div className="select">
            <div
              className={
                type === "Rifiuti abbandonati"
                  ? "selectOption active"
                  : "selectOption"
              }
              onClick={() => setType("Rifiuti abbandonati")}
            >
              Rifiuti abbandonati
            </div>
            <div
              className={
                type === "Cestini pieni"
                  ? "selectOption active"
                  : "selectOption"
              }
              onClick={() => setType("Cestini pieni")}
            >
              Cestini pieni
            </div>
            <div
              className={
                type === "Mancata raccolta"
                  ? "selectOption active"
                  : "selectOption"
              }
              onClick={() => setType("Mancata raccolta")}
            >
              Mancata raccolta
            </div>
            <div
              className={
                type === "Altro" ? "selectOption active" : "selectOption"
              }
              onClick={() => setType("Altro")}
            >
              Altro
            </div>
          </div>
          <button className="filled" onClick={send}>
            Segnala
          </button>
        </form>
      </div>
    </div>
  );
};
