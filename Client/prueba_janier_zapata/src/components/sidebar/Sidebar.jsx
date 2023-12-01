import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../auth/authContext";
// import { types } from "../../types/types";

import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { navSlider } from "./NavSlider";

import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/LoginSlice";
import { SweetAlert } from "../../hooks";

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    SweetAlert("Saliendo...", "Hasta pronto", "info", 2000);
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const path = localStorage.getItem("lastPath") || "general";
  const { user } = useSelector((state) => state.login);
  return (
    <div className="sidebar ">
      <div className="sidebarHeader">
        <h1>{user.name}</h1>
      </div>

      <div className="sidebarBody">
        <Navigation
          activeItemId={path === "/" ? "/home" : path}
          onSelect={({ itemId }) => {
            navigate(itemId, {
              replace: true,
            });
          }}
          items={navSlider}
        />
      </div>

      <div className=" sidebarFooter d-grid gap-2">
        <button className="btn btn-danger footer br-0" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </div>
  );
};
