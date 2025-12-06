import React, { useState } from "react";
import { useStore } from "../stores/useStore";

export default function TaskAllocationPage() {
  const addTask = useStore((s) => s.addTask);

  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    priority: "medium",
    comments: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTask(form);  // add to global state
    alert("Task Created Successfully!");
    setForm({
      pickup: "",
      drop: "",
      priority: "medium",
      comments: "",
    });
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Allocation</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
        
        <div>
          <label className="block mb-1 font-medium">Pickup Location</label>
          <input
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Ex: A1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Drop Location</label>
          <input
            name="drop"
            value={form.drop}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Ex: B4"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Comments</label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
