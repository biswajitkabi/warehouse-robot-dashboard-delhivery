import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BotStatusPage from "./pages/BotStatusPage";

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex items-center gap-4">
        <Link to="/" className="font-bold">Warehouse Dashboard</Link>
        <Link to="/bots" className="text-sm text-gray-600">Bot Status</Link>
        <Link to="/tasks" className="text-sm text-gray-600">Tasks</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div className="p-6">Welcome — build the dashboard pages.</div>} />
        <Route path="/bots" element={<BotStatusPage/>} />
        {/* other routes to add later */}
      </Routes>
    </div>
  );
}
