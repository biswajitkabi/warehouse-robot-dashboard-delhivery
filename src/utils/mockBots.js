export const BOT_STATUSES = ["idle","busy","charging","error"];

function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }

export function generateMockBots(count=10) {
  const bots = [];
  for(let i=1;i<=count;i++){
    const status = BOT_STATUSES[Math.floor(Math.random()*BOT_STATUSES.length)];
    bots.push({
      id: `bot-${i}`,
      battery: rand(10,100),
      status,
      currentTask: status === "busy" ? `task-${rand(100,999)}` : null,
      speed: parseFloat((Math.random()*1.5 + 0.2).toFixed(2)), // m/s
      lastUpdated: Date.now(),
      // optional coords for map/animation
      x: rand(5,95),
      y: rand(5,95),
    });
  }
  return bots;
}

export function randomUpdateBots(bots) {
  // returns new bots array with random small changes
  return bots.map(b => {
    const change = Math.random();
    let battery = b.battery - Math.floor(Math.random()*3);
    if (battery < 0) battery = 0;
    const status = Math.random() < 0.05 ? "error"
                 : Math.random() < 0.1 ? "charging"
                 : Math.random() < 0.4 ? "busy"
                 : "idle";
    const currentTask = status === "busy" ? `task-${Math.floor(Math.random()*900)+100}` : null;
    const speed = status === "busy" ? parseFloat((Math.random()*1.5 + 0.2).toFixed(2)) : 0;
    return {
      ...b,
      battery,
      status,
      currentTask,
      speed,
      x: Math.max(0, Math.min(100, b.x + (Math.random()*8-4))),
      y: Math.max(0, Math.min(100, b.y + (Math.random()*8-4))),
      lastUpdated: Date.now()
    };
  });
}
