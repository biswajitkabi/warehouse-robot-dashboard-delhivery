import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BotStatusPage from "./pages/BotStatusPage";
import TaskAllocationPage from "./pages/TaskAllocationPage";
import TaskQueuePage from "./pages/TaskQueuePage"; // we will create this next

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex items-center gap-4">
        <Link to="/" className="font-bold">
          Warehouse Dashboard
        </Link>
        <Link to="/bots" className="text-sm text-gray-600">
          Bot Status
        </Link>
        <Link to="/tasks" className="text-sm text-gray-600">
          Tasks
        </Link>
        <Link to="/allocate" className="text-sm text-gray-600">
          Allocate Task
        </Link>
        <Link to="/queue" className="text-sm text-gray-600">
          Task Queue
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="p-6">Welcome — build the dashboard pages.</div>
          }
        />
        <Route path="/bots" element={<BotStatusPage />} />
        <Route path="/allocate" element={<TaskAllocationPage />} />
        <Route path="/queue" element={<TaskQueuePage />} />

        {/* other routes to add later */}
      </Routes>
    </div>
  );
}
