"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  Layers, 
  Database, 
  Search, 
  Workflow, 
  Sparkles, 
  Terminal,
  Expand, 
  Minimize2, 
  Play, 
  Pause, 
  RefreshCw,
  Info,
  ChevronRight,
  ShieldCheck,
  Zap,
  BookOpen
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  NextjsIcon,
  FastapiIcon,
  SqliteIcon,
  HuggingFaceIcon,
  GeminiIcon,
  OpenCVIcon,
  EasyOcrIcon,
  LayoutLMv3Icon,
  ClipIcon,
  FaissIcon,
  Bm25Icon
} from "@/components/icons";

interface NodeSpec {
  id: string;
  label: string;
  subtitle: string;
  tech: string;
  specs: string;
  formula: string;
  libraries: string[];
  metrics: string;
  icon: React.ReactNode;
  zone: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ZoneSpec {
  id: string;
  label: string;
  color: "cyan" | "violet" | "teal" | "purple" | "indigo" | "blue" | "emerald";
  glowColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
  bgGrad: string;
  borderClass: string;
}

interface EdgeSpec {
  from: string;
  to: string;
  type: "horizontal" | "vertical" | "custom";
  customPath?: string;
  color: "cyan" | "violet" | "teal" | "purple" | "indigo" | "blue" | "emerald";
}

interface ZoneDetail {
  id: string;
  name: string;
  role: string;
  specs: string;
  formula: string;
  metrics: string;
  libraries: string[];
}

function FormulaRenderer({ formula }: { formula: string }) {
  const normalized = formula.replace(/\\\\/g, "\\").trim();

  const renderFraction = (num: React.ReactNode, den: React.ReactNode) => (
    <span className="inline-flex flex-col items-center align-middle mx-1.5 leading-none">
      <span className="text-slate-800 px-1 pb-1 font-semibold">{num}</span>
      <span className="w-full h-px bg-slate-300 self-stretch my-0.5" />
      <span className="text-slate-500 px-1 pt-1 text-[11px]">{den}</span>
    </span>
  );

  const vec = (char: string) => (
    <span className="inline-flex flex-col items-center leading-none relative align-middle mx-0.5">
      <span className="text-[7px] leading-none absolute -top-2.5 text-brand-cyan select-none">→</span>
      <span className="italic font-bold text-slate-800">{char}</span>
    </span>
  );

  if (normalized.includes("IoU_{Grounding} = \\frac{\\text{Area}(BB_{Pred} \\cap BB_{GT})}{\\text{Area}(BB_{Pred} \\cup BB_{GT})} \\ge 0.85") ||
      normalized.includes("IoU_{Grounding} = \\frac{|BB_{Pred} \\cap BB_{GT}|}{|BB_{Pred} \\cup BB_{GT}|}")) {
    const isAbs = normalized.includes("|BB");
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans tracking-wide text-slate-800">
        <span className="font-semibold text-brand-cyan">IoU</span>
        <sub className="text-[9px] text-slate-400 mt-1 font-mono tracking-tight">Grounding</sub>
        <span className="mx-2 text-slate-400">=</span>
        {isAbs ? (
          renderFraction(
            <span className="font-mono text-xs text-slate-700">|BB<sub>Pred</sub> ∩ BB<sub>GT</sub>|</span>,
            <span className="font-mono text-xs text-slate-700">|BB<sub>Pred</sub> ∪ BB<sub>GT</sub>|</span>
          )
        ) : (
          renderFraction(
            <span className="font-sans text-xs text-slate-700">Area(BB<sub>Pred</sub> ∩ BB<sub>GT</sub>)</span>,
            <span className="font-sans text-xs text-slate-700">Area(BB<sub>Pred</sub> ∪ BB<sub>GT</sub>)</span>
          )
        )}
        {!isAbs && (
          <>
            <span className="mx-2 text-brand-emerald font-semibold">≥</span>
            <span className="font-mono text-slate-900 font-semibold">0.85</span>
          </>
        )}
      </div>
    );
  }

  if (normalized.includes("T_{Load} = T_{TTFB} + T_{Hydration} < 850")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span>T</span><sub>Load</sub>
        <span className="mx-2 text-slate-400">=</span>
        <span>T</span><sub>TTFB</sub>
        <span className="mx-1 text-slate-400">+</span>
        <span>T</span><sub>Hydration</sub>
        <span className="mx-2 text-brand-cyan">&lt;</span>
        <span className="text-slate-900 font-bold">850ms</span>
      </div>
    );
  }

  if (normalized.includes("\\lambda_{\\text{throughput}} > 1400")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="text-brand-violet text-sm font-sans font-bold">λ</span>
        <sub className="text-slate-500">throughput</sub>
        <span className="mx-2 text-slate-400">&gt;</span>
        <span className="text-slate-900 font-bold">1400 req/sec</span>
      </div>
    );
  }

  if (normalized.includes("I'(x,y) = \\text{AffineRot}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span>I&apos;(x,y)</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-teal font-sans font-bold">AffineRot</span>
        <span className="text-slate-600 font-sans">(I(x,y), θ<sub>skew</sub>)</span>
      </div>
    );
  }

  if (normalized.includes("P(\\mathbf{w} \\mid \\mathbf{x}) = \\prod_{t}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span>P(w | x)</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-teal text-base font-sans font-semibold align-middle">∏</span>
        <sub className="text-slate-500 mr-1">t</sub>
        <span>y</span><sub className="text-slate-500">π<sub>t</sub></sub><sup>t</sup>
        <span className="ml-4 px-2 py-0.5 text-[9px] bg-brand-teal/10 border border-brand-teal/20 text-brand-teal font-sans rounded uppercase font-semibold">CTC Loss</span>
      </div>
    );
  }

  if (normalized.includes("\\text{IoU}_{Seg} = \\frac{Area_{Overlap}}{Area_{Union}}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans text-slate-800">
        <span className="font-semibold text-brand-teal">IoU</span>
        <sub className="text-[9px] text-slate-400">Seg</sub>
        <span className="mx-2 text-slate-400">=</span>
        {renderFraction(
          <span>Area<sub>Overlap</sub></span>,
          <span>Area<sub>Union</sub></span>
        )}
        <span className="mx-2 text-brand-teal font-semibold">&gt;</span>
        <span className="font-mono text-slate-900 font-bold">91.2%</span>
      </div>
    );
  }

  if (normalized.includes("\\mathcal{L}_{VTM} + \\mathcal{L}_{MIM} + \\mathcal{L}_{MLM}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-serif tracking-widest text-slate-800 italic font-bold">
        <span className="text-brand-violet text-sm">ℒ</span><sub className="font-sans font-normal text-[9px] text-slate-400">VTM</sub>
        <span className="mx-2 text-slate-300 font-sans font-normal">+</span>
        <span className="text-brand-violet text-sm">ℒ</span><sub className="font-sans font-normal text-[9px] text-slate-400">MIM</sub>
        <span className="mx-2 text-slate-300 font-sans font-normal">+</span>
        <span className="text-brand-violet text-sm">ℒ</span><sub className="font-sans font-normal text-[9px] text-slate-400">MLM</sub>
      </div>
    );
  }

  if (normalized.includes("S(v, t) = \\frac{\\vec{v} \\cdot \\vec{t}}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans text-slate-800">
        <span>S(v, t)</span>
        <span className="mx-2 text-slate-400">=</span>
        {renderFraction(
          <span className="inline-flex items-center gap-1">{vec("v")} · {vec("t")}</span>,
          <span className="inline-flex items-center">||{vec("v")}|| ||{vec("t")}||</span>
        )}
        <span className="ml-4 px-2 py-0.5 text-[9px] bg-brand-violet/10 border border-brand-violet/20 text-brand-violet rounded uppercase font-semibold">Cosine Match</span>
      </div>
    );
  }

  if (normalized.includes("\\mathbf{e}_{fused} = \\text{LayerNorm}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans text-slate-800">
        {vec("e")}<sub className="text-slate-400">fused</sub>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-violet font-bold font-sans">LayerNorm</span>
        <span className="text-slate-600 font-mono">(W<sub>e</sub> [{vec("t")}; {vec("pos")}])</span>
      </div>
    );
  }

  if (normalized.includes("\\text{SQL Schema} \\leftrightarrow")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-700 tracking-wide">
        <span className="text-blue-600 font-sans font-bold">SQL Schema</span>
        <span className="mx-3 text-slate-400">↔</span>
        <span className="text-slate-600 font-sans">JSON Coordinates</span>
      </div>
    );
  }

  if (normalized.includes("\\text{IndexIVFFlat} \\leftrightarrow")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-700 tracking-wide">
        <span className="text-blue-600 font-sans font-bold">IndexIVFFlat</span>
        <span className="mx-3 text-slate-400">↔</span>
        <span className="text-slate-600 font-sans font-bold">HNSW Index</span>
      </div>
    );
  }

  if (normalized.includes("\\text{FilesIO} \\leftrightarrow")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-700 tracking-wide">
        <span className="text-blue-600 font-sans font-bold">Files I/O</span>
        <span className="mx-3 text-slate-400">↔</span>
        <span className="text-slate-600 font-sans">S3 / Cloud Assets</span>
      </div>
    );
  }

  if (normalized.includes("\\text{score}(D, Q) = \\sum")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="font-sans">score(D, Q)</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-violet text-lg font-semibold align-middle">∑</span>
        <sub className="text-slate-500 mr-1.5 leading-none">q<sub>i</sub> ∈ Q</sub>
        <span className="font-sans font-semibold text-brand-violet">IDF</span>
        <span>(q<sub>i</sub>) · Φ(q<sub>i</sub>, D)</span>
      </div>
    );
  }

  if (normalized.includes("\\vec{q} \\cdot \\vec{d} \\ge")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans text-slate-800">
        <span className="inline-flex items-center">{vec("q")} · {vec("d")}</span>
        <span className="mx-2 text-brand-violet font-semibold">≥</span>
        <span className="font-mono">τ<sub>sim</sub></span>
        <span className="ml-4 px-2 py-0.5 text-[9px] bg-brand-violet/10 border border-brand-violet/20 text-brand-violet rounded uppercase font-semibold">K-NN Search</span>
      </div>
    );
  }

  if (normalized.includes("Score(Q, D) = \\sigma")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="font-sans">Score(Q, D)</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-violet font-bold font-sans">σ</span>
        <span className="text-slate-600 font-sans">(W · BERT<sub>CLS</sub>(Q, D))</span>
      </div>
    );
  }

  if (normalized.includes("\\arg\\max_{\\mathbf{y}}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="text-brand-emerald font-bold font-sans">argmax</span>
        <sub className="text-slate-500 mr-1.5">y</sub>
        <span className="font-sans font-semibold">P(y | x<sub>query</sub>, C<sub>grounded</sub>)</span>
      </div>
    );
  }

  if (normalized.includes("\\text{Valid} = \\mathbb{I}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="font-sans font-bold text-brand-emerald">Valid</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-emerald font-bold font-sans">𝕀</span>
        <span className="text-slate-600 font-sans">(Overlap(Anchor<sub>LLM</sub>, Segment<sub>source</sub>) &gt; 0.90)</span>
      </div>
    );
  }

  if (normalized.includes("\\text{Valid} = \\mathbb{I}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="font-sans font-bold text-brand-emerald">Valid</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-emerald font-bold font-sans">𝕀</span>
        <span className="text-slate-600 font-sans">(Overlap(Anchor<sub>LLM</sub>, Segment<sub>source</sub>) &gt; 0.90)</span>
      </div>
    );
  }

  if (normalized.includes("\\text{Render}(Highlight")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans text-slate-800">
        <span className="font-bold text-brand-cyan">Render</span>
        <span className="text-slate-600 font-sans">(Highlight<sub>verified</sub>, UI)</span>
      </div>
    );
  }

  if (normalized.includes("R_{\\text{concurrency}} = \\mathcal{O}(\\log N)")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span>R</span><sub>concurrency</sub>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-violet text-sm">𝒪</span><span>(log N)</span>
        <span className="ml-4 px-2 py-0.5 text-[9px] bg-brand-violet/10 border border-brand-violet/20 text-brand-violet rounded uppercase font-semibold">event-loop</span>
      </div>
    );
  }

  if (normalized.includes("I^{\\text{restored}} = \\text{GaussianFilter}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span>I</span><sup>restored</sup>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-teal font-sans">GaussianFilter(I, σ)</span>
        <span className="mx-1 text-slate-400">*</span>
        <span className="text-brand-teal font-sans">AffineSkew(θ)</span>
      </div>
    );
  }

  if (normalized.includes("\\vec{e}_{fused} = W_{text}\\vec{e}_{text}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-sans text-slate-800">
        {vec("e")}<sub className="text-slate-500">fused</sub>
        <span className="mx-2 text-slate-400">=</span>
        <span>W<sub>text</sub></span>{vec("e")}<sub className="text-slate-500">text</sub>
        <span className="mx-1.5 text-slate-300">+</span>
        <span>W<sub>space</sub></span>{vec("e")}<sub className="text-slate-500">space</sub>
        <span className="mx-1.5 text-slate-300">+</span>
        <span>W<sub>vis</sub></span>{vec("e")}<sub className="text-slate-500">vis</sub>
      </div>
    );
  }

  if (normalized.includes("\\text{Database} \\leftrightarrow \\text{FAISS}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-700 tracking-wide">
        <span className="text-blue-600 font-sans font-bold">SQL Database</span>
        <span className="mx-2 text-slate-400">↔</span>
        <span className="text-brand-violet font-sans font-bold">FAISS Index</span>
        <span className="mx-2 text-slate-400">↔</span>
        <span className="text-slate-600 font-sans">S3 Cache</span>
      </div>
    );
  }

  if (normalized.includes("RRF(d) = \\frac{1}{r_{dense}(d)")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="font-sans">RRF(d)</span>
        <span className="mx-2 text-slate-400">=</span>
        {renderFraction(
          <span className="font-mono text-xs">1</span>,
          <span className="font-sans text-[10px]">r<sub>dense</sub>(d) + 60</span>
        )}
        <span className="mx-2 text-slate-300 font-sans">+</span>
        {renderFraction(
          <span className="font-mono text-xs">1</span>,
          <span className="font-sans text-[10px]">r<sub>sparse</sub>(d) + 60</span>
        )}
      </div>
    );
  }

  if (normalized.includes("\\text{GroundedAnswer} = \\mathcal{G}")) {
    return (
      <div className="inline-flex items-center text-xs sm:text-sm font-mono text-slate-800">
        <span className="font-sans font-bold text-brand-emerald">GroundedAnswer</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="text-brand-emerald text-sm font-serif">𝒢</span>
        <span className="text-slate-600 font-sans text-xs">(GeminiResponse, Citations, IoUFilter)</span>
      </div>
    );
  }

  return (
    <div className="font-mono text-[11px] text-slate-600 py-0.5 tracking-wide leading-relaxed truncate px-2 select-text max-w-full text-center">
      {formula}
    </div>
  );
}

export default function Architecture() {
  const [selectedNode, setSelectedNode] = useState<string>("user");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [zoomMode, setZoomMode] = useState<boolean>(false);
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false);
  const [flowStep, setFlowStep] = useState<number>(-1);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Auto-play flow controller
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingFlow) {
      setFlowStep(0);
      interval = setInterval(() => {
        setFlowStep((prev) => {
          if (prev >= 7) return 0;
          return prev + 1;
        });
      }, 2000);
    } else {
      setFlowStep(-1);
    }
    return () => clearInterval(interval);
  }, [isPlayingFlow]);

  // Sync selected node with flow step
  useEffect(() => {
    if (flowStep === 0) setSelectedNode("user");
    else if (flowStep === 1) setSelectedNode("fastapi");
    else if (flowStep === 2) setSelectedNode("opencv");
    else if (flowStep === 3) setSelectedNode("layoutlmv3");
    else if (flowStep === 4) setSelectedNode("faiss_search");
    else if (flowStep === 5) setSelectedNode("faiss_db");
    else if (flowStep === 6) setSelectedNode("gemini");
    else if (flowStep === 7) setSelectedNode("response");
  }, [flowStep]);

  const zones: ZoneSpec[] = [
    {
      id: "frontend",
      label: "1. Presentation Layer",
      color: "cyan",
      glowColor: "rgba(6, 182, 212, 0.08)",
      x: 15, y: 15, width: 240, height: 755,
      bgGrad: "from-cyan-500/5 to-transparent",
      borderClass: "border-cyan-500/20 group-hover:border-cyan-500/40"
    },
    {
      id: "gateway",
      label: "2. Gateway Layer",
      color: "violet",
      glowColor: "rgba(139, 92, 246, 0.08)",
      x: 265, y: 15, width: 240, height: 385,
      bgGrad: "from-violet-500/5 to-transparent",
      borderClass: "border-violet-500/20 group-hover:border-violet-500/40"
    },
    {
      id: "processing",
      label: "3. Document Processing Layer",
      color: "teal",
      glowColor: "rgba(20, 184, 166, 0.08)",
      x: 515, y: 15, width: 240, height: 385,
      bgGrad: "from-teal-500/5 to-transparent",
      borderClass: "border-teal-500/20 group-hover:border-teal-500/40"
    },
    {
      id: "understanding",
      label: "4. AI Understanding Layer",
      color: "purple",
      glowColor: "rgba(168, 85, 247, 0.08)",
      x: 765, y: 15, width: 240, height: 385,
      bgGrad: "from-purple-500/5 to-transparent",
      borderClass: "border-purple-500/20 group-hover:border-purple-500/40"
    },
    {
      id: "storage",
      label: "6. Storage Architecture Layer",
      color: "blue",
      glowColor: "rgba(59, 130, 246, 0.08)",
      x: 515, y: 415, width: 790, height: 120,
      bgGrad: "from-blue-500/5 to-transparent",
      borderClass: "border-blue-500/20 group-hover:border-blue-500/40"
    },
    {
      id: "retrieval",
      label: "5. Hybrid Retrieval Layer",
      color: "indigo",
      glowColor: "rgba(99, 102, 241, 0.08)",
      x: 1015, y: 15, width: 290, height: 385,
      bgGrad: "from-indigo-500/5 to-transparent",
      borderClass: "border-indigo-500/20 group-hover:border-indigo-500/40"
    },
    {
      id: "llm",
      label: "7. LLM Reasoning & Grounding Layer",
      color: "emerald",
      glowColor: "rgba(16, 185, 129, 0.08)",
      x: 1015, y: 550, width: 290, height: 220,
      bgGrad: "from-emerald-500/5 to-transparent",
      borderClass: "border-emerald-500/20 group-hover:border-emerald-500/40"
    }
  ];

  const nodes: NodeSpec[] = [
    // Zone 1: Frontend & Client Layer
    {
      id: "user",
      label: "User Portal UI",
      subtitle: "Web Interface & Input Gate",
      tech: "React Client",
      specs: "Coordinates file uploads (invoices, research papers) and user queries. Maps interactive coordinate bounding boxes onto responsive canvas canvases with high precision.",
      formula: "IoU_{Grounding} = \\frac{\\text{Area}(BB_{Pred} \\cap BB_{GT})}{\\text{Area}(BB_{Pred} \\cup BB_{GT})} \\ge 0.85",
      libraries: ["React Context API", "Lucide Icons", "canvas-confetti"],
      metrics: "Rendering Speed: ~60 FPS",
      icon: <Laptop className="w-5 h-5 text-cyan-500" />,
      zone: "frontend",
      x: 30, y: 70, width: 210, height: 75
    },
    {
      id: "nextjs",
      label: "Next.js Presentation",
      subtitle: "Routing & Client Engine",
      tech: "Next.js 14 + TS",
      specs: "Handles server-side rendering (SSR), dynamic edge page distributions, and client-side coordinate adjustments. Integrates Framer Motion visual timelines.",
      formula: "T_{Load} = T_{TTFB} + T_{Hydration} < 850\\text{ms}",
      libraries: ["Next.js App Router", "Tailwind CSS", "Framer Motion"],
      metrics: "Edge hydrations: <15ms",
      icon: <NextjsIcon />,
      zone: "frontend",
      x: 30, y: 220, width: 210, height: 75
    },
    // Zone 2: Gateway Layer
    {
      id: "fastapi",
      label: "FastAPI REST API",
      subtitle: "Async Gateway Routing",
      tech: "FastAPI + Python",
      specs: "Exposes secure asynchronous endpoints, coordinates files processing pipelines, structures response formats, and handles streaming Server-Sent Events (SSE).",
      formula: "\\lambda_{\\text{throughput}} > 1400\\text{ req/sec}",
      libraries: ["FastAPI Framework", "Uvicorn Concurrency", "Pydantic", "PyJWT"],
      metrics: "Internal Latency: <12ms",
      icon: <FastapiIcon />,
      zone: "gateway",
      x: 280, y: 220, width: 210, height: 75
    },
    // Zone 3: Document Processing Layer
    {
      id: "opencv",
      label: "OpenCV Enhancer",
      subtitle: "Bilateral Filters & Deskew",
      tech: "Python OpenCV",
      specs: "Detects document rotation angles, applies high-contrast Gaussian thresholds, and filters noise while maintaining paper boundary edges.",
      formula: "I'(x,y) = \\text{AffineRot}(I(x,y), \\theta_{skew})",
      libraries: ["OpenCV-Python", "NumPy Core", "SciPy NDImage"],
      metrics: "Skew error: \\pm 0.04^{\\circ}",
      icon: <OpenCVIcon />,
      zone: "processing",
      x: 530, y: 70, width: 210, height: 75
    },
    {
      id: "easyocr",
      label: "EasyOCR OCR Engine",
      subtitle: "Character Coordinates",
      tech: "CRNN + PyTorch",
      specs: "Detects text regions, feeds sequences to Bidirectional LSTM decoder, and calculates spatial bounding boxes.",
      formula: "P(\\mathbf{w} \\mid \\mathbf{x}) = \\prod_{t} y_{\\pi_t}^t \\quad \\text{CTC Loss}",
      libraries: ["EasyOCR", "PyTorch ML Library", "CUDA Accelerations"],
      metrics: "Character recall: 98.4%",
      icon: <EasyOcrIcon />,
      zone: "processing",
      x: 530, y: 180, width: 210, height: 75
    },
    {
      id: "layoutparser",
      label: "LayoutParser Core",
      subtitle: "Region Segmentation",
      tech: "Detectron2 Deep Models",
      specs: "Applies mask-level visual segmentation over the document. Identifies text columns, charts, floating figures, tables, and footers.",
      formula: "\\text{IoU}_{Seg} = \\frac{Area_{Overlap}}{Area_{Union}} > 91.2\\%",
      libraries: ["LayoutParser", "Detectron2 PyTorch", "PubLayNet model"],
      metrics: "Layout F1 Score: 94.6%",
      icon: <Layers className="w-5 h-5 text-teal-500" />,
      zone: "processing",
      x: 530, y: 290, width: 210, height: 75
    },
    // Zone 4: AI Understanding Layer
    {
      id: "layoutlmv3",
      label: "LayoutLMv3",
      subtitle: "Spatial-Text Model",
      tech: "Multi-Modal Transformer",
      specs: "Integrates visual page layouts, text block locations, and character sequences in a multi-modal pre-trained Transformer architecture.",
      formula: "\\mathcal{L}_{VTM} + \\mathcal{L}_{MIM} + \\mathcal{L}_{MLM}",
      libraries: ["Transformers API", "HuggingFace Hub", "PyTorch Inference"],
      metrics: "Semantic accuracy: 96.8%",
      icon: <LayoutLMv3Icon />,
      zone: "understanding",
      x: 780, y: 70, width: 210, height: 75
    },
    {
      id: "clip",
      label: "CLIP Visual Alignment",
      subtitle: "Figure Semantic Vectorizer",
      tech: "ViT-B/32 CLIP Model",
      specs: "Aligns structural document figures and charts with accompanying descriptive texts in a unified high-dimensional visual-linguistic space.",
      formula: "S(v, t) = \\frac{\\vec{v} \\cdot \\vec{t}}{\\|\\vec{v}\\| \\|\\vec{t}\\|} \\quad \\text{Cosine Match}",
      libraries: ["OpenCLIP Library", "Sentence-Transformers", "PyTorch"],
      metrics: "Zero-shot accuracy: 90.1%",
      icon: <ClipIcon />,
      zone: "understanding",
      x: 780, y: 180, width: 210, height: 75
    },
    {
      id: "embeddings",
      label: "Embedding Generator",
      subtitle: "768-D Positional Fusion",
      tech: "Dense Embedder",
      specs: "Encodes dense layout coordinate vectors, structural metadata, and parsed texts into rich 768-dimensional document embedding vectors.",
      formula: "\\mathbf{e}_{fused} = \\text{LayerNorm}(\\mathbf{W}_e [\\vec{t}; \\vec{pos}])",
      libraries: ["Sentence-Transformers", "HuggingFace Hub", "Torch Embeddings"],
      metrics: "Dims: 768, Encoding: <14ms",
      icon: <HuggingFaceIcon />,
      zone: "understanding",
      x: 780, y: 290, width: 210, height: 75
    },
    // Zone 5: Storage Layer
    {
      id: "postgres",
      label: "PostgreSQL & Metadata",
      subtitle: "Structured DB Indices",
      tech: "SQLite / Postgres",
      specs: "Stores document processing history, relational schemas, user account indices, file metadata, and coordinate layouts.",
      formula: "\\text{SQL Schema} \\leftrightarrow \\text{JSON Coordinates}",
      libraries: ["PostgreSQL / SQLite", "SQLAlchemy ORM", "Alembic migrations"],
      metrics: "Metadata lookup: <2ms",
      icon: <SqliteIcon />,
      zone: "storage",
      x: 530, y: 440, width: 210, height: 75
    },
    {
      id: "faiss_db",
      label: "FAISS Vector DB",
      subtitle: "Index Binaries Storage",
      tech: "FAISS Indexes",
      specs: "Manages fast search indices built on disk. Persists dense multi-layer spatial-text embeddings for sub-millisecond retrieval loops.",
      formula: "\\text{IndexIVFFlat} \\leftrightarrow HNSW",
      libraries: ["FAISS DB Binaries", "NumPy Indexes", "Disk Caches"],
      metrics: "Vector loading: <5ms",
      icon: <FaissIcon />,
      zone: "storage",
      x: 780, y: 440, width: 210, height: 75
    },
    {
      id: "filestore",
      label: "File Storage Cache",
      subtitle: "S3 & Local PDF Cache",
      tech: "Binary File Storage",
      specs: "Stores raw PDF paper uploads, high-resolution visual layout slices, page previews, and dynamic page thumbnails.",
      formula: "\\text{FilesIO} \\leftrightarrow \\text{S3 / Cloud Assets}",
      libraries: ["Aiofiles", "Boto3 AWS Client", "Local Cache Directory"],
      metrics: "I/O Latency: <8ms",
      icon: <Database className="w-5 h-5 text-indigo-500" />,
      zone: "storage",
      x: 1030, y: 440, width: 210, height: 75
    },
    // Zone 6: Retrieval Layer
    {
      id: "bm25",
      label: "Rank-BM25 Sparse",
      subtitle: "Sparse Term Search",
      tech: "BM25 Text Search",
      specs: "Performs term-matching search on text strings, analyzing word frequencies, inverse document frequencies, and document lengths.",
      formula: "\\text{score}(D, Q) = \\sum_{q_i \\in Q} \\text{IDF}(q_i) \\cdot \\Phi(q_i, D)",
      libraries: ["rank-bm25", "NLTK Word Segmenter"],
      metrics: "Lexical recall: 92.5%",
      icon: <Bm25Icon />,
      zone: "retrieval",
      x: 1055, y: 70, width: 210, height: 75
    },
    {
      id: "faiss_search",
      label: "FAISS Similarity Search",
      subtitle: "Dense Coordinate Match",
      tech: "FAISS KNN Inner Product",
      specs: "Applies fast Inner Product vector distance searches across FAISS dense layout vector collections to resolve semantic intents.",
      formula: "\\vec{q} \\cdot \\vec{d} \\ge \\tau_{sim} \\quad \\text{(K-NN Close Search)}",
      libraries: ["FAISS-CPU Core", "NumPy Vector Algebra"],
      metrics: "Search lookup: <8ms",
      icon: <Search className="w-5 h-5 text-indigo-500" />,
      zone: "retrieval",
      x: 1055, y: 180, width: 210, height: 75
    },
    {
      id: "reranker",
      label: "Cross-Encoder Reranker",
      subtitle: "Deep Attention Alignment",
      tech: "Transformer Context Core",
      specs: "Calculates precise cross-attention matrix scores between the query string and retrieved document blocks, filtering top semantic hits.",
      formula: "Score(Q, D) = \\sigma(\\mathbf{W} \\cdot \\text{BERT}_{CLS}(Q, D))",
      libraries: ["Sentence-Transformers", "HuggingFace Models"],
      metrics: "Top-K Accuracy Reranking: 96.5%",
      icon: <Workflow className="w-5 h-5 text-indigo-500" />,
      zone: "retrieval",
      x: 1055, y: 290, width: 210, height: 75
    },
    // Zone 7: LLM & Grounding Layer
    {
      id: "gemini",
      label: "Gemini 2.5 Flash",
      subtitle: "Multimodal Synthesis Core",
      tech: "Google Gemini 2.5 Studio API",
      specs: "Generates factually grounded answers using retrieved dense segments, layouts, and image assets. Follows strict structured JSON schemas.",
      formula: "\\arg\\max_{\\mathbf{y}} P(\\mathbf{y} \\mid \\mathbf{x}_{query}, \\mathbf{C}_{grounded})",
      libraries: ["Google GenAI SDK", "Pydantic Models", "API Studio Connection"],
      metrics: "Grounding Precision: 99.8%",
      icon: <GeminiIcon />,
      zone: "llm",
      x: 1055, y: 570, width: 210, height: 75
    },
    {
      id: "grounding",
      label: "Grounded Synthesizer",
      subtitle: "Bounding Boxes Citation Gate",
      tech: "Spatial Citation Filter",
      specs: "Cross-references LLM reasoning outputs with absolute coordinate mapping indexes to draw high-fidelity verified citations overlay tags.",
      formula: "\\text{Valid} = \\mathbb{I}(\\text{Overlap}(Anchor_{\\text{LLM}}, Segment_{\\text{source}}) > 0.90)",
      libraries: ["NumPy Overlap Math", "Coordinate Validator Pipeline"],
      metrics: "Verified precision: 100%",
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      zone: "llm",
      x: 1055, y: 675, width: 210, height: 75
    },
    {
      id: "response",
      label: "Grounded UI Response",
      subtitle: "Visual Output Canvas",
      tech: "Interactive Canvas Overlay",
      specs: "Delivers the verified grounded answers back to the User UI. Renders highlights directly over the original document layout image.",
      formula: "\\text{Render}(Highlight_{\\text{verified}}, \\text{UI})",
      libraries: ["HTML5 Canvas Context", "Coordinate Scale Mapper"],
      metrics: "Latency: <1.8s (End-to-End)",
      icon: <Terminal className="w-5 h-5 text-emerald-500" />,
      zone: "llm",
      x: 30, y: 675, width: 210, height: 75
    }
  ];

  const edges: EdgeSpec[] = [
    // Zone 1 & 2: Frontend to Gateway
    { from: "user", to: "nextjs", type: "vertical", color: "cyan" },
    { from: "nextjs", to: "fastapi", type: "horizontal", color: "cyan" },

    // Zone 2 to 3: API Gateway to Processing
    { from: "fastapi", to: "opencv", type: "custom", color: "violet",
      customPath: "M 490 257.5 C 510 257.5, 500 107.5, 530 107.5"
    },
    { from: "fastapi", to: "easyocr", type: "custom", color: "violet",
      customPath: "M 490 257.5 C 510 257.5, 500 217.5, 530 217.5"
    },
    { from: "fastapi", to: "layoutparser", type: "custom", color: "violet",
      customPath: "M 490 257.5 C 510 257.5, 500 327.5, 530 327.5"
    },

    // Zone 3 to 4: Processing to AI Understanding
    { from: "opencv", to: "layoutlmv3", type: "horizontal", color: "teal" },
    { from: "easyocr", to: "embeddings", type: "custom", color: "teal",
      customPath: "M 740 217.5 C 760 217.5, 750 327.5, 780 327.5"
    },
    { from: "layoutparser", to: "layoutlmv3", type: "custom", color: "teal",
      customPath: "M 740 327.5 C 760 327.5, 750 107.5, 780 107.5"
    },
    { from: "layoutlmv3", to: "embeddings", type: "vertical", color: "purple" },
    { from: "clip", to: "embeddings", type: "vertical", color: "purple" },

    // Zone 3 & 4 to Storage Layer
    { from: "easyocr", to: "postgres", type: "vertical", color: "blue" },
    { from: "embeddings", to: "faiss_db", type: "vertical", color: "blue" },
    { from: "fastapi", to: "filestore", type: "custom", color: "blue",
      customPath: "M 385 295 C 385 410, 1135 410, 1135 440"
    },

    // Zone 4 to 6: Embeddings to Retrieval Layer
    { from: "embeddings", to: "faiss_search", type: "custom", color: "indigo",
      customPath: "M 990 327.5 C 1020 327.5, 1025 217.5, 1055 217.5"
    },
    { from: "fastapi", to: "bm25", type: "custom", color: "indigo",
      customPath: "M 490 257.5 C 520 257.5, 1020 107.5, 1055 107.5"
    },

    // Zone 6: Search retrieval items to Reranker
    { from: "bm25", to: "reranker", type: "custom", color: "indigo",
      customPath: "M 1265 107.5 C 1300 107.5, 1300 327.5, 1265 327.5"
    },
    { from: "faiss_search", to: "reranker", type: "custom", color: "indigo",
      customPath: "M 1265 217.5 C 1285 217.5, 1285 327.5, 1265 327.5"
    },

    // Zone 6 to LLM
    { from: "reranker", to: "gemini", type: "custom", color: "indigo",
      customPath: "M 1160 365 C 1160 460, 1160 470, 1160 570"
    },

    // LLM Layer
    { from: "gemini", to: "grounding", type: "vertical", color: "emerald" },
    { from: "grounding", to: "response", type: "custom", color: "emerald",
      customPath: "M 1055 712.5 L 240 712.5"
    },
    { from: "response", to: "nextjs", type: "custom", color: "cyan",
      customPath: "M 135 675 L 135 295"
    }
  ];

  const zoneDetails: Record<string, ZoneDetail> = {
    frontend: {
      id: "frontend",
      name: "Presentation & Client Layer",
      role: "User Interaction & Visually Grounded Output Rendering",
      specs: "A next-generation user portal built with Next.js 14, React, and TypeScript. It features a responsive document view, spatial annotation canvas layers, and real-time bounding box renders to ground the LLM's responses visually inside source documents.",
      formula: "IoU_{Grounding} = \\frac{|BB_{Pred} \\cap BB_{GT}|}{|BB_{Pred} \\cup BB_{GT}|}",
      metrics: "Rendering Speed: ~60 FPS, Client Bundle Size: <85KB",
      libraries: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    gateway: {
      id: "gateway",
      name: "Gateway & Edge Layer",
      role: "Secure Edge Routing & Request Orchestration",
      specs: "Coordinates asynchronous operations, processes high-concurrency multi-part uploads, and formats system outputs. Connects Edge hosting with local Docker containerized servers.",
      formula: "R_{\\text{concurrency}} = \\mathcal{O}(\\log N) \\quad \\text{event-loop queue}",
      metrics: "Gateway Latency: <12ms, Concurrent connections: 50,000+",
      libraries: ["FastAPI", "Uvicorn", "Starlette", "Pydantic", "PyJWT"]
    },
    processing: {
      id: "processing",
      name: "Document Processing Pipeline",
      role: "Bilateral Image Filters & Structural Layout Segmentation",
      specs: "Performs low-level image operations (noise reduction, bilateral sharpening, deskewing) and OCR word-level spatial bounding box segmentation before downstream ML tokenization.",
      formula: "I^{\\text{restored}} = \\text{GaussianFilter}(I, \\sigma) * \\text{AffineSkew}(\\theta)",
      metrics: "OCR Recall: 98.4%, Skew Precision: \\pm0.02^{\\circ}",
      libraries: ["OpenCV-Python", "EasyOCR", "Tesseract Engine", "LayoutParser"]
    },
    understanding: {
      id: "understanding",
      name: "Multimodal AI Understanding",
      role: "Visual-Text Semantic Embedding & Coordinate Token Fusion",
      specs: "Integrates visual layouts, semantic textual elements, and spatial boundaries using advanced Transformers and CLIP models, projecting files into a 768-D multi-modal embedding space.",
      formula: "\\vec{e}_{fused} = W_{text}\\vec{e}_{text} + W_{space}\\vec{e}_{space} + W_{vis}\\vec{e}_{vis}",
      metrics: "Model F1 Score: 95.1%, Vector Size: 768 Dimensions",
      libraries: ["LayoutLMv3", "HuggingFace Transformers", "OpenCLIP", "Sentence-Transformers"]
    },
    storage: {
      id: "storage",
      name: "Storage & Persistence Layer",
      role: "Persistent Metadata & High-Dimensional Vector Caches",
      specs: "Handles database persistence for relational schemas, indexes dense FAISS vector binaries, and caches raw document slices/thumbnails to ensure zero redundant processing.",
      formula: "\\text{Database} \\leftrightarrow \\text{FAISS FlatIndex} \\leftrightarrow \\text{S3 Asset Buckets}",
      metrics: "Metadata lookup: <2ms, Vector load time: <5ms",
      libraries: ["PostgreSQL", "SQLite", "FAISS Binaries", "Boto3 Cache"]
    },
    retrieval: {
      id: "retrieval",
      name: "Hybrid Retrieval Engine",
      role: "Lexical & Vector Similarity Multi-Index Retrieval",
      specs: "Applies dual-index hybrid matching (Rank-BM25 sparse search and FAISS K-NN dense vector search), feeding results to a Cross-Encoder Reranker to filter precise textual contexts.",
      formula: "RRF(d) = \\frac{1}{r_{dense}(d) + 60} + \\frac{1}{r_{sparse}(d) + 60}",
      metrics: "Hybrid search latency: <18ms, Recall rate: 96.5%",
      libraries: ["FAISS Index", "Rank-BM25", "SentenceTransformers Reranker"]
    },
    llm: {
      id: "llm",
      name: "Grounded LLM & Grounding Layer",
      role: "Context-Grounded Multimodal Answer Synthesis",
      specs: "Feeds precise grounded document contexts to Google Gemini 2.5 Flash, parses structured output JSON schemas, and cross-references citation anchors with bounding boxes to ensure absolute factual validity.",
      formula: "\\text{GroundedAnswer} = \\mathcal{G}(\\text{GeminiResponse}, \\text{CitationSchema}, \\text{IoUFilter})",
      metrics: "Citation accuracy: 100%, Grounding precision: 99.8%",
      libraries: ["Google GenAI SDK", "Pydantic Validator", "NumPy Spatial Overlaps"]
    }
  };

  const getEdgePath = (edge: EdgeSpec) => {
    if (edge.customPath) return edge.customPath;

    const fromNode = nodes.find((n) => n.id === edge.from);
    const toNode = nodes.find((n) => n.id === edge.to);

    if (!fromNode || !toNode) return "";

    if (edge.type === "horizontal") {
      const xStart = fromNode.x + fromNode.width;
      const yStart = fromNode.y + fromNode.height / 2;
      const xEnd = toNode.x;
      const yEnd = toNode.y + toNode.height / 2;
      const dx = Math.abs(xEnd - xStart) / 2;
      return `M ${xStart} ${yStart} C ${xStart + dx} ${yStart}, ${xEnd - dx} ${yEnd}, ${xEnd} ${yEnd}`;
    }

    if (edge.type === "vertical") {
      if (fromNode.y < toNode.y) {
        const xStart = fromNode.x + fromNode.width / 2;
        const yStart = fromNode.y + fromNode.height;
        const xEnd = toNode.x + toNode.width / 2;
        const yEnd = toNode.y;
        const dy = Math.abs(yEnd - yStart) / 2;
        return `M ${xStart} ${yStart} C ${xStart} ${yStart + dy}, ${xEnd} ${yEnd - dy}, ${xEnd} ${yEnd}`;
      } else {
        const xStart = fromNode.x + fromNode.width / 2;
        const yStart = fromNode.y;
        const xEnd = toNode.x + toNode.width / 2;
        const yEnd = toNode.y + toNode.height;
        const dy = Math.abs(yStart - yEnd) / 2;
        return `M ${xStart} ${yStart} C ${xStart} ${yStart - dy}, ${xEnd} ${yEnd + dy}, ${xEnd} ${yEnd}`;
      }
    }

    return "";
  };

  const currentNode = nodes.find((n) => n.id === selectedNode);
  const activeZone = selectedZone ? zoneDetails[selectedZone] : null;

  // Check if a path is actively highlighted by selection or flow
  const isEdgeActive = (edge: EdgeSpec) => {
    if (isPlayingFlow) {
      const activeNodeIds = [
        "user", "fastapi", "opencv", "layoutlmv3", "faiss_search", "faiss_db", "gemini", "response"
      ];
      const activeFlowId = activeNodeIds[flowStep];
      return edge.from === activeFlowId;
    }
    if (selectedNode) {
      return edge.from === selectedNode || edge.to === selectedNode;
    }
    return false;
  };

  const resetInteractiveState = () => {
    setIsPlayingFlow(false);
    setSelectedNode("user");
    setSelectedZone(null);
    setFlowStep(-1);
  };

  return (
    <section id="architecture" className="relative pt-32 pb-24 bg-[#f8fafc] border-y border-slate-200/80 z-10 overflow-hidden select-none scroll-mt-28">
      {/* Blueprint Ambient Grid Background */}
      <div className="absolute inset-0 bg-grid-dense opacity-[0.4] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[400px] rounded-full bg-brand-violet/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[300px] rounded-full bg-brand-cyan/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
              <Zap className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase">System Schematic Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Visual AI System Architecture
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our production-grade engineering topography. Play the live data-flow pipeline to visualize
              signals routing dynamically from initial user upload to coordinate-grounded visual response synthesis.
            </p>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={isPlayingFlow ? "primary" : "secondary"}
              onClick={() => setIsPlayingFlow(!isPlayingFlow)}
              className="flex items-center gap-2 text-xs font-mono border-slate-200/80"
            >
              {isPlayingFlow ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                  <span>Pause Pipeline Flow</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Simulate Live Pipeline Flow</span>
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={resetInteractiveState}
              className="flex items-center gap-2 text-xs font-mono border-slate-200/80"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset State</span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => setZoomMode(!zoomMode)}
              className="hidden lg:flex items-center gap-2 text-xs font-mono border-slate-200/80"
            >
              {zoomMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-brand-violet" />
                  <span>Compact Blueprint</span>
                </>
              ) : (
                <>
                  <Expand className="w-3.5 h-3.5 text-brand-violet" />
                  <span>Interactive Fullscreen Blueprint</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Blueprint Canvas & Inspector Wrapper */}
        <div className={`grid grid-cols-1 ${zoomMode ? "lg:grid-cols-1" : "lg:grid-cols-12"} gap-8 items-start transition-all duration-500`}>
          
          {/* Main Visual Architecture Canvas Column */}
          <div className={`w-full transition-all duration-500 ${zoomMode ? "lg:col-span-12" : "lg:col-span-8"}`}>
            
            {/* Horizontal Touch Scroll Container on small viewports */}
            <div className="w-full overflow-x-auto overflow-y-hidden lg:overflow-visible scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent rounded-2xl border border-slate-200/80 bg-white/40 backdrop-blur-md p-4 lg:p-6 relative select-none shadow-xl">
              
              {/* Technical Schematic Headers */}
              <div className="absolute top-4 left-6 flex items-center gap-4 text-[9px] font-mono text-slate-400 tracking-widest z-20 pointer-events-none">
                <span>PROJECT ID: NMRVG-2.5</span>
                <span>SYSTEM CLOCK: ACTIVE (60HZ)</span>
                <span>latency_budget: &lt; 2.0s</span>
              </div>
              <div className="absolute top-4 right-6 flex items-center gap-2 text-[9px] font-mono text-brand-cyan/60 tracking-widest z-20 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                <span>ONLINE GRAPHIC SCHEME</span>
              </div>

              {/* Touch Scroll Indicator for mobile screens */}
              <div className="lg:hidden absolute bottom-2 right-4 flex items-center gap-1.5 text-[8px] font-mono text-slate-400 z-20 pointer-events-none">
                <span>Swipe horizontal to explore</span>
                <ChevronRight className="w-3 h-3 animate-pulse" />
              </div>

              {/* The Coordinate Map Canvas */}
              <div 
                ref={canvasRef}
                className="relative w-[1320px] h-[780px] origin-top-left"
              >
                {/* SVG Blueprint Background Grid Overlay */}
                <div className="absolute inset-0 bg-[#f1f5f9] border border-dashed border-slate-200 rounded-xl pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  
                  {/* Neon Coordinate Crosshairs */}
                  <div className="absolute top-10 left-10 w-4 h-4 border-l border-t border-slate-300" />
                  <div className="absolute top-10 right-10 w-4 h-4 border-r border-t border-slate-300" />
                  <div className="absolute bottom-10 left-10 w-4 h-4 border-l border-b border-slate-300" />
                  <div className="absolute bottom-10 right-10 w-4 h-4 border-r border-b border-slate-300" />
                  
                  {/* Subtle Tech Blueprint Lines */}
                  <div className="absolute left-[255px] top-[15px] bottom-[15px] border-r border-dashed border-slate-300/60" />
                  <div className="absolute left-[505px] top-[15px] bottom-[15px] border-r border-dashed border-slate-300/60" />
                  <div className="absolute left-[755px] top-[15px] bottom-[15px] border-r border-dashed border-slate-300/60" />
                  <div className="absolute left-[1005px] top-[15px] bottom-[15px] border-r border-dashed border-slate-300/60" />
                </div>

                {/* SVG Connections Drawing Board */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                  <defs>
                    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(6,182,212,0.7)" />
                    </marker>
                    <marker id="arrow-violet" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(139,92,246,0.7)" />
                    </marker>
                    <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(20,184,166,0.7)" />
                    </marker>
                    <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(168,85,247,0.7)" />
                    </marker>
                    <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(99,102,241,0.7)" />
                    </marker>
                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(59,130,246,0.7)" />
                    </marker>
                    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(16,185,129,0.7)" />
                    </marker>
                  </defs>

                  {/* Draw Connections */}
                  {edges.map((edge, index) => {
                    const active = isEdgeActive(edge);
                    const pathD = getEdgePath(edge);
                    
                    let strokeColor = "rgba(15, 23, 42, 0.06)";
                    let markerId = "";

                    if (active) {
                      strokeColor = `var(--color-edge-${edge.color})`;
                      markerId = `url(#arrow-${edge.color})`;
                    } else {
                      markerId = `url(#arrow-${edge.color})`;
                    }

                    // Map custom stroke definitions
                    const strokeMap = {
                      cyan: active ? "rgba(6,182,212,0.8)" : "rgba(6,182,212,0.25)",
                      violet: active ? "rgba(139,92,246,0.8)" : "rgba(139,92,246,0.25)",
                      teal: active ? "rgba(20,184,166,0.8)" : "rgba(20,184,166,0.25)",
                      purple: active ? "rgba(168,85,247,0.8)" : "rgba(168,85,247,0.25)",
                      indigo: active ? "rgba(99,102,241,0.8)" : "rgba(99,102,241,0.25)",
                      blue: active ? "rgba(59,130,246,0.8)" : "rgba(59,130,246,0.25)",
                      emerald: active ? "rgba(16,185,129,0.8)" : "rgba(16,185,129,0.25)"
                    };
                    
                    const actualStroke = strokeMap[edge.color] || strokeColor;

                    return (
                      <g key={`${edge.from}-${edge.to}-${index}`}>
                        {/* Shadow Back Line */}
                        <path
                          d={pathD}
                          fill="none"
                          stroke="rgba(15,23,42,0.03)"
                          strokeWidth={4}
                        />
                        {/* Actual Connector Cable */}
                        <motion.path
                          d={pathD}
                          fill="none"
                          stroke={actualStroke}
                          strokeWidth={active ? 2.5 : 1.5}
                          markerEnd={markerId}
                          initial={{ strokeDasharray: "4 4", strokeDashoffset: 0 }}
                          animate={active ? { strokeDashoffset: -50 } : { strokeDashoffset: 0 }}
                          transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                          className="transition-all duration-300"
                        />
                        {/* Animated Signal Particle */}
                        {active && (
                          <motion.path
                            d={pathD}
                            fill="none"
                            stroke={edge.color === "cyan" ? "#06b6d4" : edge.color === "violet" ? "#8b5cf6" : edge.color === "teal" ? "#14b8a6" : edge.color === "purple" ? "#a855f7" : edge.color === "blue" ? "#3b82f6" : "#10b981"}
                            strokeWidth={3}
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "8 200", strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: -208 }}
                            transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* 1. Draw Architecture Zones Containers */}
                {zones.map((zone) => {
                  const isHighlighted = selectedZone === zone.id || 
                    (isPlayingFlow && 
                      ((flowStep === 0 && zone.id === "frontend") ||
                       (flowStep === 1 && zone.id === "gateway") ||
                       (flowStep === 2 && zone.id === "processing") ||
                       (flowStep === 3 && zone.id === "understanding") ||
                       (flowStep === 4 && zone.id === "retrieval") ||
                       (flowStep === 5 && zone.id === "storage") ||
                       (flowStep === 6 && zone.id === "llm") ||
                       (flowStep === 7 && zone.id === "frontend"))
                    );

                  return (
                    <div
                      key={zone.id}
                      onClick={() => {
                        setSelectedZone(zone.id);
                        setSelectedNode("");
                      }}
                      style={{
                        position: "absolute",
                        left: zone.x,
                        top: zone.y,
                        width: zone.width,
                        height: zone.height
                      }}
                      className={`group rounded-xl border bg-gradient-to-b ${zone.bgGrad} backdrop-blur-[2px] transition-all duration-500 cursor-pointer flex flex-col justify-between p-3.5 ${
                        isHighlighted 
                          ? `${zone.borderClass.replace("20", "50")} bg-white/60 shadow-[0_4px_20px_rgba(15,23,42,0.02)]`
                          : "border-slate-200/60 bg-slate-50/10"
                      }`}
                    >
                      {/* Zone Neon Glow Border */}
                      {isHighlighted && (
                        <div 
                          className="absolute inset-0 rounded-xl pointer-events-none opacity-40 blur-md transition-all duration-300"
                          style={{ boxShadow: `inset 0 0 15px ${zone.glowColor}, 0 0 10px ${zone.glowColor}` }}
                        />
                      )}

                      {/* Header Label */}
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5 relative z-20 pointer-events-none">
                        <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold transition-colors duration-300 ${
                          isHighlighted 
                            ? (zone.color === "cyan" ? "text-brand-cyan font-bold" : zone.color === "violet" ? "text-brand-violet font-bold" : zone.color === "teal" ? "text-brand-teal font-bold" : zone.color === "purple" ? "text-brand-violet font-bold" : zone.color === "blue" ? "text-blue-500 font-bold" : "text-brand-emerald font-bold")
                            : "text-slate-400"
                        }`}>
                          {zone.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`w-1 h-1 rounded-full ${isHighlighted ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                          <span className="text-[7px] font-mono text-slate-400">ZONE</span>
                        </div>
                      </div>

                      {/* Bottom indicator */}
                      <div className="text-[7px] font-mono text-slate-400 tracking-widest relative z-20 pointer-events-none">
                        SECURE_SANDBOX_{zone.id.toUpperCase()}
                      </div>
                    </div>
                  );
                })}

                {/* 2. Draw Interactive Tech Nodes (HTML components layered on top) */}
                {nodes.map((node) => {
                  const isActive = selectedNode === node.id;
                  const isNodeZoneActive = selectedZone === node.zone;
                  
                  let themeBorder = "border-slate-200/80 hover:border-slate-400/80 hover:shadow-md";
                  let themeShadow = "0 2px 8px rgba(15, 23, 42, 0.02)";
                  let pulseColor = "bg-slate-300";

                  if (isActive || isNodeZoneActive) {
                    const zone = zones.find(z => z.id === node.zone);
                    const glowVal = zone ? zone.glowColor : "rgba(15, 23, 42, 0.08)";
                    themeShadow = `0 4px 14px ${glowVal}`;
                    if (node.zone === "frontend") {
                      themeBorder = "border-cyan-500/60 shadow-lg shadow-cyan-500/5";
                      pulseColor = "bg-brand-cyan";
                    } else if (node.zone === "gateway") {
                      themeBorder = "border-violet-500/60 shadow-lg shadow-violet-500/5";
                      pulseColor = "bg-brand-violet";
                    } else if (node.zone === "processing") {
                      themeBorder = "border-teal-500/60 shadow-lg shadow-teal-500/5";
                      pulseColor = "bg-brand-teal";
                    } else if (node.zone === "understanding") {
                      themeBorder = "border-purple-500/60 shadow-lg shadow-purple-500/5";
                      pulseColor = "bg-brand-violet";
                    } else if (node.zone === "storage") {
                      themeBorder = "border-blue-500/60 shadow-lg shadow-blue-500/5";
                      pulseColor = "bg-blue-500";
                    } else if (node.zone === "retrieval") {
                      themeBorder = "border-indigo-500/60 shadow-lg shadow-indigo-500/5";
                      pulseColor = "bg-indigo-500";
                    } else if (node.zone === "llm") {
                      themeBorder = "border-emerald-500/60 shadow-lg shadow-emerald-500/5";
                      pulseColor = "bg-brand-emerald";
                    }
                  }

                  return (
                    <motion.div
                      key={node.id}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering parent zone click
                        setSelectedNode(node.id);
                        setSelectedZone(null);
                      }}
                      whileHover={{ scale: 1.03, y: node.y - 2 }}
                      style={{
                        position: "absolute",
                        left: node.x,
                        top: node.y,
                        width: node.width,
                        height: node.height,
                        boxShadow: themeShadow
                      }}
                      className={`z-20 rounded-xl border bg-white/95 backdrop-blur-md cursor-pointer p-2.5 flex flex-col justify-between transition-all duration-300 ${themeBorder} ${
                        isActive ? "bg-slate-50/80 border-slate-400" : ""
                      }`}
                    >
                      {/* Node Header Row */}
                      <div className="flex items-center gap-2.5">
                        {/* Logo Container */}
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          {node.icon}
                        </div>
                        {/* Text */}
                        <div className="overflow-hidden">
                          <h4 className="text-[10px] font-bold text-slate-800 tracking-tight truncate leading-tight">
                            {node.label}
                          </h4>
                          <span className="text-[8px] text-slate-500 block truncate mt-0.5 leading-none">
                            {node.tech}
                          </span>
                        </div>
                      </div>

                      {/* Node Metrics Bottom Row */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-1.5 mt-1">
                        <span className="text-[7px] font-mono text-slate-400 truncate max-w-[130px]">
                          {node.subtitle}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`w-1 h-1 rounded-full ${pulseColor} ${isActive ? "animate-ping" : ""}`} />
                          <span className="text-[7px] font-mono text-slate-300">READY</span>
                        </div>
                      </div>

                      {/* Selection Glow Ring */}
                      {isActive && (
                        <div className="absolute -inset-px rounded-xl border border-slate-300 pointer-events-none animate-pulse" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Right Sidebar Inspector Column */}
          <div className={`w-full ${zoomMode ? "lg:col-span-12" : "lg:col-span-4"} flex flex-col gap-6`}>
            
            <AnimatePresence mode="wait">
              {/* Node Deep Dive Inspector */}
              {currentNode && !selectedZone && (
                <motion.div
                  key={`node-${currentNode.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card 
                    className="border-slate-200/80 bg-white/80 backdrop-blur-md p-6 shadow-xl flex flex-col gap-5 relative overflow-hidden" 
                    hoverEffect={false}
                  >
                    {/* Glowing ambient lights back */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-cyan/5 blur-2xl pointer-events-none" />

                    {/* Inspector Title */}
                    <div className="border-b border-slate-100 pb-4 flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono bg-slate-50 border border-slate-200/60 text-slate-500 px-2 py-0.5 rounded uppercase">
                            Node Inspector
                          </span>
                          <span className="text-[8px] font-mono text-brand-cyan uppercase">
                            ZONE: {currentNode.zone}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-2 flex items-center gap-2">
                          {currentNode.label}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{currentNode.tech} Framework Module</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                        {currentNode.icon}
                      </div>
                    </div>

                    {/* Specs Description */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        Operational Role:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {currentNode.specs}
                      </p>
                    </div>

                    {/* Mathematical Formula / Core Algorithm */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-4 font-mono relative">
                      <span className="text-[8px] font-mono text-brand-cyan/60 uppercase tracking-widest absolute top-2 right-3">
                        ALGORITHMIC CODE
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                        Mathematical Blueprint:
                      </span>
                      <div className="text-xs text-slate-800 py-1.5 overflow-x-auto text-center bg-slate-50 rounded border border-slate-200/80 flex items-center justify-center min-h-[52px] px-3">
                        <FormulaRenderer formula={currentNode.formula} />
                      </div>
                    </div>

                    {/* Latency & Metrics */}
                    <div className="flex items-center justify-between bg-brand-cyan/5 border border-brand-cyan/20 rounded-lg p-3">
                      <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Target performance:
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800">
                        {currentNode.metrics}
                      </span>
                    </div>

                    {/* Integrated Libraries */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        Core System Dependencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentNode.libraries.map((lib) => (
                          <span
                            key={lib}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80 text-slate-600 font-mono"
                          >
                            {lib}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status check footer */}
                    <div className="border-t border-slate-100 pt-4 mt-1 flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        VERIFIED SECURE MODULE
                      </span>
                      <span>NMRVG-02B</span>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Zone deep dive Inspector */}
              {activeZone && !selectedNode && (
                <motion.div
                  key={`zone-${activeZone.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card 
                    className="border-slate-200/80 bg-white/80 backdrop-blur-md p-6 shadow-xl flex flex-col gap-5 relative overflow-hidden" 
                    hoverEffect={false}
                  >
                    {/* Glowing ambient lights back */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-violet/5 blur-2xl pointer-events-none" />

                    {/* Inspector Title */}
                    <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono bg-slate-50 border border-slate-200/60 text-slate-500 px-2 py-0.5 rounded uppercase">
                            Zone Inspector
                          </span>
                          <span className="text-[8px] font-mono text-brand-violet uppercase">
                            LAYER ARCHITECTURE
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-2 flex items-center gap-2">
                          {activeZone.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{activeZone.role}</p>
                      </div>
                    </div>

                    {/* Specs Description */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        Architecture Specifications:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {activeZone.specs}
                      </p>
                    </div>

                    {/* Layer Core Logic */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-4 font-mono relative">
                      <span className="text-[8px] font-mono text-brand-violet/60 uppercase tracking-widest absolute top-2 right-3">
                        LAYER BLUEPRINT
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                        System Level Metric Logic:
                      </span>
                      <div className="text-xs text-slate-800 py-1.5 overflow-x-auto text-center bg-slate-50 rounded border border-slate-200/80 flex items-center justify-center min-h-[52px] px-3">
                        <FormulaRenderer formula={activeZone.formula} />
                      </div>
                    </div>

                    {/* Performance metrics */}
                    <div className="flex items-center justify-between bg-brand-violet/5 border border-brand-violet/20 rounded-lg p-3">
                      <span className="text-[9px] font-mono text-brand-violet uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 animate-pulse" />
                        Aggregate Performance Target:
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800">
                        {activeZone.metrics}
                      </span>
                    </div>

                    {/* Integrated Libraries */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        Zone Technology Fusion:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeZone.libraries.map((lib) => (
                          <span
                            key={lib}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80 text-slate-600 font-mono"
                          >
                            {lib}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status check footer */}
                    <div className="border-t border-slate-100 pt-4 mt-1 flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        ZONE CERTIFIED SECURE
                      </span>
                      <span>NMRVG-02B</span>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Tutorial Tip card */}
            <Card className="bg-slate-50 border border-slate-200/80 p-4 flex gap-3.5 items-start shadow-sm" hoverEffect={false}>
              <Info className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Interactive Blueprint Guide</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  1. Click any <strong className="text-slate-700">Node</strong> to load operational metrics and math formulas. <br />
                  2. Click any <strong className="text-slate-700">Zone background</strong> to inspect layer specifications. <br />
                  3. Tap <strong className="text-brand-cyan">Simulate Pipeline Flow</strong> to see data traverse live!
                </p>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
}
