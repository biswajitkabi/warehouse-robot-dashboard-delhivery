import React, { useState } from "react";
import { useStore } from "../stores/useStore";
import Card from "../components/Card";

export default function TaskAllocationPage() {
  const addTask = useStore(s => s.addTask);
  const [form, setForm] = useState({ pickup: "", drop: "", priority: "medium", comments: "" });

  function onChange(e){ setForm({ ...form, [e.target.name]: e.target.value }); }
  function onSubmit(e){
    e.preventDefault();
    addTask(form);
    setForm({ pickup: "", drop: "", priority: "medium", comments: "" });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Allocate Task</h1>

      <Card className="max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Pickup</label>
            <input name="pickup" value={form.pickup} onChange={onChange}
              className="w-full border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Drop</label>
            <input name="drop" value={form.drop} onChange={onChange}
              className="w-full border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" required/>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Priority</label>
              <select name="priority" value={form.priority} onChange={onChange}
                className="w-full border border-gray-200 rounded px-3 py-2">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Comments</label>
              <input name="comments" value={form.comments} onChange={onChange}
                className="w-full border border-gray-200 rounded px-3 py-2" />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Create Task</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
