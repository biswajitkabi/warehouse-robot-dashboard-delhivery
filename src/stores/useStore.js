import { create } from "zustand";
import { nanoid } from "nanoid";
import { generateMockBots, randomUpdateBots } from "../utils/mockBots";

export const useStore = create((set, get) => ({
  // ========== AUTH STATE (INITIAL: NOT LOGGED IN) ==========
  auth: {
    user: null,
    loggedIn: false, // CRITICAL: Must be false initially
    username: null,
  },

  // ========== AUTH ACTIONS (NO localStorage) ==========
  login: (user) => {
    set({
      auth: {
        user,
        loggedIn: true,
        username: user.name || user.email.split("@")[0],
      },
    });
    console.log("✅ User logged in:", user);
  },

  signup: (user) => {
    set({
      auth: {
        user,
        loggedIn: true,
        username: user.name || user.email.split("@")[0],
      },
    });
    console.log("✅ User signed up:", user);
  },

  logout: () => {
    set({
      auth: {
        user: null,
        loggedIn: false,
        username: null,
      },
    });
    console.log("🚪 User logged out");
  },

  // ========== BOTS STATE & ACTIONS ==========
  bots: [],

  seedBots: (count = 10) => {
    const bots = generateMockBots(count);
    set({ bots });
    console.log(`🤖 Seeded ${count} bots`);
  },

  setBots: (bots) => set({ bots }),

  tickBots: () =>
    set((state) => ({
      bots: randomUpdateBots(state.bots),
    })),

  updateBot: (id, patch) =>
    set((state) => ({
      bots: state.bots.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    })),

  // ========== TASKS STATE & ACTIONS ==========
  tasks: [],

  addTask: (task) => {
    const newTask = {
      id: nanoid(),
      createdAt: Date.now(),
      status: "pending",
      ...task,
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
    console.log("📋 Task added:", newTask);
    return newTask;
  },

  removeTaskById: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  popOldestTask: () =>
    set((state) => ({
      tasks: state.tasks.slice(1),
    })),

  clearTasks: () => set({ tasks: [] }),
}));