import React, { useEffect } from "react";
import { useStore } from "../stores/useStore";
import Card from "../components/Card";

export default function TaskQueuePage() {
  const tasks = useStore(s => s.tasks);
  const removeTaskById = useStore(s => s.removeTaskById);
  const popOldestTask = useStore(s => s.popOldestTask);

  useEffect(() => {
    const id = setInterval(() => {
      // remove oldest task if exists
      if (useStore.getState().tasks.length > 0) {
        popOldestTask();
      }
    }, 3000);
    return () => clearInterval(id);
  }, [popOldestTask]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Task Queue</h1>

      <Card>
        {tasks.length === 0 ? (
          <div className="text-gray-500">No pending tasks.</div>
        ) : (
          <ul className="space-y-3">
            {tasks.map(t => (
              <li key={t.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{t.pickup} → {t.drop}</div>
                  <div className="text-xs text-gray-500">{t.priority} • {t.comments}</div>
                </div>
                <div className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleTimeString()}</div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
