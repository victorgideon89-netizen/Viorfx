import React, { useEffect, useState } from "react";
import { Bell, ArrowUpRight, X, TrendingUp, ShieldAlert, Check } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface PushNotificationProps {
  lang: Language;
  onImportSignal: (mockSignal: any) => void;
}

export interface ToastAlert {
  id: string;
  pair: string;
  signal: "BUY" | "SELL";
  timeframe: string;
  entry: number;
  stopLoss: number;
  tp: number;
  confidence: number;
}

export default function PushNotification({ lang, onImportSignal }: PushNotificationProps) {
  const [activeAlert, setActiveAlert] = useState<ToastAlert | null>(null);
  const t = translations[lang];

  useEffect(() => {
    // Generate initial alert after 10 seconds, then repeat every 55 seconds to simulate institutional signal feeds.
    const runAlertCycle = () => {
      const randomPairs = ["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "AUD/USD", "GBP/JPY"];
      const pair = randomPairs[Math.floor(Math.random() * randomPairs.length)];
      const signal = Math.random() > 0.5 ? ("BUY" as const) : ("SELL" as const);
      const timeframe = Math.random() > 0.5 ? "H1" : "M15";
      
      let base = 1.1200;
      let digits = 4;
      if (pair === "GBP/USD" || pair === "GBP/JPY") { base = 1.2850; }
      if (pair === "USD/JPY") { base = 156.40; digits = 2; }
      if (pair === "XAU/USD") { base = 2332.00; digits = 1; }

      const entry = parseFloat((base + (Math.random() * 0.0150)).toFixed(digits));
      const stopLoss = parseFloat((entry - (signal === "BUY" ? 0.0035 : -0.0035)).toFixed(digits));
      const tp = parseFloat((entry + (signal === "BUY" ? 0.0090 : -0.0090)).toFixed(digits));
      const confidence = Math.floor(Math.random() * 14) + 79; // 79%-93%

      setActiveAlert({
        id: Math.random().toString(),
        pair,
        signal,
        timeframe,
        entry,
        stopLoss,
        tp,
        confidence
      });

      // HTML Audio chime (Synthesized in-browser audio context helper so it runs without external static MP3 files!)
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        // Elegant forex chime chord
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } catch (e) {
        // Fallback if audio context is blocked
      }
    };

    const initialTimer = setTimeout(runAlertCycle, 15000); // 15 seconds after launch
    const intervalTimer = setInterval(runAlertCycle, 65000); // every 65 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  if (!activeAlert) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4.5 rounded-2xl bg-slate-950/95 border border-amber-500/35 backdrop-blur-xl shadow-2xl flex gap-3 animate-slide-up hover:border-amber-500 transition-all duration-300"
      id={`push-alert-${activeAlert.id}`}
    >
      {/* Decorative colored glow bar */}
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-2xl ${
        activeAlert.signal === "BUY" ? "bg-emerald-500" : "bg-rose-500"
      }`} />

      {/* Circle Icon Badge */}
      <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
        activeAlert.signal === "BUY" 
          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
          : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
      }`}>
        <Bell className="w-5 h-5 animate-bounce" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider text-amber-400 font-semibold flex items-center gap-1 uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            {t.newSignalNotification}
          </span>
          <button 
            onClick={() => setActiveAlert(null)}
            className="text-slate-500 hover:text-slate-300 transition-all"
            id="close-alert-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Trade Details */}
        <p className="mt-1.5 text-sm font-semibold text-slate-100 font-sans">
          {activeAlert.pair} ({activeAlert.timeframe}) : {" "}
          <span className={activeAlert.signal === "BUY" ? "text-emerald-400" : "text-rose-400"}>
            {activeAlert.signal}
          </span>
        </p>

        <div className="mt-2 grid grid-cols-2 gap-1.5 font-mono text-[11px] text-slate-400">
          <div>Entry: <span className="text-slate-200">{activeAlert.entry}</span></div>
          <div>TP: <span className="text-slate-200">{activeAlert.tp}</span></div>
          <div>Stop Loss: <span className="text-slate-200">{activeAlert.stopLoss}</span></div>
          <div>Confidence: <span className="text-amber-400 font-bold">{activeAlert.confidence}%</span></div>
        </div>

        {/* CTA Actions */}
        <div className="mt-3.5 flex gap-2 justify-end text-[11px] font-medium font-sans">
          <button
            onClick={() => setActiveAlert(null)}
            className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-all"
            id="decline-alert-btn"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              onImportSignal(activeAlert);
              setActiveAlert(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
            id="import-alert-btn"
          >
            <span>Load Setup</span>
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
