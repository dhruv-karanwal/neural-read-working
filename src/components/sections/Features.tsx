"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Scan, 
  Search, 
  MapPin, 
  Brain, 
  FileCheck, 
  Shuffle, 
  Layers, 
  FileSearch, 
  BarChart4, 
  Grid 
} from "lucide-react";
import Card from "@/components/ui/Card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  glow: "cyan" | "violet" | "emerald";
}

export default function Features() {
  const list: Feature[] = [
    {
      icon: <Scan className="w-5 h-5" />,
      title: "OCR Support",
      desc: "Robust optical text parsing for faded scans, skewed prints, and multi-lingual character scripts.",
      glow: "cyan",
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Semantic Search",
      desc: "Queries are mapped to contextual concepts, retrieving matches even if keywords don't align.",
      glow: "violet",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visual Grounding",
      desc: "Tracks the exact page bounding box coordinates for every extracted word, coordinate-first.",
      glow: "emerald",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI Reasoning",
      desc: "Deep visual context reasoning using Google Gemini 1.5 tokenizers to resolve logical prompts.",
      glow: "violet",
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: "Citation-Based Answers",
      desc: "Generated answers return exact page coordinate footnotes, eliminating AI hallucinations.",
      glow: "emerald",
    },
    {
      icon: <Shuffle className="w-5 h-5" />,
      title: "Hybrid Retrieval",
      desc: "Combines FAISS dense cosine vector similarities and BM25 sparse keyword indices with RRF.",
      glow: "violet",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Multimodal Understanding",
      desc: "Unifies text matrices, spatial layout coordinates, and visual figure crops into one encoder.",
      glow: "violet",
    },
    {
      icon: <FileSearch className="w-5 h-5" />,
      title: "Scanned PDF Support",
      desc: "Processes skew distortions and camera noise, applying bilateral enhancements.",
      glow: "cyan",
    },
    {
      icon: <BarChart4 className="w-5 h-5" />,
      title: "Figure Understanding",
      desc: "Screenshot cropping and CLIP semantic projections preserve charts, drawings, and formulas.",
      glow: "violet",
    },
    {
      icon: <Grid className="w-5 h-5" />,
      title: "Layout Detection",
      desc: "Preserves paragraphs, headers, columns, and footnote grids using LayoutLMv3 transformers.",
      glow: "cyan",
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-grid-faint z-10 border-t border-slate-200/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            Core Specifications
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Comprehensive Feature Matrix
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Engineering a complete structural document intelligence engine. Explore our core visual-semantic features.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {list.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="lg:col-span-1"
            >
              <Card 
                className="h-full bg-white/80 border border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.02)]" 
                glowColor={item.glow}
              >
                <div className={`p-2.5 rounded-lg w-fit border mb-4 ${
                  item.glow === "cyan" ? "text-cyan-600 bg-cyan-50/50 border-cyan-100" : item.glow === "violet" ? "text-violet-600 bg-violet-50/50 border-violet-100" : "text-emerald-600 bg-emerald-50/50 border-emerald-100"
                }`}>
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-800 tracking-tight mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
