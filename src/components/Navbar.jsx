import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
          to="/"
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

        <NavLink
          to="/logout"
          className="logout"
        >
          Logout
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;