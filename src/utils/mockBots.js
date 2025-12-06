const BOT_STATUSES = ["idle", "busy", "charging", "error"];
function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }

export function generateMockBots(count=10) {
  const bots = [];
  for (let i=1;i<=count;i++){
    const status = BOT_STATUSES[Math.floor(Math.random()*BOT_STATUSES.length)];
    bots.push({
      id: `bot-${i}`,
      battery: rand(20,100),
      status,
      currentTask: status === "busy" ? `task-${rand(100,999)}` : null,
      speed: parseFloat((Math.random()*1.6 + 0.2).toFixed(2)),
      lastUpdated: Date.now(),
      x: rand(5,95),
      y: rand(5,95),
    });
  }
  return bots;
}

export function randomUpdateBots(bots) {
  return bots.map(b => {
    const battery = Math.max(0, b.battery - Math.floor(Math.random()*4));
    const r = Math.random();
    const status = r < 0.06 ? "error" : r < 0.22 ? "charging" : r < 0.6 ? "busy" : "idle";
    const currentTask = status === "busy" ? `task-${Math.floor(Math.random()*900)+100}` : null;
    const speed = status === "busy" ? parseFloat((Math.random()*1.6 + 0.2).toFixed(2)) : 0;
    const x = Math.max(1, Math.min(99, b.x + (Math.random()*8 - 4)));
    const y = Math.max(1, Math.min(99, b.y + (Math.random()*8 - 4)));
    return { ...b, battery, status, currentTask, speed, lastUpdated: Date.now(), x, y };
  });
}
