"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Send, 
  Sparkles, 
  Layers, 
  Eye, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Info,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";

interface MockDocument {
  id: string;
  name: string;
  type: string;
  pages: number;
  layoutBlocks: LayoutBlock[];
  questions: { q: string; a: string; citationId: string; citationLabel: string }[];
}

interface LayoutBlock {
  id: string;
  type: "title" | "text" | "table" | "figure";
  text: string;
  box: { x: number; y: number; w: number; h: number }; // Percentage coords
}

export default function InteractiveDemo() {
  const documents: MockDocument[] = [
    {
      id: "doc-1",
      name: "Visual_Grounding_RAG_Thesis.pdf",
      type: "Academic Paper",
      pages: 14,
      layoutBlocks: [
        { id: "b1", type: "title", text: "Advanced Neural Machine Reading with Visual Grounding", box: { x: 5, y: 5, w: 90, h: 10 } },
        { id: "b2", type: "text", text: "Section 1: Introduction. Conventional retrieval-augmented generation (RAG) models operate as purely linguistic systems, ignoring the two-dimensional spatial architecture of source documents.", box: { x: 5, y: 18, w: 43, h: 36 } },
        { id: "b3", type: "figure", text: "Figure 3.1: Dense Positional Fused Coordinate Spaces in LayoutLMv3.", box: { x: 52, y: 18, w: 43, h: 36 } },
        { id: "b4", type: "text", text: "By mapping character tokens relative to page height and width, our visual grounding engine matches textual answers with exact source bounding boxes, achieving 99.8% precision.", box: { x: 5, y: 58, w: 90, h: 22 } },
        { id: "b5", type: "table", text: "Table 4.2: Fused Latency Comparison across standard models.", box: { x: 5, y: 84, w: 90, h: 12 } }
      ],
      questions: [
        {
          q: "How does the system achieve 99.8% visual grounding precision?",
          a: "The visual grounding engine maps character tokens relative to the absolute page height and width. This enables matching generated answers directly to their exact source bounding box coordinates, eliminating spatial hallucinations. [Citation 1]",
          citationId: "b4",
          citationLabel: "Thesis Paper, Sec 3.2, p. 58"
        },
        {
          q: "What is the primary limit of traditional RAG pipelines stated in Section 1?",
          a: "Traditional RAG systems operate as purely linguistic engines, completely stripping away the two-dimensional spatial architecture of source files. This causes scanning failures on columns or figures. [Citation 2]",
          citationId: "b2",
          citationLabel: "Thesis Paper, Sec 1.1, p. 18"
        }
      ]
    },
    {
      id: "doc-2",
      name: "Q2_Global_Growth_Report.pdf",
      type: "Financial Report",
      pages: 8,
      layoutBlocks: [
        { id: "f1", type: "title", text: "Q2 2026 Core Growth & Segment Profitability Analytics", box: { x: 5, y: 5, w: 90, h: 8 } },
        { id: "f2", type: "text", text: "Segment revenues scaled by 14.2% quarter-over-quarter. Visual processing models mapped structural invoice tables, detecting hidden service fees and tracking line items without index breakdown.", box: { x: 5, y: 16, w: 48, h: 42 } },
        { id: "f3", type: "table", text: "Table 2.1: Revenue scale by segment (US$ Millions). Q2 scaled at $340M vs Q1 at $297M.", box: { x: 56, y: 16, w: 39, h: 42 } },
        { id: "f4", type: "text", text: "Operational expenditures decreased by 4.8% due to high-performance parsing agents automating document verification flows.", box: { x: 5, y: 62, w: 90, h: 16 } },
        { id: "f5", type: "figure", text: "Figure 1.2: Geographic scaling map.", box: { x: 5, y: 81, w: 90, h: 15 } }
      ],
      questions: [
        {
          q: "What was the quarter-over-quarter segment revenue scale in Q2?",
          a: "Segment revenues scaled by 14.2% quarter-over-quarter, rising to $340M in Q2 from $297M in Q1. Our structural cell parser mapped these line items with cell-level precision without tabular breaks. [Citation 1]",
          citationId: "f3",
          citationLabel: "Financial Report, Sec 2, p. 16"
        },
        {
          q: "Why did operational expenditures decrease by 4.8%?",
          a: "The decrease of 4.8% was driven by the integration of automated document parsing agents. By removing manual invoice routing and OCR matching, verification flows scaled cleanly. [Citation 2]",
          citationId: "f4",
          citationLabel: "Financial Report, Sec 3, p. 62"
        }
      ]
    }
  ];

  const [activeDocIdx, setActiveDocIdx] = useState<number>(0);
  const [ocrActive, setOcrActive] = useState<boolean>(true);
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ q: string; a: string; citationId?: string; citationLabel?: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const currentDoc = documents[activeDocIdx];

  const handleDocumentChange = (idx: number) => {
    setActiveDocIdx(idx);
    setHighlightedBlock(null);
    setChatHistory([]);
    setProcessingStatus(null);
  };

  const handleAskQuestion = (qText: string, aText: string, citationId?: string, citationLabel?: string) => {
    if (!qText.trim()) return;
    
    setProcessingStatus("Initializing spatial query tokenization...");
    
    setTimeout(() => {
      setProcessingStatus("Retrieving dense vector coordinates in FAISS...");
      
      setTimeout(() => {
        setProcessingStatus("Executing Reciprocal Rank Fusion & Gemini API reasoning...");
        
        setTimeout(() => {
          setChatHistory(prev => [...prev, { q: qText, a: aText, citationId, citationLabel }]);
          setHighlightedBlock(citationId || null);
          setProcessingStatus(null);
          
          // Shoot amazing neon confetti!
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#06b6d4", "#8b5cf6", "#10b981"]
          });
        }, 1000);
      }, 800);
    }, 700);
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.trim()) return;

    // Check if custom question matches predefined questions closely
    const match = currentDoc.questions.find(
      preset => preset.q.toLowerCase().includes(currentQuestion.toLowerCase()) || 
                currentQuestion.toLowerCase().includes(preset.q.toLowerCase().split(" ").slice(0, 3).join(" "))
    );

    if (match) {
      handleAskQuestion(currentQuestion, match.a, match.citationId, match.citationLabel);
    } else {
      // General response
      handleAskQuestion(
        currentQuestion,
        "Query successfully validated against LayoutLMv3 spatial tokens! However, custom queries require a live connected FastAPI container. Preset questions demonstrate coordinate citation drawing. [Citation 1]",
        currentDoc.layoutBlocks[1].id,
        "System Coordinate Mock Index"
      );
    }
    setCurrentQuestion("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, processingStatus]);

  return (
    <section id="demo" className="relative py-24 bg-grid-faint z-10 border-t border-slate-200/50">
      <div className="absolute inset-0 bg-[#f8fafc]/30 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            Interactive Sandbox
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            System Capabilities Simulator
          </h3>
          <p className="text-slate-600 text-sm">
            Load rich document contexts, toggle the EasyOCR layout detection box, and click preset questions to observe how the AI reasons visually and maps answers to exact page structures.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Document Viewer (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 p-4 rounded-xl border border-slate-200/80 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
              {/* Document Selector */}
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-cyan" />
                <select
                  value={activeDocIdx}
                  onChange={(e) => handleDocumentChange(Number(e.target.value))}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  id="doc-selector"
                >
                  {documents.map((doc, idx) => (
                    <option key={doc.id} value={idx} className="bg-white text-slate-900">
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOcrActive(!ocrActive)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono border transition-all duration-300 ${
                    ocrActive ? "border-cyan-500 bg-cyan-50 text-cyan-600 font-semibold" : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                  id="ocr-toggle"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>OCR LAYOUT</span>
                </button>
              </div>
            </div>

            {/* Document Render Area */}
            <div className="glass-premium rounded-xl border border-slate-200/80 bg-white/70 p-6 relative min-h-[460px] sm:min-h-[550px] overflow-hidden flex flex-col shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              {/* Scanning Lines sweeping */}
              {processingStatus && (
                <div className="absolute left-0 w-full h-0.5 bg-brand-cyan shadow-[0_0_12px_#06b6d4] animate-scan z-20 pointer-events-none" />
              )}

              {/* PDF Document Mock Canvas (decoupled border/bg so blocks sit directly on the outer glass card) */}
              <div className="relative flex-grow flex flex-col gap-4 overflow-hidden select-none">
                
                {currentDoc.layoutBlocks.map((block) => {
                  const isHighlighted = highlightedBlock === block.id;
                  let borderStyle = "border-slate-200/40 bg-white/40";
                  let labelColor = "bg-slate-200 text-slate-500";
                  
                  if (ocrActive) {
                    if (block.type === "title") {
                      borderStyle = "border-cyan-300 bg-cyan-50/10";
                      labelColor = "bg-cyan-500 text-white";
                    } else if (block.type === "text") {
                      borderStyle = "border-violet-300 bg-violet-50/10";
                      labelColor = "bg-violet-500 text-white";
                    } else if (block.type === "figure") {
                      borderStyle = "border-cyan-300 bg-cyan-50/20";
                      labelColor = "bg-cyan-500 text-white";
                    } else {
                      borderStyle = "border-emerald-300 bg-emerald-50/20";
                      labelColor = "bg-emerald-500 text-white";
                    }
                  }

                  if (isHighlighted) {
                    borderStyle = "border-emerald-500 bg-emerald-50 shadow-[0_0_20px_rgba(16,185,129,0.15)] z-20 animate-pulse border-2";
                    labelColor = "bg-emerald-500 text-white";
                  }

                  return (
                    <div
                      key={block.id}
                      style={{
                        position: "absolute",
                        left: `${block.box.x}%`,
                        top: `${block.box.y}%`,
                        width: `${block.box.w}%`,
                        height: `${block.box.h}%`
                      }}
                      className={`rounded p-2 transition-all duration-300 border text-[9px] flex flex-col justify-between overflow-hidden ${borderStyle}`}
                    >
                      {/* Section tag if OCR is active or box is highlighted */}
                      {(ocrActive || isHighlighted) && (
                        <span className={`absolute top-0 left-0 text-[6px] font-mono px-1 rounded uppercase tracking-wider scale-75 origin-top-left ${labelColor}`}>
                          {block.type}
                        </span>
                      )}
                      
                      {/* Structural elements display inside block */}
                      {block.type === "figure" ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 opacity-60 py-1">
                          <TrendingUp className="w-8 h-8 text-brand-cyan animate-pulse" />
                          <span className="text-[7px] text-slate-400 tracking-wider font-mono uppercase">VISUAL CROP</span>
                        </div>
                      ) : block.type === "table" ? (
                        <div className="w-full h-full flex flex-col justify-between opacity-60 py-1">
                          <div className="grid grid-cols-3 gap-1 border-t border-b border-slate-200 py-1">
                            <div className="h-1 bg-slate-300 rounded" />
                            <div className="h-1 bg-slate-300 rounded" />
                            <div className="h-1 bg-slate-300 rounded" />
                            <div className="h-1 bg-slate-200 rounded" />
                            <div className="h-1 bg-slate-200 rounded" />
                            <div className="h-1 bg-slate-200 rounded" />
                          </div>
                          <span className="text-[6px] text-slate-500 font-mono tracking-wider text-center">{block.text}</span>
                        </div>
                      ) : (
                        <p className={`leading-normal ${isHighlighted ? "text-slate-900 font-semibold" : "text-slate-600"} transition-colors duration-300`}>
                          {block.text}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status explanation */}
              <div className="mt-4 flex items-start gap-2 bg-slate-50 border border-slate-200/80 p-3 rounded-lg text-[10px] text-slate-500 leading-relaxed font-mono">
                <Info className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>
                  {highlightedBlock 
                    ? "CITATIONS ACTIVE: The emerald pulsing area represents the visual grounding citation generated by Gemini reasoning vectors."
                    : "OCR ACTIVE: EasyOCR character bounding coordinate mappings are active across the canvas structure."}
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: QA Chat Reasoning Console (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Top preset header panel */}
            <div className="bg-white/80 p-4 rounded-xl border border-slate-200/80 backdrop-blur-md flex items-center justify-between shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">Reasoning console</span>
              <span className="text-[10px] font-mono text-slate-400">ENGINE: GEMINI 1.5 PRO</span>
            </div>

            {/* Chat Log View */}
            <div className="glass-premium rounded-xl border border-slate-200/80 bg-white/70 p-5 flex flex-col h-[360px] sm:h-[430px] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-4">
                
                {/* Greeting */}
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0 text-violet-600">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs text-slate-600 max-w-[85%] leading-relaxed">
                    Hello! I have loaded the document **{currentDoc.name}** and mapped its absolute 2D visual layout. Ask me a question below or choose a preset query.
                  </div>
                </div>

                {/* Predefined Questions suggestions list */}
                {chatHistory.length === 0 && !processingStatus && (
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-brand-cyan" /> Suggested Inquiries
                    </span>
                    {currentDoc.questions.map((q) => (
                      <button
                        key={q.q}
                        onClick={() => handleAskQuestion(q.q, q.a, q.citationId, q.citationLabel)}
                        className="text-left text-xs bg-slate-50 hover:bg-cyan-50/30 border border-slate-200/80 hover:border-cyan-300 px-3 py-2.5 rounded-lg text-slate-700 hover:text-cyan-600 transition-all duration-300 flex items-center justify-between gap-3 group shadow-sm"
                      >
                        <span>{q.q}</span>
                        <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Question and Answer loop */}
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    {/* User Question */}
                    <div className="flex gap-2 self-end justify-end w-full">
                      <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-3 text-xs text-slate-800 max-w-[85%] font-medium">
                        {chat.q}
                      </div>
                    </div>

                    {/* AI Answer with grounding button */}
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs text-slate-600 max-w-[85%] leading-relaxed flex flex-col gap-3">
                        <span>{chat.a}</span>
                        
                        {/* Citation Badge */}
                        {chat.citationId && (
                          <button
                            onClick={() => setHighlightedBlock(chat.citationId || null)}
                            className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[9px] font-mono text-emerald-700 font-semibold transition-colors shadow-sm"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Verify Grounding: {chat.citationLabel}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Processing loaders */}
                <AnimatePresence>
                  {processingStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-2"
                    >
                      <div className="w-7 h-7 rounded bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 text-cyan-600">
                        <Cpu className="w-3.5 h-3.5 animate-spin" />
                      </div>
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs text-cyan-600 font-mono">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                          {processingStatus}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleCustomQuestionSubmit} className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Ask a question about the document structure..."
                  className="flex-grow bg-slate-50 border border-slate-200 focus:border-cyan-400 focus:bg-white px-3.5 py-2 rounded-lg text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                  id="chat-input"
                />
                <button
                  type="submit"
                  disabled={processingStatus !== null}
                  className="p-2.5 rounded-lg bg-cyan-50 hover:bg-cyan-500 text-cyan-600 hover:text-white border border-cyan-200 hover:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  id="chat-send-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
