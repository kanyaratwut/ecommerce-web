import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const logout = useEcomStore((state) => state.logout);
  const user = useEcomStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <NavLink to={"/"} className="text-2xl font-bold ">
              LOGO
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? `bg-gray-200 px-3 py-2 rounded-md text-sm font-medium`
                  : `hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium `
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive
                  ? `bg-gray-200 px-3 py-2 rounded-md text-sm font-medium`
                  : `hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium `
              }
            >
              Shop{" "}
            </NavLink>
            {/* Badge */}
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? `bg-gray-200 px-3 py-2 rounded-md text-sm font-medium `
                  : `hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium `
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-1 bg-red-500 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 hover:bg-gray-200 rounded-md px-3 py-2 cursor-pointer relative"
                onClick={toggleDropdown}
              >
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute top-16 bg-white shadow-md z-50">
                  <Link
                    className="block px-4 py-2 hover:bg-gray-200"
                    to={"/user/history"}
                  >
                    History
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? `bg-gray-200 px-3 py-2 rounded-md text-sm font-medium `
                    : `hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium `
                }
              >
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? `bg-gray-200 px-3 py-2 rounded-md text-sm font-medium `
                    : `hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium `
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
