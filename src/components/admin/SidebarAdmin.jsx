import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRoundCog,
  BookCopy,
  Logs,
  LogOut,
  ShoppingBasket,
} from "lucide-react";

const SidebarAdmin = () => {
  return (
    <div className="bg-pink-200 w-64 text-black flex flex-col h-screen">
      <div className="h-24 bg-pink-300 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>
      {/* flex-1 ขยายให้เต็มพื้นที่ที่เหลือ */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-pink-600 text-white px-4 py-2 flex items-center rounded-md"
              : "text-black px-4 py-2 hover:bg-pink-500 hover:text-white rounded flex items-center"
          } //ternary
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to={"/admin/manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-pink-600 text-white px-4 py-2 flex items-center rounded-md"
              : "text-black px-4 py-2 hover:bg-pink-500 hover:text-white rounded flex items-center"
          } //ternary
        >
          <UserRoundCog className="mr-2" />
          Manage
        </NavLink>
        <NavLink
          to={"/admin/category"}
          className={({ isActive }) =>
            isActive
              ? "bg-pink-600 text-white px-4 py-2 flex items-center rounded-md"
              : "text-black px-4 py-2 hover:bg-pink-500 hover:text-white rounded flex items-center"
          } //ternary
        >
          <BookCopy className="mr-2" />
          Category
        </NavLink>
        <NavLink
          to={"/admin/product"}
          className={({ isActive }) =>
            isActive
              ? "bg-pink-600 text-white px-4 py-2 flex items-center rounded-md"
              : "text-black px-4 py-2 hover:bg-pink-500 hover:text-white rounded flex items-center"
          } //ternary
        >
          <ShoppingBasket className="mr-2" />
          Product
        </NavLink>
        <NavLink
          to={"/admin/orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-pink-600 text-white px-4 py-2 flex items-center rounded-md"
              : "text-black px-4 py-2 hover:bg-pink-500 hover:text-white rounded flex items-center"
          } //ternary
        >
          <Logs className="mr-2" />
          Orders
        </NavLink>
      </nav>
      <div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-pink-600 text-white px-4 py-2 flex items-center rounded-md"
              : "text-black px-4 py-2 hover:bg-pink-500 hover:text-white rounded flex items-center"
          } //ternary
        >
          <LogOut className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
