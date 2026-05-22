"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { 
  NextjsIcon, 
  FastapiIcon, 
  OpenCVIcon, 
  GeminiIcon, 
  EasyOcrIcon, 
  LayoutLMv3Icon, 
  ClipIcon, 
  FaissIcon, 
  Bm25Icon, 
  HuggingFaceIcon, 
  PostgresIcon, 
  SqliteIcon, 
  VercelIcon, 
  RenderIcon 
} from "@/components/icons";

interface Technology {
  name: string;
  category: "FRONTEND" | "BACKEND" | "AI & CORE" | "VECTOR & RETRIEVAL" | "CLOUD & STACK";
  purpose: string;
  icon: React.ReactNode;
  glow: "cyan" | "violet" | "emerald";
}

export default function TechStack() {
  const techs: Technology[] = [
    {
      name: "Next.js 14",
      category: "FRONTEND",
      purpose: "Drives static rendering, interactive views, and high-performance coordinate canvases.",
      icon: <NextjsIcon />,
      glow: "cyan",
    },
    {
      name: "FastAPI",
      category: "BACKEND",
      purpose: "High-performance async Python backend supporting image processing and inference tasks.",
      icon: <FastapiIcon />,
      glow: "emerald",
    },
    {
      name: "Google Gemini 1.5",
      category: "AI & CORE",
      purpose: "Performs multimodal deep synthesis reasoning, using spatial grounding inputs.",
      icon: <GeminiIcon />,
      glow: "violet",
    },
    {
      name: "OpenCV",
      category: "AI & CORE",
      purpose: "Applies image contrast enhancements, deskewing, and adaptive binarization algorithms.",
      icon: <OpenCVIcon />,
      glow: "cyan",
    },
    {
      name: "EasyOCR",
      category: "AI & CORE",
      purpose: "High-accuracy PyTorch-based optical character parsing and coordinate mapping.",
      icon: <EasyOcrIcon />,
      glow: "cyan",
    },
    {
      name: "LayoutLMv3",
      category: "AI & CORE",
      purpose: "Fused multi-modal spatial transformer mapping structural document tokens.",
      icon: <LayoutLMv3Icon />,
      glow: "cyan",
    },
    {
      name: "CLIP Encoder",
      category: "AI & CORE",
      purpose: "Transforms document screenshot regions and chart figures into unified vector spaces.",
      icon: <ClipIcon />,
      glow: "violet",
    },
    {
      name: "FAISS Indexing",
      category: "VECTOR & RETRIEVAL",
      purpose: "Executes dense spatial vector search matching similar semantic document nodes.",
      icon: <FaissIcon />,
      glow: "violet",
    },
    {
      name: "Rank-BM25",
      category: "VECTOR & RETRIEVAL",
      purpose: "Sparse keyword lookup index verifying exact lexical references across page texts.",
      icon: <Bm25Icon />,
      glow: "emerald",
    },
    {
      name: "Hugging Face",
      category: "CLOUD & STACK",
      purpose: "Serves specialized spatial transformer models and layout parsing pipelines.",
      icon: <HuggingFaceIcon />,
      glow: "violet",
    },
    {
      name: "PostgreSQL",
      category: "CLOUD & STACK",
      purpose: "Handles core system databases, document indexing records, and spatial schemas.",
      icon: <PostgresIcon />,
      glow: "emerald",
    },
    {
      name: "SQLite Cache",
      category: "CLOUD & STACK",
      purpose: "Fast embedded cache matching parsed coordinate indexes to document keys.",
      icon: <SqliteIcon />,
      glow: "cyan",
    },
    {
      name: "Vercel Platform",
      category: "CLOUD & STACK",
      purpose: "Deploys globally optimized frontend client interfaces on high-performance edge.",
      icon: <VercelIcon />,
      glow: "cyan",
    },
    {
      name: "Render Cloud",
      category: "CLOUD & STACK",
      purpose: "Hosts secure, auto-scaling instances of the FastAPI OCR backend engines.",
      icon: <RenderIcon />,
      glow: "emerald",
    }
  ];

  return (
    <section id="tech-stack" className="relative py-24 bg-grid-faint z-10 border-t border-slate-200/50">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            System Subsystems
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Enterprise-Grade Technology Stack
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Fusing specialized deep learning libraries, computer vision engines, semantic vector databases, and state-of-the-art multimodal reasoning frameworks.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card 
                className="h-full bg-white/80 border border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:bg-white"
                glowColor={tech.glow}
              >
                {/* Tech logo and Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {tech.category}
                  </span>
                </div>

                {/* Tech Info */}
                <h4 className="text-base font-bold text-slate-800 mb-2">{tech.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{tech.purpose}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
