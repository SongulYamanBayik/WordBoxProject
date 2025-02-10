import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-grow-1">
        {/* Üst Menü */}
        <Navbar />

        {/* İçerik */}
        <main className="container mt-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
