import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <div>
      <MainNav/>
      
      <main className="h-full mt-2 mx-auto px-4">
        {/* ไว้แสดง component children */}
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;
