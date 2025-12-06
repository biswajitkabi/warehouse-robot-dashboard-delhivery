import React, { useEffect } from "react";
import { useStore } from "../stores/useStore";
import BotCard from "../components/BotCard";

export default function BotStatusPage() {
  const bots = useStore(s => s.bots);
  const tickBots = useStore(s => s.tickBots);
  const seedBots = useStore(s => s.seedBots);

  useEffect(() => {
    if (!bots || bots.length === 0) seedBots(10);

    const id = setInterval(() => {
      tickBots();
    }, 10000);

    return () => clearInterval(id);
  }, [tickBots, seedBots, bots.length]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bot Status</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots.map(b => <BotCard key={b.id} bot={b} />)}
      </div>
    </div>
  );
}
