import React, { useMemo } from "react";
import { useStore } from "../stores/useStore";
import Card from "../components/Card";

export default function DashboardPage() {
  const bots = useStore((s) => s.bots);
  const tasks = useStore((s) => s.tasks);

  // ======== CALCULATE STATS FROM REAL DATA ==========
  const stats = useMemo(() => {
    const totalBots = bots.length;
    const idle = bots.filter((b) => b.status === "idle").length;
    const busy = bots.filter((b) => b.status === "busy").length;
    const charging = bots.filter((b) => b.status === "charging").length;
    const errorBots = bots.filter((b) => b.status === "error").length;

    const avgBattery = totalBots
      ? Math.round(bots.reduce((sum, b) => sum + b.battery, 0) / totalBots)
      : 0;

    return { totalBots, idle, busy, charging, errorBots, avgBattery };
  }, [bots]);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
        Dashboard
      </h1>

      {/* ====================== KPI Cards ====================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="border-l-4 border-red-600 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">
            Total Bots
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 text-gray-800">
            {stats.totalBots}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Avg Battery: {stats.avgBattery}%
          </p>
        </Card>

        <Card className="border-l-4 border-red-600 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">
            Busy Bots
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 text-gray-800">
            {stats.busy}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.charging} charging
          </p>
        </Card>

        <Card className="border-l-4 border-red-600 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">
            Idle Bots
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 text-gray-800">
            {stats.idle}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {tasks.length} pending tasks
          </p>
        </Card>

        <Card className="border-l-4 border-red-600 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">
            Bots in Error
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 text-gray-800">
            {stats.errorBots}
          </p>
          <p className="text-xs text-gray-500 mt-1">Needs maintenance</p>
        </Card>
      </div>

      {/* ====================== Two Column Section ====================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        {/* -------- Pending Tasks -------- */}
        <Card className="w-full">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Pending Tasks
          </h2>

          <div className="max-h-60 md:max-h-72 overflow-y-auto">
            {tasks.length === 0 ? (
              <p className="text-gray-600 text-sm md:text-base">
                No pending tasks.
              </p>
            ) : (
              <div className="space-y-2">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium text-sm md:text-base text-gray-800">
                        {t.pickup} → {t.drop}
                      </p>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        Priority: {t.priority}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(t.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* -------- Live Bot Status Snapshot -------- */}
        <Card className="w-full">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Bot Status Overview
          </h2>
          <div className="space-y-2 max-h-60 md:max-h-72 overflow-y-auto">
            {bots.length === 0 ? (
              <p className="text-gray-600 text-sm md:text-base">
                No bots available.
              </p>
            ) : (
              bots.map((b) => (
                <div
                  key={b.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0 ${
                        b.status === "error"
                          ? "bg-red-500"
                          : b.status === "busy"
                          ? "bg-orange-500"
                          : b.status === "charging"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />
                    <span className="text-gray-700 text-sm md:text-base">
                      {b.id}{" "}
                      <span className="text-gray-500 text-xs md:text-sm">
                        ({b.status})
                      </span>
                    </span>
                  </div>

                  <span className="text-gray-800 font-medium text-sm md:text-base">
                    {b.battery}%
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* ====================== Additional System Overview ====================== */}
      <Card className="mt-4 md:mt-6">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
          System Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <p className="text-xs md:text-sm text-gray-600">
              Active Operations
            </p>
            <p className="text-xl md:text-2xl font-bold text-blue-600 mt-2">
              {stats.busy + stats.charging}
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <p className="text-xs md:text-sm text-gray-600">
              Completed Today
            </p>
            <p className="text-xl md:text-2xl font-bold text-green-600 mt-2">
              {Math.floor(Math.random() * 200)}
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <p className="text-xs md:text-sm text-gray-600">Efficiency Rate</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-600 mt-2">
              {Math.floor(Math.random() * 10) + 90}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}