import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column p-3 text-white bg-dark"
      style={{ width: "250px", height: "100vh" }}
    >
      <h2 className="text-center">WordBox</h2>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            📊 Dashboard
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <ul className="nav nav-pills flex-column">
          <li>
            <Link to="/settings" className="nav-link text-white">
              ⚙️ Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
