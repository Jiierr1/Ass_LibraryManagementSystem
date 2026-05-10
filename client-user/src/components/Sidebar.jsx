// components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiBook,
  FiTag,
  FiRepeat,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiGrid },
    { path: "/users", label: "Manage Users", icon: FiUsers },
    { path: "/books", label: "Manage Books", icon: FiBook },
    { path: "/categories", label: "Manage Categories", icon: FiTag },
    { path: "/loans", label: "Borrowing & Returns", icon: FiRepeat },
    { path: "/settings", label: "System Settings", icon: FiSettings },
    { path: "/reports", label: "Reports & Analytics", icon: FiBarChart2 },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand text-center">
        <h3>TEAM 7</h3>
        <p>Library Management System</p>
      </div>
      <nav className="nav flex-column">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link-custom ${isActive ? "active" : ""}`
              }
            >
              <IconComponent size={20} className="sidebar-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
