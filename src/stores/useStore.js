import { create } from "zustand";
import { nanoid } from "nanoid";

export const useStore = create((set, get) => ({
  auth: { user: null, loggedIn: false },
  bots: [], // will fill with mock bots
  tasks: [],

  // auth
  login: (user) => set({ auth: { user, loggedIn: true } }),
  logout: () => set({ auth: { user: null, loggedIn: false } }),

  // bots
  setBots: (bots) => set({ bots }),
  updateBot: (id, patch) => set((state) => ({
    bots: state.bots.map(b => b.id === id ? { ...b, ...patch } : b)
  })),

  // tasks
  addTask: (task) => {
    const t = { id: nanoid(), createdAt: Date.now(), ...task };
    set((s) => ({ tasks: [...s.tasks, t] }));
    return t;
  },
  removeTaskById: (id) => set((s) => ({ tasks: s.tasks.filter(t => t.id !== id) })),
}));
