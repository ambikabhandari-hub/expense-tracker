import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const userName = savedUser?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <span>💰</span>
        <h2>Expense Tracker</h2>
      </div>

      {/* Navigation */}
      <div className="navbar-links">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Reports
        </NavLink>

        {/* USER NAME */}
        <div className="navbar-user">
          👤 {userName}
        </div>

        {/* LOGOUT */}
        <button
          type="button"
          className="logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;