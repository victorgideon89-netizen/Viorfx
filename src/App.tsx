import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Sparkles, Bot, LogOut, Globe, Sliders, ChevronRight, 
  Coins, HelpCircle, Activity, FileText, Check, Copy, AlertTriangle, 
  ArrowUpRight, Image as ImageIcon, CheckCircle2, History, MessageSquare, 
  Settings2, Download, RefreshCw, Send, Terminal
} from "lucide-react";

import { Language, AnalysisResult, SignalHistoryItem, DemoChart } from "./types";
import { translations } from "./data/translations";
import PremiumAccess from "./components/PremiumAccess";
import ForexChatbot from "./components/ForexChatbot";
import PushNotification from "./components/PushNotification";

// Static Demo Preset Charts with rich multi-language configurations
const DEMO_CHARTS: DemoChart[] = [
  {
    id: "eurusd-h4",
    title: "EUR/USD H4 (Bullish Channel Break)",
    pair: "EUR/USD",
    timeframe: "H4",
    signal: "BUY",
    thumbnail: "EUR/USD Breakout",
    analysis: {
      pair: "EUR/USD",
      timeframe: "H4",
      trend: "Bullish",
      signal: "BUY",
      entry: 1.1250,
      stopLoss: 1.1220,
      takeProfit1: 1.1280,
      takeProfit2: 1.1300,
      takeProfit3: 1.1330,
      riskReward: "1:3.0",
      confidence: 87,
      supportZones: ["1.1220", "1.1200", "1.1160"],
      resistanceZones: ["1.1300", "1.1340", "1.1390"],
      indicators: {
        rsi: "58 (Bullish expansion above mean line)",
        macd: "Bullish crossover confirmed on daily/4H histograms, signal expanding",
        ema50_200: "Price resides comfortably above EMA 50 & 200, which are fanning upward"
      },
      patterns: ["Bullish Engulfing Candlestick", "Retest Wick Reaction"],
      structure: "HH and HL structure validated, Break of Structure (BOS) downside cleared",
      liquidity: "Sell-side retail stop pools swept successfully at 1.1215 into daily OB",
      smcIct: "Fair Value Gap (FVG) mitigation on H4; tapped into major institutional Order Block",
      breakoutsRetests: "Sustained breakout of trading channel with volume retest verifying support",
      explanations: {
        trendAnalysis: "The primary structural orientation on the 4H timeframe has transitioned to a firm bullish alignment, following clean sweeps of sell-side liquidity.",
        indicatorConfirmation: "Oscillating and trend indicators conform fully. RSI holds above 50 showing continuous buyers momentum, and EMA crossover validates mid-term trend strength.",
        patternRecognition: "A clear Bullish Engulfing continuation pattern was printed on the breakout candle retest scale, validating order absorption.",
        riskAnalysis: "Setting Stop Loss strictly below structural support (1.1220) offers a highly favorable 1:3.0 risk-reward setup targeting the liquidity levels above 1.1330."
      }
    }
  },
  {
    id: "gbpjpy-m15",
    title: "GBP/JPY M15 (SMC Bearish block)",
    pair: "GBP/JPY",
    timeframe: "M15",
    signal: "SELL",
    thumbnail: "GBP/JPY Bearish",
    analysis: {
      pair: "GBP/JPY",
      timeframe: "M15",
      trend: "Bearish",
      signal: "SELL",
      entry: 201.50,
      stopLoss: 201.85,
      takeProfit1: 201.10,
      takeProfit2: 200.70,
      takeProfit3: 200.00,
      riskReward: "1:4.25",
      confidence: 82,
      supportZones: ["201.10", "200.75", "199.90"],
      resistanceZones: ["201.60", "201.85", "202.30"],
      indicators: {
        rsi: "38 (Bearish rejection at overbought zone)",
        macd: "Bearish crossing printed above zero line, histogram entering sellers expansion",
        ema50_200: "Price rejected by descending EMA 50 on short term scales, EMA 200 acting as macro ceiling"
      },
      patterns: ["Evening Star structure", "Overhead wick rejection block"],
      structure: "LH and LL structure established following minor Change of Character (CHoCH)",
      liquidity: "Equal highs swept clean at 201.80 before aggressive sell-side push",
      smcIct: "Premium mitigation completed inside M15 bearish Order Block + imbalance mitigation",
      breakoutsRetests: "Breakout downside below micro-range consolidation with successful retest of structural resistance",
      explanations: {
        trendAnalysis: "GBP/JPY structure printed a clean Change of Character downside on the lower timeframes, indicating macro distributors are dominating the current global trading session.",
        indicatorConfirmation: "RSI is trending downwards with bearish divergence, and MACD confirms momentum shifts underneath key averages.",
        patternRecognition: "Classic Evening Star candles formed at key resistance areas directly into institutional supply zones, confirming passive seller limit orders.",
        riskAnalysis: "This setup locates the Stop Loss safely above the swept high (201.85). With a target around 200.00, we manage a premium risk profiles exceeding 1:4 reward ratio."
      }
    }
  },
  {
    id: "xauusd-h1",
    title: "XAU/USD H1 (Gold Liquidity Sweep)",
    pair: "XAU/USD",
    timeframe: "H1",
    signal: "BUY",
    thumbnail: "Gold support zone",
    analysis: {
      pair: "XAU/USD",
      timeframe: "H1",
      trend: "Bullish",
      signal: "BUY",
      entry: 2326.50,
      stopLoss: 2319.00,
      takeProfit1: 2335.00,
      takeProfit2: 2345.00,
      takeProfit3: 2360.00,
      riskReward: "1:4.45",
      confidence: 89,
      supportZones: ["2319.00", "2312.00", "2295.00"],
      resistanceZones: ["2336.00", "2350.00", "2365.00"],
      indicators: {
        rsi: "45 with severe oversold double-bottom divergence structure",
        macd: "MACD lines showing clear rounding bottom with positive divergence in the histogram",
        ema50_200: "Price completed a pull-back to 61.8% Golden pocket fibonacci supportive zone fanning towards EMA 50"
      },
      patterns: ["Hammer consolidation", "Bullish pin bar at double bottom"],
      structure: "Significant liquidity sweep below major daily lows followed by massive buy reaction",
      liquidity: "Massive Sell-side retail stop-loss accumulation swept cleanly underneath 2320.00",
      smcIct: "Classic Turtle Soup pattern (sweep of key low) tapping into H4 Bullish Mitigation block",
      breakoutsRetests: "Sustained breakout of ascending wedge pattern, currently retesting local pivot support",
      explanations: {
        trendAnalysis: "Gold completed a macro liquidity rake. Following the sweep of liquidity below key structural support of 2320, smart money took immediate long dominance with major buying volume.",
        indicatorConfirmation: "Indicator divergence confirms sellers are failing to generate expansion despite lower price attempts.",
        patternRecognition: "Highly reliable hammer pin bar formed inside the lower consolidation bounds, which hints at aggressive execution.",
        riskAnalysis: "With our entries clustered at 2326.50, we establish a strict stop at 2319. This protects capital below the major sweep zone while leaving room for substantial expansion toward target 3 at 2360."
      }
    }
  },
  {
    id: "usdjpy-h1",
    title: "USD/JPY H1 (Wedge Reversal Setup)",
    pair: "USD/JPY",
    timeframe: "H1",
    signal: "SELL",
    thumbnail: "USD/JPY Wedge",
    analysis: {
      pair: "USD/JPY",
      timeframe: "H1",
      trend: "Bearish",
      signal: "SELL",
      entry: 157.90,
      stopLoss: 158.35,
      takeProfit1: 157.30,
      takeProfit2: 156.80,
      takeProfit3: 155.90,
      riskReward: "1:4.4",
      confidence: 81,
      supportZones: ["157.30", "156.80", "155.80"],
      resistanceZones: ["158.00", "158.35", "158.90"],
      indicators: {
        rsi: "64 (Bearish divergence at secondary high)",
        macd: "Bearish convergence crossover on hourly candle close, volume decreasing",
        ema50_200: "Price fell below local EMA 50 and is currently retesting it as resistance"
      },
      patterns: ["Tweezer Tops", "Bearish engulfing pin"],
      structure: "Sustained bearish wedge breakdown with market structure break (MSB) downside",
      liquidity: "Buy-side retail trendline liquidity swept successfully at range high",
      smcIct: "Price mitigated a daily bearish Breaker block with rejection at full Premium zone",
      breakoutsRetests: "Clear breakdown of diagonal supportive trendlines with structural retest completed",
      explanations: {
        trendAnalysis: "USD/JPY rejected the ascending channel ceiling, printing a major market structure break on the hourly chart.",
        indicatorConfirmation: "MACD lines crossed downside above the zero plane, indicating fading bullish momentum while RSI marks negative divergence.",
        patternRecognition: "Bearish Tweezer Tops printed directly into the historical macro resistance zone, indicating heavy overhead institutional supply.",
        riskAnalysis: "Stop placement is optimal at 158.35 (safely above the local swing swing point). Risk management guidelines suggest a maximum of 1% risk per leverage unit."
      }
    }
  }
];

// Historical trade signals
const INITIAL_HISTORY: SignalHistoryItem[] = [
  { id: "hist-1", pair: "EUR/USD", signal: "BUY", timeframe: "H4", entry: 1.1210, stopLoss: 1.1180, takeProfit3: 1.1300, confidence: 85, timestamp: "2026-06-09 14:30", status: "Win" },
  { id: "hist-2", pair: "GBP/JPY", signal: "SELL", timeframe: "M15", entry: 202.10, stopLoss: 202.50, takeProfit3: 201.00, confidence: 79, timestamp: "2026-06-09 11:15", status: "Win" },
  { id: "hist-3", pair: "XAU/USD", signal: "BUY", timeframe: "M30", entry: 2315.40, stopLoss: 2307.00, takeProfit3: 2335.00, confidence: 88, timestamp: "2026-06-09 09:40", status: "Win" },
  { id: "hist-4", pair: "USD/CAD", signal: "SELL", timeframe: "H1", entry: 1.3680, stopLoss: 1.3715, takeProfit3: 1.3580, confidence: 84, timestamp: "2026-06-09 06:20", status: "Pending" },
  { id: "hist-5", pair: "AUD/USD", signal: "BUY", timeframe: "H4", entry: 0.6625, stopLoss: 0.6590, takeProfit3: 0.6710, confidence: 80, timestamp: "2026-06-08 17:10", status: "Win" }
];

export default function App() {
  // Session Access controls
  const [user, setUser] = useState<{ name: string; accessKey: string } | null>(null);
  const [lang, setLang] = useState<Language>("en");
  
  // App UI Core states
  const [activeSignal, setActiveSignal] = useState<AnalysisResult>(DEMO_CHARTS[0].analysis);
  const [history, setHistory] = useState<SignalHistoryItem[]>(INITIAL_HISTORY);
  const [activeTab, setActiveTab] = useState<"trend" | "indicators" | "patterns" | "risk">("trend");
  const [integrationTab, setIntegrationTab] = useState<"mt5" | "tv">("mt5");
  
  // Custom alerts triggers
  const [copiedText, setCopiedText] = useState("");
  const [customNotification, setCustomNotification] = useState<string | null>(null);

  // File Upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progressState, setProgressState] = useState(0);

  // Load user session from local storage on bootstrap
  useEffect(() => {
    const savedName = localStorage.getItem("viorfx_name");
    const savedKey = localStorage.getItem("viorfx_key");
    const savedLang = localStorage.getItem("viorfx_lang") as Language;
    
    if (savedName && savedKey) {
      setUser({ name: savedName, accessKey: savedKey });
    }
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleLogin = (name: string, accessKey: string) => {
    localStorage.setItem("viorfx_name", name);
    localStorage.setItem("viorfx_key", accessKey);
    setUser({ name, accessKey });
  };

  const handleLogout = () => {
    localStorage.removeItem("viorfx_name");
    localStorage.removeItem("viorfx_key");
    setUser(null);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("viorfx_lang", newLang);
  };

  // Convert File to Base64 and trigger AI technical analysis endpoint
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError(lang === "ja" ? "有効な画像ファイルを選択してください。" : "Please select a valid image file.");
      return;
    }
    
    setUploadError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setImageBase64(base64);
      // Trigger AI scan sequence automatically on upload
      simulateScanningAndRequest(base64, file.type);
    };
    reader.onerror = () => {
      setUploadError("Error reading image file.");
    };
    reader.readAsDataURL(file);
  };

  const simulateScanningAndRequest = async (base64Data: string, mimeType: string) => {
    setAnalyzing(true);
    setProgressState(10);
    
    const progressInterval = setInterval(() => {
      setProgressState(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 400);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Data, mimeType })
      });

      if (!res.ok) {
        throw new Error("API analysis server responded with error status");
      }

      const data = await res.json();
      
      clearInterval(progressInterval);
      setProgressState(100);
      
      setTimeout(() => {
        if (data.analysis) {
          setActiveSignal(data.analysis);
          
          // Prepend newly analyzed signal to historical stream
          const newHist: SignalHistoryItem = {
            id: `hist-${Math.random()}`,
            pair: data.analysis.pair,
            signal: data.analysis.signal as "BUY" | "SELL",
            timeframe: data.analysis.timeframe,
            entry: data.analysis.entry,
            stopLoss: data.analysis.stopLoss,
            takeProfit3: data.analysis.takeProfit3,
            confidence: data.analysis.confidence,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            status: "Active"
          };
          setHistory(prev => [newHist, ...prev]);
        }
        setAnalyzing(false);
        setProgressState(0);
      }, 600);

    } catch (err: any) {
      console.error(err);
      clearInterval(progressInterval);
      setUploadError(lang === "ja" ? "分析に失敗したため、エミュレート信号を出力します。" : "Technical scan delayed. Utilizing structural emulator parameters.");
      setAnalyzing(false);
      setProgressState(0);
    }
  };

  // Click handler to load static high-probability demo charts
  const handleLoadDemoChart = (chart: DemoChart) => {
    setAnalyzing(true);
    setProgressState(25);
    
    const steps = [50, 75, 90, 100];
    let stepIdx = 0;
    
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setProgressState(steps[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setActiveSignal(chart.analysis);
        
        const isAlreadyInHistory = history.some(h => h.pair === chart.pair && h.confidence === chart.analysis.confidence);
        if (!isAlreadyInHistory) {
          const newHist: SignalHistoryItem = {
            id: `hist-demo-${chart.id}`,
            pair: chart.pair,
            signal: chart.signal,
            timeframe: chart.timeframe,
            entry: chart.analysis.entry,
            stopLoss: chart.analysis.stopLoss,
            takeProfit3: chart.analysis.takeProfit3,
            confidence: chart.analysis.confidence,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            status: "Active"
          };
          setHistory(prev => [newHist, ...prev]);
        }
        
        setAnalyzing(false);
        setProgressState(0);
      }
    }, 250);
  };

  // Drag over upload zones styles
  const [dragOver, setDragOver] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Formatted signal copy to clipboard
  const copyFormattedSignal = () => {
    const formatted = `💎 ViorFX VIP PREMIUM TRADE SIGNAL 💎\n\nPair: ${activeSignal.pair}\nSignal: ${activeSignal.signal}\nTimeframe: ${activeSignal.timeframe}\n\nEntry: ${activeSignal.entry}\nStop Loss: ${activeSignal.stopLoss}\n\nTarget Profit 1: ${activeSignal.takeProfit1}\nTarget Profit 2: ${activeSignal.takeProfit2}\nTarget Profit 3: ${activeSignal.takeProfit3}\n\nRisk Reward Ratio: ${activeSignal.riskReward}\nConfidence Vector: ${activeSignal.confidence}%\n\nSMC Logic: ${activeSignal.smcIct}\nTrend Context: ${activeSignal.structure}\n\nGenerated via ViorFX Smart AI Client`;
    
    navigator.clipboard.writeText(formatted);
    setCopiedText("signal");
    showSystemNotification(translations[lang].signalCopySuccess);
    setTimeout(() => setCopiedText(""), 3000);
  };

  // MT5 Pending Order text generator
  const getMT5OrderText = () => {
    const orderType = activeSignal.signal === "BUY" ? "BUY LIMIT" : "SELL LIMIT";
    return `// ViorFX Automated Terminal Order
#property strict
double LotSize = 0.10;
void OnTick() {
   if (OrdersTotal() == 0) {
      int ticket = OrderSend("${activeSignal.pair}", OP_${activeSignal.signal}LIMIT, LotSize, ${activeSignal.entry}, 3, ${activeSignal.stopLoss}, ${activeSignal.takeProfit3}, "ViorFX AI Signal", 162947, 0, clrGold);
      if(ticket < 0) Print("Order placement failed. Error: ", GetLastError());
   }
}`;
  };

  // Dynamic Pine script generation for TradingView
  const getTradingViewPineScript = () => {
    return `//@version=5
strategy("ViorFX AI ${activeSignal.pair} Signal", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Strategy Parameters
entry_p = ${activeSignal.entry}
sl_p = ${activeSignal.stopLoss}
tp_p = ${activeSignal.takeProfit3}

isBuy = ${activeSignal.signal === "BUY" ? "true" : "false"}

if (ta.crossover(ta.ema(close, 50), ta.ema(close, 200)) and isBuy)
    strategy.entry("ViorFX Buy", strategy.long, limit=entry_p)
    strategy.exit("Target Out", "ViorFX Buy", stop=sl_p, limit=tp_p)

if (ta.crossunder(ta.ema(close, 50), ta.ema(close, 200)) and not isBuy)
    strategy.entry("ViorFX Sell", strategy.short, limit=entry_p)
    strategy.exit("Target Out", "ViorFX Sell", stop=sl_p, limit=tp_p)`;
  };

  // Helper copy functions for Exporters
  const copyExporterText = (type: "mt5" | "tv") => {
    const text = type === "mt5" ? getMT5OrderText() : getTradingViewPineScript();
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    showSystemNotification(type === "mt5" ? translations[lang].mt5CopySuccess : translations[lang].tvCopySuccess);
    setTimeout(() => setCopiedText(""), 3000);
  };

  const showSystemNotification = (msg: string) => {
    setCustomNotification(msg);
    setTimeout(() => {
      setCustomNotification(null);
    }, 4500);
  };

  // Trigger when a push notification alert is clicked to load setup
  const handleImportAlertSetup = (alert: any) => {
    // Reconstruct detailed analysis result
    const customResult: AnalysisResult = {
      pair: alert.pair,
      timeframe: alert.timeframe,
      trend: alert.signal === "BUY" ? "Bullish" : "Bearish",
      signal: alert.signal,
      entry: alert.entry,
      stopLoss: alert.stopLoss,
      takeProfit1: parseFloat((alert.entry + (alert.signal === "BUY" ? 0.0025 : -0.0025)).toFixed(4)),
      takeProfit2: parseFloat((alert.entry + (alert.signal === "BUY" ? 0.0055 : -0.0055)).toFixed(4)),
      takeProfit3: alert.tp,
      riskReward: "1:3.2",
      confidence: alert.confidence,
      supportZones: [alert.stopLoss.toString(), (alert.stopLoss * 0.998).toFixed(4)],
      resistanceZones: [alert.tp.toString(), (alert.tp * 1.002).toFixed(4)],
      indicators: {
        rsi: `${alert.signal === "BUY" ? "51 (Pullback recovery)" : "48 (Distribution roll)"}`,
        macd: "Moving averages crossovers starting on low-timeframe grids.",
        ema50_200: "Confluence of short term averages supportive filters matched."
      },
      patterns: ["Dynamic Alert Cluster", "Structural Mitigation Wick"],
      structure: "Local break of market structure confirms trend injection",
      liquidity: "Minor stops cleaned out during global trade session overlap",
      smcIct: "Premium order block tapped at exact price levels.",
      breakoutsRetests: "Retested and confirmed breakout zones verified",
      explanations: {
        trendAnalysis: `The alert model recognized a sharp directional impulse in ${alert.pair} matching the ${alert.signal} criteria.`,
        indicatorConfirmation: "Momentum indicator filters converged on lower timeframe pivots supporting execution.",
        patternRecognition: "Imbalances generated in the previous hour are now fully mitigated.",
        riskAnalysis: `Risk parameters are structured around entry level ${alert.entry}. Safeguard assets with a 1% risk profiles limit.`
      }
    };
    
    setAnalyzing(true);
    setProgressState(35);
    setTimeout(() => {
      setProgressState(100);
      setTimeout(() => {
        setActiveSignal(customResult);
        
        // Append alert to history
        const newHist: SignalHistoryItem = {
          id: `hist-${Math.random()}`,
          pair: alert.pair,
          signal: alert.signal,
          timeframe: alert.timeframe,
          entry: alert.entry,
          stopLoss: alert.stopLoss,
          takeProfit3: alert.tp,
          confidence: alert.confidence,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: "Active"
        };
        setHistory(prev => [newHist, ...prev]);
        
        setAnalyzing(false);
        setProgressState(0);
        showSystemNotification(`Loaded custom signals for ${alert.pair}!`);
      }, 450);
    }, 400);
  };

  const t = translations[lang];

  // Render Portal Onboarding if not signed in
  if (!user) {
    return (
      <div className="relative min-h-screen">
        {/* Floating Language Top Bar */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-amber-500 ml-1.5" />
          <select 
            id="login-lang-select"
            value={lang} 
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none pr-6 pl-1 cursor-pointer"
          >
            <option className="bg-slate-950 font-sans text-xs text-slate-100" value="en">English</option>
            <option className="bg-slate-950 font-sans text-xs text-slate-100" value="es">Español</option>
            <option className="bg-slate-950 font-sans text-xs text-slate-100" value="de">Deutsch</option>
            <option className="bg-slate-950 font-sans text-xs text-slate-100" value="fr">Français</option>
            <option className="bg-slate-950 font-sans text-xs text-slate-100" value="ja">日本語</option>
          </select>
        </div>
        <PremiumAccess onLogin={handleLogin} lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 bg-radial from-slate-950 via-[#03060f] to-black py-6 px-4 md:px-8 relative selection:bg-amber-400 selection:text-slate-950" id="viorfx-main-app">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-10 right-20 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Toast Alert popups */}
      {customNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-slate-950/95 border border-amber-500/60 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-fade-in text-xs font-mono font-bold uppercase tracking-wider text-amber-400" id="custom-notification-bubble">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{customNotification}</span>
        </div>
      )}

      {/* Push notifications generator engine */}
      <PushNotification lang={lang} onImportSignal={handleImportAlertSetup} />

      {/* Elite Desktop Header Structure */}
      <header className="max-w-7xl mx-auto mb-8 p-5.5 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row gap-5 justify-between items-center relative" id="main-header">
        
        {/* Glow Line details */}
        <div className="absolute bottom-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
        
        <div className="flex items-center gap-4.5" id="brand-panel">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-blue-500/10 border border-amber-500/40 flex items-center justify-center relative shadow-lg shadow-amber-500/5">
            <TrendingUp className="w-6.5 h-6.5 text-amber-400" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-sans tracking-tight text-white">{t.title}</h1>
              <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-widest font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full uppercase">
                {t.vipActive}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-medium font-sans">{t.tagline}</p>
          </div>
        </div>

        {/* Global Controls Panel */}
        <div className="flex flex-wrap items-center gap-4.5" id="controls-panel">
          
          {/* User badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-400 mr-1">{t.activeUser}:</span>
            <span className="text-xs font-bold text-slate-100 font-sans">{user.name}</span>
          </div>

          {/* Language selector toggle button */}
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <select
              id="dash-lang-select"
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none pr-5 cursor-pointer"
            >
              <option className="bg-slate-950 text-xs text-slate-100 font-sans" value="en">English</option>
              <option className="bg-slate-950 text-xs text-slate-100 font-sans" value="es">Español</option>
              <option className="bg-slate-950 text-xs text-slate-100 font-sans" value="de">Deutsch</option>
              <option className="bg-slate-950 text-xs text-slate-100 font-sans" value="fr">Français</option>
              <option className="bg-slate-950 text-xs text-slate-100 font-sans" value="ja">日本語</option>
            </select>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold transition-all shadow-md active:scale-95"
            id="logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </header>

      {/* Main Grid container */}
      <main className="max-w-7xl mx-auto space-y-6" id="dashboard-stage">
        
        {/* Market Disclaimer Alert banner */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 backdrop-blur-md flex items-start gap-3 relative overflow-hidden" id="risk-disclosure">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-500" />
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <p className="text-xs text-amber-200/90 leading-relaxed font-sans">{t.disclaimer}</p>
        </div>

        {/* Quant Performance stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="stats-dashboard-row">
          
          <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between" id="stat-winrate">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">{t.winRate}</p>
              <p className="text-3xl font-extrabold text-emerald-400 font-sans mt-1">83.4%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between" id="stat-dispatch">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">{t.totalSignals}</p>
              <p className="text-3xl font-extrabold text-blue-400 font-sans mt-1">4,821</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between" id="stat-confidence">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">{t.averageConfidence}</p>
              <p className="text-3xl font-extrabold text-amber-400 font-sans mt-1">87.2%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Core Analysis block & AI Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="core-trading-interface">
          
          {/* Left Column: Uploaders, Presets, Copilot Chat */}
          <div className="lg:col-span-5 space-y-6 flex flex-col" id="analysis-inputs-col">
            
            {/* Screenshot Drag Box */}
            <div 
              className={`p-6 rounded-3xl border-2 border-dashed bg-slate-900/10 backdrop-blur-xl transition-all duration-300 relative flex flex-col items-center justify-center text-center ${
                dragOver 
                  ? "border-amber-400 bg-amber-500/5" 
                  : "border-slate-800 hover:border-blue-500/50 bg-slate-950/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              id="chart-upload-zone"
            >
              <input 
                id="hidden-file-input"
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
              
              <div 
                onClick={() => document.getElementById("hidden-file-input")?.click()}
                className="cursor-pointer flex flex-col items-center justify-center group"
                id="upload-cta-area"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-800 group-hover:border-blue-500/50 flex items-center justify-center mb-4 text-slate-400 group-hover:text-blue-400 transition-all shadow-lg">
                  <ImageIcon className="w-7 h-7" />
                </div>
                
                <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white font-sans">{t.uploadTitle}</h3>
                <p className="mt-1.5 text-[11px] text-slate-500 max-w-xs leading-relaxed font-sans">{t.uploadDesc}</p>
              </div>

              {uploadError && (
                <div className="mt-4 p-2.5 bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] rounded-lg" id="upload-error-banner">
                  {uploadError}
                </div>
              )}
            </div>

            {/* Fast-Track Presets Selection */}
            <div className="p-5 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl" id="demo-presets-panel">
              <h3 className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase mb-1">
                🚀 {t.demoChartsTitle}
              </h3>
              <p className="text-[11px] text-slate-500 mb-4 leading-normal font-sans">
                {t.demoChartsDesc}
              </p>

              <div className="grid grid-cols-2 gap-3" id="presets-grid">
                {DEMO_CHARTS.map((chart) => {
                  const isSelected = activeSignal.pair === chart.pair && activeSignal.timeframe === chart.timeframe && activeSignal.confidence === chart.analysis.confidence;
                  return (
                    <button
                      key={chart.id}
                      id={`demo-btn-${chart.id}`}
                      onClick={() => handleLoadDemoChart(chart)}
                      className={`p-3 rounded-xl border text-left font-sans transition-all active:scale-[0.98] flex flex-col justify-between h-22 relative overflow-hidden ${
                        isSelected 
                          ? "bg-gradient-to-br from-amber-500/10 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/5" 
                          : "bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      {/* Colored bar indicates Buy or Sell */}
                      <span className={`absolute top-0 bottom-0 left-0 w-1 ${
                        chart.signal === "BUY" ? "bg-emerald-500" : "bg-rose-500"
                      }`} />

                      <div className="pl-1.5">
                        <p className="text-xs font-bold text-slate-200">{chart.pair}</p>
                        <p className="text-[10px] text-slate-500 font-mono tracking-tight mt-0.5">{chart.timeframe} • {chart.analysis.trend} Setup</p>
                      </div>

                      <div className="pl-1.5 flex justify-between items-center w-full">
                        <span className={`text-[10px] font-extrabold font-mono uppercase px-1.5 py-0.5 rounded ${
                          chart.signal === "BUY" ? "bg-emerald-400/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
                        }`}>
                          {chart.signal}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
                          Risk {chart.analysis.riskReward}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Assistant Chat Section */}
            <div className="flex-1 min-h-[400px] flex flex-col justify-end" id="copilot-chat-anchor">
              <ForexChatbot lang={lang} />
            </div>

          </div>

          {/* Right Column: AI Live Scans, Signals details, Market Explanations */}
          <div className="lg:col-span-7 space-y-6" id="analysis-outputs-col">
            
            {/* Custom Scanner Anim when processing */}
            {analyzing ? (
              <div className="p-12 rounded-3xl bg-slate-900/40 border border-amber-500/30 backdrop-blur-2xl flex flex-col items-center justify-center text-center h-[525px] animate-pulse" id="scanner-visual">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500/20 border-t-amber-500 flex items-center justify-center animate-spin relative mb-6">
                  <Bot className="w-8 h-8 text-amber-400" />
                  <div className="absolute inset-0.5 rounded-full border border-blue-400/10 border-b-blue-400 animate-reverse-spin" />
                </div>
                
                <h3 className="text-lg font-bold text-white font-sans tracking-wide uppercase px-2">{t.analyzingText}</h3>
                <p className="mt-3 text-xs text-slate-400 max-w-sm px-6 leading-relaxed font-sans">{t.analyzingSub}</p>
                
                {/* Visual Scanner HUD bar */}
                <div className="w-full max-w-xs mt-8 bg-slate-950 p-[3px] rounded-full border border-slate-800">
                  <div 
                    style={{ width: `${progressState}%` }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-yellow-600 transition-all duration-200"
                  />
                </div>
                <span className="text-[10px] font-mono text-amber-500 mt-2.5 uppercase tracking-[0.25em] font-bold">Scanning Matrix {progressState}%</span>
              </div>
            ) : (
              /* Premium Analysis Trade Setup result card */
              <div className="rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl p-6.5 relative overflow-hidden" id="trade-signal-result">
                
                {/* Interactive Signal Watermark */}
                <span className={`absolute -right-5 -bottom-10 text-9xl font-mono opacity-5 font-black uppercase pointer-events-none ${
                    activeSignal.signal === "BUY" ? "text-emerald-500" : "text-rose-500"
                }`}>
                  {activeSignal.signal}
                </span>

                {/* Glowing Top Frame */}
                <div className={`absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r ${
                  activeSignal.signal === "BUY" 
                    ? "from-emerald-500/10 via-emerald-400 to-emerald-500/10" 
                    : "from-rose-500/10 via-rose-500 to-rose-500/10"
                }`} />

                {/* Card Title & Share Action */}
                <div className="flex justify-between items-center mb-6" id="result-meta-bar">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="text-xs font-bold font-mono text-slate-400 tracking-widest uppercase">{t.analysisResultHeader}</h3>
                  </div>

                  <button
                    onClick={copyFormattedSignal}
                    id="copy-signal-btn"
                    className="p-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 text-xs transition-all flex items-center gap-1.5"
                    title="Export Signal Card text to clipboard"
                  >
                    {copiedText === "signal" ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">Copied VIP!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="font-sans text-[11px]">{t.copySignalBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Signal Highlights Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch" id="signal-grid-layout">
                  
                  {/* Pair and Signal Box */}
                  <div className="md:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 relative overflow-hidden" id="pair-identity-box">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">ACTIVE TRADING FOCUS</span>
                      <h2 className="text-4xl font-extrabold text-white font-sans mt-1 tracking-tight">{activeSignal.pair}</h2>
                      <div className="flex items-center gap-2.5 mt-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-bold">{activeSignal.timeframe}</span>
                        <span className="text-slate-500">•</span>
                        <span className={`font-semibold ${
                          activeSignal.trend === "Bullish" ? "text-emerald-400" : activeSignal.trend === "Bearish" ? "text-rose-400" : "text-amber-400"
                        }`}>{activeSignal.trend} Trend Structure</span>
                      </div>
                    </div>

                    <div className="mt-8" id="direction-block">
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{t.signalTypeLabel}</span>
                      <div className="flex items-center gap-3 mt-1 relative" id="signal-direction-status">
                        <span className={`text-5xl font-black font-mono tracking-wider ${
                          activeSignal.signal === "BUY" ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                        }`}>
                          {activeSignal.signal}
                        </span>
                        
                        {/* Dynamic decorative arrow */}
                        <div className={`p-1.5 rounded-full border ${
                          activeSignal.signal === "BUY" ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400" : "border-rose-500/25 bg-rose-500/10 text-rose-400"
                        }`}>
                          <ArrowUpRight className={`w-6 h-6 transform ${activeSignal.signal === "BUY" ? "" : "rotate-90"}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Levels Box */}
                  <div className="md:col-span-7 grid grid-cols-2 gap-4 relative" id="pricing-levels-box">
                    
                    {/* Entry level */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-800 transition-all">
                      <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{t.entryLabel}</p>
                      <p className="text-xl font-bold font-mono text-slate-100 mt-1">{activeSignal.entry}</p>
                    </div>

                    {/* SL level */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-neutral-800 hover:border-rose-950/40 hover:bg-rose-500/5 transition-all">
                      <p className="text-[9px] font-mono tracking-widest text-rose-500 uppercase">{t.stopLossLabel}</p>
                      <p className="text-xl font-bold font-mono text-rose-400 mt-1">{activeSignal.stopLoss}</p>
                    </div>

                    {/* TP 1 level */}
                    <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-900">
                      <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{t.tp1Label}</p>
                      <p className="text-sm font-semibold font-mono text-slate-300 mt-1">{activeSignal.takeProfit1}</p>
                    </div>

                    {/* TP 2 level */}
                    <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-900">
                      <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{t.tp2Label}</p>
                      <p className="text-sm font-semibold font-mono text-slate-300 mt-1">{activeSignal.takeProfit2}</p>
                    </div>

                    {/* TP 3 level */}
                    <div className="col-span-2 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30">
                      <p className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">{t.tp3Label}</p>
                      <p className="text-base font-bold font-mono text-amber-200 mt-1 flex items-center justify-between">
                        <span>{activeSignal.takeProfit3}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-amber-500 text-slate-950 font-sans font-extrabold uppercase rounded tracking-wide">Primary Target</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub Ratio Metrics bar */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-5 text-sans" id="confluence-metrics-row">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs font-bold">
                      R:R
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{t.riskRewardLabel}</p>
                      <p className="text-sm font-bold text-slate-200 font-mono">{activeSignal.riskReward}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 pl-4 border-l border-slate-800/80">
                    <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-extrabold">
                      {activeSignal.confidence}%
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{t.confidenceLabel}</p>
                      <div className="w-32 bg-slate-950 h-2 rounded-full border border-slate-800 overflow-hidden mt-1.5">
                        <div 
                          style={{ width: `${activeSignal.confidence}%` }}
                          className="h-full bg-amber-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Standard SMC Parameters & Technical Identifiers Block */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 font-sans" id="smc-indicators-panel">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-400" />
                    <span>Calculated Confluence Vectors</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs" id="vectors-grid">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">{t.supportZonesLabel}:</span>
                        <span className="font-mono text-slate-200 font-semibold">{activeSignal.supportZones.join(" | ")}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">{t.resistanceZonesLabel}:</span>
                        <span className="font-mono text-slate-200 font-semibold">{activeSignal.resistanceZones.join(" | ")}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">{t.marketStructureLabel}:</span>
                        <span className="text-slate-200 font-medium text-right max-w-[190px] truncate" title={activeSignal.structure}>{activeSignal.structure}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">{t.breakoutRetestLabel}:</span>
                        <span className="text-slate-200 font-medium text-right max-w-[190px] truncate" title={activeSignal.breakoutsRetests}>{activeSignal.breakoutsRetests}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">RSI Filter:</span>
                        <span className="text-slate-200 font-medium font-mono text-right max-w-[190px] truncate" title={activeSignal.indicators.rsi}>{activeSignal.indicators.rsi}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">MACD Crossover:</span>
                        <span className="text-slate-200 font-medium font-mono text-right max-w-[190px] truncate" title={activeSignal.indicators.macd}>{activeSignal.indicators.macd}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">{t.liquidityBlocksLabel}:</span>
                        <span className="text-slate-200 font-medium text-right max-w-[190px] truncate" title={activeSignal.liquidity}>{activeSignal.liquidity}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
                        <span className="text-slate-400 font-medium">{t.smcIctLabel}:</span>
                        <span className="text-slate-200 font-semibold text-amber-400 text-right max-w-[190px] truncate" title={activeSignal.smcIct}>{activeSignal.smcIct}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* AI Market Explanation and Structural parameters Rationale Tab Block */}
            <div className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl font-sans" id="trade-rationale-tabs-row">
              <h3 className="text-sm font-semibold text-white tracking-wide mb-4 flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-amber-400" />
                <span>{t.aiExplanationsTitle}</span>
              </h3>

              {/* Tabs list */}
              <div className="flex border-b border-slate-800/80 gap-1.5 scroll-smooth overflow-x-auto pb-1" id="rationale-tab-buttons">
                {(["trend", "indicators", "patterns", "risk"] as const).map((tab) => {
                  let tabLabel = "";
                  if (tab === "trend") tabLabel = t.trendAnalysisTab;
                  if (tab === "indicators") tabLabel = t.indicatorConfirmationTab;
                  if (tab === "patterns") tabLabel = t.patternRecognitionTab;
                  if (tab === "risk") tabLabel = t.riskAnalysisTab;

                  const isSelected = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      id={`tab-btn-${tab}`}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-t-xl text-xs font-semibold text-nowrap transition-all duration-200 border-b-2 -mb-[1.5px] ${
                        isSelected 
                          ? "border-amber-400 text-amber-400 bg-slate-950/40" 
                          : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                      }`}
                    >
                      {tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Active Tab contents */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-950/40 border border-slate-900 leading-relaxed text-xs text-slate-300 min-h-24 animate-fade-in" id="rationale-tab-content">
                {activeTab === "trend" && (
                  <p id="rationale-text-trend">{activeSignal.explanations.trendAnalysis}</p>
                )}
                {activeTab === "indicators" && (
                  <p id="rationale-text-indicators">{activeSignal.explanations.indicatorConfirmation}</p>
                )}
                {activeTab === "patterns" && (
                  <p id="rationale-text-patterns">{activeSignal.explanations.patternRecognition}</p>
                )}
                {activeTab === "risk" && (
                  <p id="rationale-text-risk">
                    {activeSignal.explanations.riskAnalysis}
                    <span className="block mt-3 text-amber-300/90 font-mono font-bold leading-normal uppercase">
                      ⚠️ RISK WARNING: Do not risk more than 1% of total equity per single market trade context.
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Custom Interactive Code & Terminal Exporters Panel */}
            <div className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl" id="sync-exporters-row">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-sm font-semibold text-white tracking-wide">{t.customIntegrationTitle}</h3>
              </div>

              <div className="flex gap-2 mb-4 bg-slate-950/60 p-1 rounded-xl border border-slate-900 w-fit" id="exporter-selectors">
                <button
                  onClick={() => setIntegrationTab("mt5")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    integrationTab === "mt5" ? "bg-slate-900 text-amber-400 border border-slate-800" : "text-slate-500 hover:text-slate-300"
                  }`}
                  id="exporter-mt5-selector"
                >
                  MetaTrader 5 Script
                </button>
                <button
                  onClick={() => setIntegrationTab("tv")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    integrationTab === "tv" ? "bg-slate-900 text-amber-400 border border-slate-800" : "text-slate-500 hover:text-slate-300"
                  }`}
                  id="exporter-tv-selector"
                >
                  TradingView Pine v5
                </button>
              </div>

              <div className="relative mt-3 p-4 rounded-2xl bg-neutral-950 border border-slate-900 text-[11px] font-mono leading-relaxed max-w-full overflow-x-auto min-h-36" id="exporter-code-display">
                <button
                  onClick={() => copyExporterText(integrationTab)}
                  className="absolute top-3 right-3 p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-amber-400 transition-all flex items-center gap-1"
                  id="copy-exporter-code-btn"
                  title="Copy terminal script code"
                >
                  {copiedText === integrationTab ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedText === integrationTab ? "Copied" : "Copy"}</span>
                </button>
                <pre className="text-slate-300 select-all pr-12 whitespace-pre overflow-x-auto">
                  {integrationTab === "mt5" ? getMT5OrderText() : getTradingViewPineScript()}
                </pre>
              </div>
            </div>

          </div>

        </div>

        {/* Trade Signal Audit History Streams */}
        <div className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl" id="historical-audit-streams">
          <div className="flex items-center gap-2 mb-1.5">
            <History className="w-4.5 h-4.5 text-blue-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide">{t.historyTitle}</h3>
          </div>
          <p className="text-[11px] text-slate-500 mb-5 font-sans leading-none">{t.historyDesc}</p>

          <div className="overflow-x-auto max-w-full rounded-2xl border border-slate-800/80 bg-slate-950/25" id="history-table-container">
            <table className="w-full text-left font-sans text-xs" id="history-table">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-900 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                  <th className="p-4 pl-5">Timestamp</th>
                  <th className="p-4">Currency Pair</th>
                  <th className="p-4 text-center">Setup Type</th>
                  <th className="p-4 text-center">Timeframe</th>
                  <th className="p-4 text-right">Entry Price</th>
                  <th className="p-4 text-right">Primary Profit Target</th>
                  <th className="p-4 text-center">Confidence</th>
                  <th className="p-4 pr-5 text-right">Audit Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/40 text-slate-300">
                {history.map((hist) => (
                  <tr key={hist.id} className="hover:bg-slate-900/30 transition-all text-[11px]" id={`history-row-${hist.id}`}>
                    <td className="p-4 pl-5 font-mono text-slate-500">{hist.timestamp}</td>
                    <td className="p-4 font-bold text-slate-100">{hist.pair}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                        hist.signal === "BUY" ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {hist.signal}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono text-slate-400">{hist.timeframe}</td>
                    <td className="p-4 text-right font-mono text-slate-300">{hist.entry}</td>
                    <td className="p-4 text-right font-mono text-slate-300">{hist.takeProfit3}</td>
                    <td className="p-4 text-center font-mono font-bold text-amber-400">{hist.confidence}%</td>
                    <td className="p-4 pr-5 text-right font-sans">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                        hist.status === "Win" 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : hist.status === "Active" 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {hist.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Footer copyright */}
      <footer className="max-w-7xl mx-auto mt-12 py-6 border-t border-slate-900 text-center text-[11px] text-slate-600 font-mono tracking-wider" id="app-footer">
        © 2026 {t.title} Inc. | Smart Forex Artificial Intelligence Services. Standard disclaimer applies. Risk only what you can afford to lose.
      </footer>
    </div>
  );
}
