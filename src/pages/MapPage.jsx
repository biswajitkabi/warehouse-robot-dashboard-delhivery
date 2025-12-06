import React, { useRef, useState, useEffect } from "react";
import { useStore } from "../stores/useStore";
import Card from "../components/Card";

export default function MapPage() {
  const [svgHtml, setSvgHtml] = useState(null);
  const bots = useStore(s => s.bots);
  const setBots = useStore(s => s.setBots);

  useEffect(() => {
    // move bots slightly every second for smooth motion
    const id = setInterval(() => {
      setBots(prev => prev.map(b => {
        const nx = Math.max(1, Math.min(99, b.x + (Math.random()*6 - 3)));
        const ny = Math.max(1, Math.min(99, b.y + (Math.random()*6 - 3)));
        return { ...b, x: nx, y: ny };
      }));
    }, 1000);
    return () => clearInterval(id);
  }, [setBots]);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setSvgHtml(ev.target.result);
    reader.readAsText(f);
  }

  function posStyle(x, y){
    return { position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", pointerEvents: "none" };
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">SVG Map (Bonus)</h1>

      <Card>
        <div className="mb-4">
          <input type="file" accept=".svg" onChange={handleFile} />
          <div className="text-xs text-gray-500 mt-1">Upload warehouse layout (SVG).</div>
        </div>

        <div className="relative bg-gray-100 rounded overflow-hidden" style={{ minHeight: 420 }}>
          {!svgHtml && <div className="h-72 flex items-center justify-center text-gray-400">Upload an SVG to render map</div>}

          {svgHtml && <div dangerouslySetInnerHTML={{ __html: svgHtml }} />}

          {svgHtml && bots.map(bot => (
            <div key={bot.id} style={posStyle(bot.x, bot.y)}>
              <svg width="34" height="34" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill={bot.status === "error" ? "#ef4444" : bot.status === "charging" ? "#10b981" : bot.status === "busy" ? "#0ea5e9" : "#111827"} />
                <text x="12" y="16" fontSize="9" textAnchor="middle" fill="#fff">{bot.id.replace('bot-','')}</text>
              </svg>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
