import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DeckDetail from "./pages/DeckDetail";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deck/:id" element={<DeckDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
