import "./AdminPanel.scss";
import axios from "axios";

export const AdminPanel = () => {
  const initializeDatabase = () => {
    axios.get(`http://localhost:5000/createDB`).then((response) => {
      console.log("DATABASE CREATO");
      console.log(response);
    });
  };

  return (
    <div className="adminPanel">
      <div className="container">
        <h1>ADMIN PANEL</h1>
        <button onClick={() => initializeDatabase()}>CREA DATABASE</button>
      </div>
    </div>
  );
};
