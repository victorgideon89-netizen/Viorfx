import React, { useState } from "react";
import { ArrowRight, Lock, Key, ShieldCheck, HelpCircle } from "lucide-react";
import { translations } from "../data/translations";
import { Language } from "../types";

interface PremiumAccessProps {
  onLogin: (name: string, accessKey: string) => void;
  lang: Language;
}

export default function PremiumAccess({ onLogin, lang }: PremiumAccessProps) {
  const [name, setName] = useState("");
  const [accessKey, setAccessKey] = useState("VIORFX_VIP"); // pre-populate with default key for optimal UX
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(lang === "ja" ? "トレーダー名を入力してください。" : "Please enter your trading name.");
      return;
    }
    if (!accessKey.trim()) {
      setError(lang === "ja" ? "アクセスキーを入力してください。" : "Please enter premium portal access key.");
      return;
    }
    setError("");
    onLogin(name, accessKey);
  };

  return (
    <div id="premium-portal" className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative overflow-hidden bg-radial from-slate-900 via-[#030712] to-black">
      {/* Dynamic graphic backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Floating Status Bar */}
      <div className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-lg animate-pulse" id="secure-badge">
        <ShieldCheck className="w-4 h-4 text-amber-500" />
        <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          SECURE QUANT QUANTUM CLOUD
        </span>
      </div>

      {/* Header Title */}
      <div className="text-center max-w-xl mx-auto mb-10 z-10 animate-fade-in" id="portal-logo-container">
        <h1 className="text-5xl font-sans tracking-tight bg-gradient-to-r from-slate-100 via-amber-200 to-amber-400 bg-clip-text text-transparent font-bold">
          {t.title}
        </h1>
        <p className="mt-3 text-sm tracking-wide text-slate-400 font-sans">
          {t.tagline}
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative z-10 hover:border-amber-500/30 transition-all duration-300" id="login-card">
        {/* Glow accent */}
        <div className="absolute -top-[1px] left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="flex items-center gap-3 mb-6" id="portal-header">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-slate-100 font-sans">
              {t.accessLabel}
            </h2>
            <p className="text-xs text-slate-400">
              {t.vipActive}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" id="portal-form">
          {/* Trader Name */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
              {t.enterName}
            </label>
            <input
              id="input-trader-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Victor Gideon"
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-200 text-sm font-sans placeholder-slate-600 transition-all outline-none"
            />
          </div>

          {/* Access Key */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
                {t.enterKey}
              </label>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[10px] text-amber-400/80 hover:text-amber-300 font-mono flex items-center gap-1 transition-all"
                id="hint-toggle-btn"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Show VIP Key
              </button>
            </div>
            <div className="relative">
              <input
                id="input-access-key"
                type="password"
                required
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  if (error) setError("");
                }}
                placeholder={t.keyPlaceholder}
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-200 text-sm font-sans placeholder-slate-600 transition-all outline-none"
              />
              <Key className="absolute left-3.5 top-3 text-slate-600 w-4.5 h-4.5" />
            </div>
            {showHint && (
              <p className="text-[11px] text-amber-300/85 font-mono p-2.5 rounded bg-amber-500/5 border border-amber-500/20 mt-1 animate-fade-in" id="portal-hint">
                {t.keyHint}
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl" id="portal-error">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            id="portal-submit-btn"
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-medium rounded-xl text-sm transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
          >
            <span>{t.loginBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-[11px] text-slate-500 text-center leading-relaxed font-sans" id="disclaimer-mini">
          Disclaimer: AI models provide mathematical estimations. No predictive tool holds 100% precision. Never risk money you cannot afford to lose.
        </p>
      </div>

      {/* Footer info */}
      <div className="mt-12 text-center text-slate-600 text-xs font-mono" id="portal-footer">
        © 2026 {t.title} Intelligence Technologies. All Rights Reserved.
      </div>
    </div>
  );
}
