import React, { useMemo } from "react";
import { useStore } from "../stores/useStore";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import Card from "../components/Card";

const COLORS = ["#ef4444", "#0ea5e9", "#10b981", "#f59e0b"];

export default function AnalyticsPage() {
  const bots = useStore(s => s.bots);

  const statusData = useMemo(() => {
    const c = { idle:0, busy:0, charging:0, error:0 };
    bots.forEach(b => c[b.status] = (c[b.status]||0)+1);
    return [
      { name: "Error", value: c.error },
      { name: "Busy", value: c.busy },
      { name: "Charging", value: c.charging },
      { name: "Idle", value: c.idle },
    ];
  }, [bots]);

  const batteryData = useMemo(() => {
    const buckets = { "0-20":0,"21-40":0,"41-60":0,"61-80":0,"81-100":0 };
    bots.forEach(b => {
      if (b.battery <= 20) buckets["0-20"]++;
      else if (b.battery <=40) buckets["21-40"]++;
      else if (b.battery <=60) buckets["41-60"]++;
      else if (b.battery <=80) buckets["61-80"]++;
      else buckets["81-100"]++;
    });
    return Object.entries(buckets).map(([k,v]) => ({ range:k, count:v }));
  }, [bots]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-80">
          <h3 className="font-semibold mb-3">Status Distribution</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-80">
          <h3 className="font-semibold mb-3">Battery Distribution</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batteryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
