import React from "react";
import Card from "./Card";

export default function BotCard({ bot }) {
  const { id, battery, status, currentTask, speed, lastUpdated } = bot;
  const time = new Date(lastUpdated).toLocaleTimeString();

  const statusColor = {
    idle: "text-gray-700",
    busy: "text-blue-600",
    charging: "text-green-600",
    error: "text-red-600"
  }[status] || "text-gray-700";

  return (
    <Card className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-gray-400">ID</div>
          <div className="text-base md:text-lg font-semibold">{id}</div>
        </div>
        <div className={`text-xs md:text-sm font-medium ${statusColor}`}>
          {status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
        <div className="text-gray-500">Battery</div>
        <div className="font-medium">{battery}%</div>

        <div className="text-gray-500">Task</div>
        <div className="font-medium truncate">{currentTask ?? "—"}</div>

        <div className="text-gray-500">Speed</div>
        <div className="font-medium">{speed} m/s</div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-gray-400 truncate">Last: {time}</div>
        <div className="w-20 md:w-28 bg-gray-200 h-2 rounded overflow-hidden flex-shrink-0">
          <div 
            style={{ width: `${battery}%` }} 
            className={`h-2 transition-all ${battery < 20 ? "bg-red-600" : "bg-green-600"}`}
          />
        </div>
      </div>
    </Card>
  );
}