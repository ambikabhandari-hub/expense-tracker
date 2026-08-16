import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Login session remove
    localStorage.removeItem("isLoggedIn");

    // Login page par redirect
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

        <div className="navbar-user">
          👤 Ambika
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