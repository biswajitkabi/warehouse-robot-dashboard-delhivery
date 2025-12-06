import React, { useEffect } from "react";
import { useStore } from "../stores/useStore";

export default function TaskQueuePage() {
  const tasks = useStore((s) => s.tasks);
  const removeTaskById = useStore((s) => s.removeTaskById);

  useEffect(() => {
    const timer = setInterval(() => {
      if (tasks.length > 0) {
        removeTaskById(tasks[0].id);  // remove the oldest task
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [tasks, removeTaskById]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Queue</h1>

      {tasks.length === 0 && (
        <p className="text-gray-500">No pending tasks.</p>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white shadow rounded">
            <div className="font-semibold">
              {task.pickup} → {task.drop}
            </div>
            <div className="text-sm text-gray-600">Priority: {task.priority}</div>
            <div className="text-sm text-gray-600">Comments: {task.comments || "—"}</div>
          </div>
        ))}  
        
      </div>
    </div>
  );
}
