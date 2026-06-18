export type Language = "en" | "es" | "de" | "fr" | "ja";

export interface AnalysisResult {
  pair: string;
  timeframe: string;
  trend: "Bullish" | "Bearish" | "Sideways" | string;
  signal: "BUY" | "SELL" | string;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  riskReward: string;
  confidence: number;
  supportZones: string[];
  resistanceZones: string[];
  indicators: {
    rsi: string;
    macd: string;
    ema50_200: string;
  };
  patterns: string[];
  structure: string;
  liquidity: string;
  smcIct: string;
  breakoutsRetests: string;
  explanations: {
    trendAnalysis: string;
    indicatorConfirmation: string;
    patternRecognition: string;
    riskAnalysis: string;
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface SignalHistoryItem {
  id: string;
  pair: string;
  signal: "BUY" | "SELL";
  timeframe: string;
  entry: number;
  stopLoss: number;
  takeProfit3: number;
  confidence: number;
  timestamp: string;
  status: "Win" | "Active" | "Pending";
}

export interface DemoChart {
  id: string;
  title: string;
  pair: string;
  timeframe: string;
  signal: "BUY" | "SELL";
  thumbnail: string;
  analysis: AnalysisResult;
}
