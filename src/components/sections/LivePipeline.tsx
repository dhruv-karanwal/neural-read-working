"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Loader2, CheckCircle2, ChevronRight, File, Cpu, Search, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface PipelineNode {
  name: string;
  desc: string;
  icon: React.ReactNode;
  color: "cyan" | "violet" | "emerald";
  log: string;
}

const nodes: PipelineNode[] = [
  {
    name: "PDF Upload",
    desc: "Ingests layout-dense PDFs & scanned files",
    icon: <File className="w-5 h-5" />,
    color: "cyan",
    log: "INGESTION: Reading multi-page source, allocated page frames buffer."
  },
  {
    name: "OCR Scanner",
    desc: "Resolves absolute word-level coordinates",
    icon: <Cpu className="w-5 h-5 animate-pulse" />,
    color: "cyan",
    log: "OCR ENGINE: EasyOCR text boxes generated: [142 matching layout blocks resolved]."
  },
  {
    name: "Embeddings",
    desc: "Generates multi-modal 768-D spatial vectors",
    icon: <Search className="w-5 h-5" />,
    color: "violet",
    log: "EMBEDDINGS: Fusing spatial position coords with Sentence-CLIP token vectors."
  },
  {
    name: "Retrieval",
    desc: "RRF hybrid dense and sparse search",
    icon: <Search className="w-5 h-5" />,
    color: "violet",
    log: "RETRIEVAL: FAISS index cosine search matched. Reciprocal Rank Fusion output complete."
  },
  {
    name: "Gemini Synthesis",
    desc: "Validates queries against coordinate frames",
    icon: <Sparkles className="w-5 h-5 text-violet-400" />,
    color: "emerald",
    log: "REASONER: Google Gemini API synthesis complete. Citation coordinates resolved."
  },
  {
    name: "Grounded Answer",
    desc: "Synthesizes answer with absolute coordinate citation",
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: "emerald",
    log: "CITATOR: Bounding-box coordinate map drawn. Verified grounded answers dispatched."
  }
];

export default function LivePipeline() {
  const [status, setStatus] = useState<"idle" | "running" | "complete">("idle");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(["SYSTEM READY > Waiting for pipeline initialization..."]);

  const handleStart = () => {
    if (status === "running") return;
    setStatus("running");
    setActiveStep(0);
    setConsoleLogs(["SYSTEM ACTIVE > Starting document pipeline processing...", `[1/6] ${nodes[0].log}`]);
  };

  const handleReset = () => {
    setStatus("idle");
    setActiveStep(-1);
    setConsoleLogs(["SYSTEM READY > Waiting for pipeline initialization..."]);
  };

  useEffect(() => {
    if (status !== "running") return;
    if (activeStep >= nodes.length) {
      setStatus("complete");
      setConsoleLogs(prev => [...prev, "SYSTEM SUCCESS > Grounded machine reading process finished successfully!"]);
      return;
    }

    const timer = setTimeout(() => {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (nextStep < nodes.length) {
        setConsoleLogs(prev => [...prev, `[${nextStep + 1}/6] ${nodes[nextStep].log}`]);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [activeStep, status]);

  return (
    <section id="pipeline" className="relative py-24 bg-grid-faint z-10 scroll-mt-28 border-t border-slate-200/50">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-brand-violet/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
              Live Simulator
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Real-Time Processing Visualization
            </h3>
            <p className="text-slate-600 text-sm">
              Trigger the pipeline read script below to trace the visual path of a data packet flowing along our neural processing paths.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {status !== "running" && (
              <Button variant="cyan" onClick={handleStart} className="flex items-center gap-2 text-xs shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Initiate Pipeline Read</span>
              </Button>
            )}
            {status === "running" && (
              <Button variant="secondary" disabled className="flex items-center gap-2 text-xs opacity-50 cursor-not-allowed">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </Button>
            )}
            <Button variant="secondary" onClick={handleReset} className="flex items-center gap-2 text-xs">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          </div>
        </div>

        {/* Horizontal Pipeline Visualizer */}
        <div className="glass-premium rounded-2xl p-8 border border-slate-200/80 bg-white/70 overflow-x-auto min-w-full flex items-center justify-between gap-4 mb-10 select-none shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {nodes.map((node, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            
            let colorClasses = "border-slate-200/60 bg-slate-50/50 text-slate-400";
            if (isActive) {
              if (node.color === "cyan") colorClasses = "border-cyan-400 bg-cyan-50 text-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.15)]";
              else if (node.color === "violet") colorClasses = "border-violet-400 bg-violet-50 text-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.15)]";
              else colorClasses = "border-emerald-400 bg-emerald-50 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
            } else if (isCompleted) {
              if (node.color === "cyan") colorClasses = "border-cyan-200 bg-cyan-50/30 text-cyan-600/80";
              else if (node.color === "violet") colorClasses = "border-violet-200 bg-violet-50/30 text-violet-600/80";
              else colorClasses = "border-emerald-200 bg-emerald-50/30 text-emerald-600/80";
            }

            return (
              <React.Fragment key={node.name}>
                {/* Node Box */}
                <div className="flex flex-col items-center gap-3 w-40 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${colorClasses}`}>
                    {isActive ? <Loader2 className="w-5 h-5 animate-spin" /> : node.icon}
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">STEP 0{idx + 1}</span>
                    <h4 className={`text-xs font-bold transition-colors duration-500 ${isActive ? "text-slate-900" : "text-slate-700"}`}>{node.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-snug mt-1 max-w-[130px] mx-auto">{node.desc}</p>
                  </div>
                </div>

                {/* Connecting arrow with flowing light beam */}
                {idx < nodes.length - 1 && (
                  <div className="relative w-12 h-0.5 bg-slate-200 flex-shrink-0 flex items-center justify-center">
                    {/* Glowing particle transition */}
                    {isActive && (
                      <motion.span 
                         initial={{ left: 0 }}
                         animate={{ left: "100%" }}
                         transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                         className={`absolute w-3 h-[3px] rounded-full filter blur-[1px] ${
                           node.color === "cyan" ? "bg-cyan-500" : node.color === "violet" ? "bg-violet-500" : "bg-emerald-500"
                         }`} 
                      />
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 absolute -right-2 text-slate-300 ${
                      isCompleted ? "text-cyan-500/60" : ""
                    }`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Logs Terminal console */}
        <Card className="border-slate-800 bg-slate-950 p-5 shadow-2xl relative overflow-hidden" hoverEffect={false}>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 font-mono text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-400 font-semibold uppercase tracking-wider">PIPELINE MONITOR CONSOLE</span>
            </div>
            <span className="text-slate-600 font-mono">LOGGING STREAM : ACTIVE</span>
          </div>

          <div className="font-mono text-xs text-slate-300 flex flex-col gap-2 max-h-[140px] overflow-y-auto select-text leading-relaxed">
            {consoleLogs.map((log, idx) => (
              <div 
                key={idx} 
                className={`${
                  log.startsWith("SYSTEM READY") || log.startsWith("SYSTEM ACTIVE")
                    ? "text-cyan-400"
                    : log.startsWith("SYSTEM SUCCESS")
                    ? "text-emerald-400 font-bold"
                    : "text-slate-400"
                }`}
              >
                &gt; {log}
              </div>
            ))}
          </div>
        </Card>

      </div>
    </section>
  );
}
