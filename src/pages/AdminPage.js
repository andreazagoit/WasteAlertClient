import React from "react";
import { AdminPanel } from "../components/AdminPanel";
import { Navbar } from "../components/Navbar";
import { SegnalationList } from "../components/SegnalationList";
import "./AdminPage.scss";

export const AdminPage = () => {
  return (
    <div className="adminPage">
      <Navbar />
      <AdminPanel />
      <SegnalationList />
    </div>
  );
};
