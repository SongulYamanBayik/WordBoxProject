import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light px-4 shadow">
      <input
        type="text"
        className="form-control w-25"
        placeholder="Search..."
      />
      <div>
        <span className="mx-3">🔔 Bildirimler</span>
      </div>
    </nav>
  );
};

export default Navbar;
