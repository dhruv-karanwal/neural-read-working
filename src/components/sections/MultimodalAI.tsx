"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, FileText, Image as ImageIcon, Box, Info } from "lucide-react";
import Card from "@/components/ui/Card";

interface FeatureDetail {
  title: string;
  icon: React.ReactNode;
  desc: string;
  math: string;
}

export default function MultimodalAI() {
  const [activeNode, setActiveNode] = useState<"text" | "box" | "clip" | "none">("none");

  const components: FeatureDetail[] = [
    {
      title: "Textual Representation",
      icon: <FileText className="w-4 h-4 text-brand-cyan" />,
      desc: "Raw optical text characters are processed through sub-word tokenizers to capture lexical definitions.",
      math: "\\mathbf{v}_t = \\text{TransformerEncoder}(T)"
    },
    {
      title: "Spatial Positioning (2D Box)",
      icon: <Box className="w-4 h-4 text-brand-emerald" />,
      desc: "Normalized bounding coordinates [x0, y0, x1, y1] represent exactly where elements appear on the page.",
      math: "\\mathbf{v}_s = \\text{LinearProj}(\\mathbf{box}_i)"
    },
    {
      title: "CLIP Visual Semantic",
      icon: <ImageIcon className="w-4 h-4 text-brand-violet" />,
      desc: "Selected region screenshots (like charts, figures, equations) are encoded via visual transformers.",
      math: "\\mathbf{v}_v = \\text{ViTEncoder}(\\text{crop}_i)"
    }
  ];

  return (
    <section id="multimodal" className="relative py-24 bg-[#f8fafc] z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            Theoretical Core
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            What Makes This System Multimodal?
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Unlike conventional language models that treat PDFs as linear strings of flat text, our pipeline preserves and fuses text semantic encodings with absolute 2D positions and structural image crops.
          </p>
        </div>

        {/* Conceptual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Fused Interactive Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="glass-premium rounded-2xl p-8 border border-slate-200/80 bg-white/40 shadow-xl w-full max-w-[480px] relative overflow-hidden h-[420px] flex flex-col justify-between select-none">
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-brand-violet/5 blur-[80px] pointer-events-none" />

              {/* Graphic Title */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 tracking-wider">
                <span>VECTOR SPACE INGESTION</span>
                <span>FUSION LEVEL: 3</span>
              </div>

              {/* Interactive Vector Space Map */}
              <div className="relative h-60 w-full flex items-center justify-center">
                
                {/* Connection pathways from inputs to center */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 400 240">
                  {/* Text path */}
                  <motion.path 
                    d="M 60 40 Q 200 40 200 120" 
                    fill="none" 
                    stroke={activeNode === "text" ? "#06b6d4" : "rgba(15,23,42,0.08)"} 
                    strokeWidth={activeNode === "text" ? 2 : 1}
                    className="transition-colors duration-300"
                  />
                  {/* Position path */}
                  <motion.path 
                    d="M 60 120 H 200" 
                    fill="none" 
                    stroke={activeNode === "box" ? "#10b981" : "rgba(15,23,42,0.08)"} 
                    strokeWidth={activeNode === "box" ? 2 : 1}
                    className="transition-colors duration-300"
                  />
                  {/* CLIP path */}
                  <motion.path 
                    d="M 60 200 Q 200 200 200 120" 
                    fill="none" 
                    stroke={activeNode === "clip" ? "#8b5cf6" : "rgba(15,23,42,0.08)"} 
                    strokeWidth={activeNode === "clip" ? 2 : 1}
                    className="transition-colors duration-300"
                  />
                  {/* Fused Output path */}
                  <motion.path 
                    d="M 200 120 H 340" 
                    fill="none" 
                    stroke={activeNode !== "none" ? "#c084fc" : "rgba(15,23,42,0.1)"} 
                    strokeWidth={activeNode !== "none" ? 2.5 : 1}
                    className="transition-colors duration-300"
                    strokeDasharray={activeNode !== "none" ? "4 4" : "none"}
                  />
                </svg>

                {/* Left Side Inputs */}
                <div className="absolute left-4 top-4 flex flex-col gap-6 w-32">
                  <div 
                    onMouseEnter={() => setActiveNode("text")}
                    onMouseLeave={() => setActiveNode("none")}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                      activeNode === "text" ? "border-brand-cyan bg-brand-cyan/10" : "border-slate-200/60 bg-slate-50/40"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="text-[10px] font-mono text-slate-700 font-semibold">Text Tokens</span>
                  </div>

                  <div 
                    onMouseEnter={() => setActiveNode("box")}
                    onMouseLeave={() => setActiveNode("none")}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                      activeNode === "box" ? "border-brand-emerald bg-brand-emerald/10" : "border-slate-200/60 bg-slate-50/40"
                    }`}
                  >
                    <Box className="w-3.5 h-3.5 text-brand-emerald" />
                    <span className="text-[10px] font-mono text-slate-700 font-semibold">2D Position</span>
                  </div>

                  <div 
                    onMouseEnter={() => setActiveNode("clip")}
                    onMouseLeave={() => setActiveNode("none")}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                      activeNode === "clip" ? "border-brand-violet bg-brand-violet/10" : "border-slate-200/60 bg-slate-50/40"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-brand-violet" />
                    <span className="text-[10px] font-mono text-slate-700 font-semibold">CLIP Image</span>
                  </div>
                </div>

                {/* Central Fusing Gateway Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 ${
                    activeNode !== "none" ? "border-purple-400 shadow-[0_4px_20px_rgba(192,132,252,0.15)]" : "border-slate-200/80"
                  }`}>
                    <Layers className={`w-6 h-6 transition-all duration-300 ${
                      activeNode !== "none" ? "text-purple-400 rotate-45 scale-110" : "text-slate-400"
                    }`} />
                  </div>
                </div>

                {/* Right Side Output */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-28 text-center flex flex-col items-center gap-1.5">
                  <div className={`p-2.5 rounded-xl border bg-slate-50 font-mono text-[9px] transition-all duration-300 ${
                    activeNode !== "none" ? "border-purple-400 text-purple-600 font-bold bg-purple-50" : "border-slate-200/60 text-slate-300"
                  }`}>
                    [768-D EMBEDDING]
                  </div>
                  <span className="text-[8px] font-mono text-slate-400">FUSED VECTOR</span>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 flex items-center gap-2 text-[9px] font-mono text-slate-500">
                <Info className="w-3.5 h-3.5 text-brand-cyan" />
                <span>
                  {activeNode === "none" && "Hover inputs on the left to see coordinate fusion."}
                  {activeNode === "text" && "Loads text strings to evaluate semantic lexical meaning."}
                  {activeNode === "box" && "Integrates 2D page bounding layout metrics natively."}
                  {activeNode === "clip" && "Extracts screenshot crops to evaluate charts, drawings & graphs."}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Components list */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {components.map((c) => (
              <Card key={c.title} className="bg-white/60 border-slate-200/80 shadow-sm" hoverEffect={true}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    {c.icon}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">{c.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {c.desc}
                </p>
                <div className="font-mono text-[10px] text-slate-700 bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 rounded w-fit select-none">
                  Encoding matrix: <span className="text-slate-800 font-semibold">{c.math}</span>
                </div>
              </Card>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
