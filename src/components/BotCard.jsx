import React from "react";

export default function BotCard({ bot }) {
  const { id, battery, status, currentTask, speed, lastUpdated } = bot;
  const time = new Date(lastUpdated).toLocaleTimeString();

  const statusColor = {
    idle: "bg-gray-200 text-gray-800",
    busy: "bg-blue-100 text-blue-800",
    charging: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800"
  }[status] || "bg-gray-100";

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{id}</h3>
        <div className={`px-2 py-1 rounded text-sm ${statusColor}`}>{status}</div>
      </div>
      <div className="text-sm">Battery: <span className="font-medium">{battery}%</span></div>
      <div className="text-sm">Current Task: <span className="font-medium">{currentTask ?? "—"}</span></div>
      <div className="text-sm">Speed: <span className="font-medium">{speed} m/s</span></div>
      <div className="text-xs text-gray-500">Last: {time}</div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div style={{ width: `${battery}%` }} className={`h-2 rounded ${battery < 20 ? "bg-red-500" : "bg-indigo-500"}`} />
      </div>
    </div>
  );
}
