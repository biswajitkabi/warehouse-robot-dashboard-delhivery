import React, { useEffect } from "react";
import { useStore } from "../stores/useStore";
import { generateMockBots, randomUpdateBots } from "../utils/mockBots";
import BotCard from "../components/BotCard";

export default function BotStatusPage(){
  const bots = useStore(state => state.bots);
  const setBots = useStore(state => state.setBots);
  const updateBot = useStore(state => state.updateBot);

  useEffect(() => {
    // initial load
    const initial = generateMockBots(10);
    setBots(initial);

    // auto-update every 10s
    const id = setInterval(() => {
      setBots(prev => randomUpdateBots(getCurrentBots())); // we'll implement getCurrentBots below
    }, 10000);

    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper to access latest store snapshot (avoid stale closure)
  const getCurrentBots = () => {
    // access via useStore.getState
    return require("../stores/useStore").useStore.getState().bots;
  };

  // alternative safe pattern: setInterval that uses setBots(prev => randomUpdateBots(prev))
  // but because setBots as created simply sets, we'll reassign setBots to functional below:
  useEffect(() => {
    // override with safe functional setter
    const store = require("../stores/useStore").useStore;
    const id = setInterval(() => {
      const prev = store.getState().bots;
      store.getState().setBots(randomUpdateBots(prev));
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bot Status</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots.map(b => <BotCard key={b.id} bot={b} />)}
      </div>
    </div>
  );
}
