import "./HomePage.scss";
import { SegnalationList } from "../components/SegnalationList";
import { AddSegnalation } from "../components/AddSegnalation";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  return (
    <div className="homePage">
      <Navbar />
      <AddSegnalation />
      <SegnalationList />
    </div>
  );
};
