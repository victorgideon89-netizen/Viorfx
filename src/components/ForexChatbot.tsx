import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { ChatMessage, Language } from "../types";
import { translations } from "../data/translations";

interface ForexChatbotProps {
  lang: Language;
}

export default function ForexChatbot({ lang }: ForexChatbotProps) {
  const t = translations[lang];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: lang === "ja" 
        ? "こんにちは！ViorFX AIトレードコパイロットです。ICT、SMC（スマートマネーコンセプト）、市場構造分析、または効率的なリスク管理など、知りたい技術があればいつでも質問してください！"
        : "Hello! I am your ViorFX AI Technical Advisor with comprehensive knowledge of Smart Money Concepts (SMC) and ICT indicators. How can I assist you with your charting analysis or market explanations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact ViorFX API server");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        text: data.text || "No insights collected from AI generator.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errBotMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        text: lang === "ja"
          ? "接続リクエスト中に一時的な遅延が発生しました。リスクを原則1-2%以内に制御し、H4などの上位足での押し目を確認してください。"
          : `I encountered a sync interruption. Please remember to maintain strict risk management parameters as we scan the structures. Ask me another question!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errBotMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (questionKey: string) => {
    let questionText = "";
    if (questionKey === "q1") questionText = translations[lang].quickQuestion1;
    if (questionKey === "q2") questionText = translations[lang].quickQuestion2;
    if (questionKey === "q3") questionText = translations[lang].quickQuestion3;

    handleSendMessage(questionText);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: lang === "ja" 
          ? "コパイロットのスレッドをクリアしました。新しいSMCチャートコンセプトについて質問してください！"
          : "Fresh trading discussion initialized. Let's dig into structural order blocks or liquidity maps!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="ai-chatbot" className="flex flex-col h-[520px] rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl overflow-hidden relative shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800/80 flex items-center justify-between" id="chat-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center relative">
            <Bot className="w-5 h-5 text-amber-400" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 font-sans tracking-wide">
              {t.copilotChatHeader}
            </h3>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              SMC / ICT QUANT EXPERT
            </p>
          </div>
        </div>

        <button 
          onClick={clearChat}
          className="p-1 px-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 text-[11px] font-mono flex items-center gap-1 transition-all"
          id="chat-reset-btn"
          title="Reset chat structure"
        >
          <RefreshCw className="w-3 h-3" />
          Clear
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans text-sm bg-slate-950/20" id="chat-messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            id={`chat-msg-${msg.id}`}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 w-8.5 h-8.5 ${
              msg.role === "user" 
                ? "bg-blue-600/10 border border-blue-500/20 text-blue-400" 
                : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
            }`}>
              {msg.role === "user" ? (
                <User className="w-4.5 h-4.5" />
              ) : (
                <Bot className="w-4.5 h-4.5" />
              )}
            </div>

            {/* Content Container */}
            <div className="space-y-1">
              <div className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap break-words text-slate-200 ${
                msg.role === "user"
                  ? "bg-blue-900/25 border border-blue-800/30 rounded-tr-none text-slate-100"
                  : "bg-slate-900/50 border border-slate-800/50 rounded-tl-none pr-4"
              }`}>
                {msg.text}
              </div>
              <p className={`text-[9px] font-mono text-slate-500 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 mr-auto max-w-[80%]" id="chat-loading-bubble">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 w-8.5 h-8.5 flex items-center justify-center">
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
            </div>
            <div className="p-3 bg-slate-900/30 border border-slate-800/50 rounded-2xl rounded-tl-none text-slate-400 text-xs italic flex items-center gap-2">
              <span>Formulating risk parameters & order blocks...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Quick suggestions layout */}
      {messages.length === 1 && (
        <div className="px-5 py-2.5 bg-slate-950/40 border-t border-slate-900 flex flex-wrap gap-2 justify-center" id="frequent-topics">
          <button
            onClick={() => handleQuickQuestion("q1")}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-[11px] text-slate-300 font-sans transition-all active:scale-95 text-left"
            id="faq-btn-1"
          >
            💡 {t.quickQuestion1}
          </button>
          <button
            onClick={() => handleQuickQuestion("q2")}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-[11px] text-slate-300 font-sans transition-all active:scale-95 text-left"
            id="faq-btn-2"
          >
            ⚖️ {t.quickQuestion2}
          </button>
          <button
            onClick={() => handleQuickQuestion("q3")}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-[11px] text-slate-300 font-sans transition-all active:scale-95 text-left"
            id="faq-btn-3"
          >
            📉 {t.quickQuestion3}
          </button>
        </div>
      )}

      {/* Input controls */}
      <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 flex gap-2 items-center" id="chat-input-row">
        <input
          id="chat-text-input"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
          placeholder={t.chatPlaceholder}
          disabled={loading}
          className="flex-1 px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 text-xs font-sans placeholder-slate-600 outline-none transition-all"
        />
        <button
          id="chat-send-btn"
          onClick={() => handleSendMessage(inputMessage)}
          disabled={!inputMessage.trim() || loading}
          className="p-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold rounded-xl transition-all duration-200"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
