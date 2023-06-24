import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="root-body">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
