"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Eye, Cpu, Sparkles, Network } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section 
      id="overview" 
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-grid-faint overflow-hidden z-10"
    >
      {/* Background gradients for ultra premium glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-violet/5 blur-[150px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Heading and Description */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Accent Badge */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full glass border border-slate-200/80 text-xs font-mono text-cyan-600 mb-6 shadow-[0_4px_12px_rgba(15,23,42,0.03)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-spin-slow" />
            <span>Next-Generation Document RAG Model</span>
          </motion.div>

          {/* Project Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            Advanced Neural Machine Reading with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-emerald glow-cyan">
              Visual Grounding
            </span>{" "}
            for Document Understanding
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl font-medium text-cyan-600 tracking-wide mb-4 font-mono"
          >
            Multimodal AI-Powered Document Intelligence System
          </motion.p>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 leading-relaxed max-w-xl text-base sm:text-lg mb-8"
          >
            Understand dense research PDFs, scanned corporate records, complex financial layouts, tables, and vector charts. Fusing optical layout recognition with visual coordinate mapping for hallucination-free grounded answers.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#demo">
              <Button variant="cyan" className="shadow-[0_4px_15px_rgba(6,182,212,0.15)]">
                Try Live Simulator <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#architecture">
              <Button variant="secondary">
                View Architecture
              </Button>
            </a>
            <a href="#workflow">
              <Button variant="secondary">
                Explore Workflow
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: High-tech scanning mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative w-full h-[480px] sm:h-[550px] lg:h-[600px] flex items-center justify-center"
        >
          {/* Outer futuristic frame */}
          <div className="relative w-full max-w-[420px] h-[500px] bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-md overflow-hidden p-6">
            
            {/* The Scanning sweep bar */}
            <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-cyan to-transparent shadow-[0_0_15px_#06b6d4] animate-scan z-30 pointer-events-none" />

            {/* Document layout canvas mockup */}
            <div className="relative w-full h-full bg-slate-50/50 rounded-lg border border-slate-100 p-4 overflow-hidden flex flex-col gap-4 select-none">
              
              {/* Mock Document Header */}
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider">ANNUAL_REPORT_2026.pdf</span>
                </div>
                <span className="text-[8px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/60">
                  PAGE 12 OF 48
                </span>
              </div>

              {/* Bounding box mock layout rows */}
              <div className="flex flex-col gap-4 h-full py-2">
                {/* Visual block 1: Header Bounding Box */}
                <div className="relative border border-brand-cyan/20 bg-brand-cyan/[0.02] p-2.5 rounded group transition-all duration-300">
                  <span className="absolute -top-1.5 -left-1.5 text-[7px] font-mono bg-cyan-500 text-white px-1 rounded scale-90">Title</span>
                  <div className="h-2 w-3/4 bg-slate-200 rounded" />
                  <div className="h-1.5 w-1/2 bg-slate-200/60 rounded mt-1.5" />
                </div>

                {/* Visual block 2: Two Column Split (Text Block vs Chart Block) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative border border-brand-violet/20 bg-brand-violet/[0.02] p-2.5 rounded transition-all duration-300">
                    <span className="absolute -top-1.5 -left-1.5 text-[7px] font-mono bg-violet-500 text-white px-1 rounded scale-90">Text</span>
                    <div className="h-1.5 w-full bg-slate-200 rounded" />
                    <div className="h-1.5 w-5/6 bg-slate-200 rounded mt-1" />
                    <div className="h-1.5 w-4/5 bg-slate-200 rounded mt-1" />
                  </div>

                  <div className="relative border border-brand-emerald/20 bg-brand-emerald/[0.02] p-2 rounded flex flex-col justify-between items-center transition-all duration-300 h-28">
                    <span className="absolute -top-1.5 -left-1.5 text-[7px] font-mono bg-emerald-500 text-white px-1 rounded scale-90">Figure</span>
                    {/* Simulated circular chart */}
                    <div className="relative w-14 h-14 rounded-full border-2 border-dashed border-brand-emerald/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-brand-emerald/80 flex items-center justify-center">
                        <Network className="w-4 h-4 text-brand-emerald" />
                      </div>
                    </div>
                    <div className="h-1.5 w-11/12 bg-slate-200 rounded mt-1" />
                  </div>
                </div>

                {/* Visual block 3: Table Layout Block */}
                <div className="relative border border-brand-cyan/20 bg-brand-cyan/[0.02] p-2.5 rounded mt-1">
                  <span className="absolute -top-1.5 -left-1.5 text-[7px] font-mono bg-cyan-500 text-white px-1 rounded scale-90">Table (3x3)</span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div className="h-1.5 bg-slate-200 rounded" />
                    <div className="h-1.5 bg-slate-200/80 rounded" />
                    <div className="h-1.5 bg-slate-200/80 rounded" />
                    <div className="h-1.5 bg-slate-200/50 rounded" />
                    <div className="h-1.5 bg-slate-200/60 rounded" />
                    <div className="h-1.5 bg-slate-200/60 rounded" />
                  </div>
                </div>

                {/* Real-time OCR streaming display console */}
                <div className="mt-auto bg-slate-950 rounded border border-slate-800 p-3 font-mono text-[9px] text-cyan-400 leading-tight flex flex-col gap-1 select-none shadow-inner">
                  <div className="flex items-center gap-1.5 text-white/50 border-b border-white/[0.05] pb-1.5 mb-1.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>OCR LIVE DATASTREAM</span>
                  </div>
                  <div>&gt; OpenCV Bilateral enhancement: Complete</div>
                  <div>&gt; LayoutLMv3 spatial tokens matched: 43</div>
                  <div className="text-brand-emerald">&gt; Visual grounding coordinates map: [122, 45, 340, 180]</div>
                  <div className="text-white/40 animate-pulse">&gt; Running Gemini spatial reasoning synthesis...</div>
                </div>
              </div>
            </div>

            {/* Glowing dashboard labels / badges outside */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass border border-slate-200/80 p-3 rounded-xl shadow-[0_10px_25px_rgba(15,23,42,0.05)] flex items-center gap-2 max-w-[150px] z-30"
            >
              <div className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-mono">LATENCY</span>
                <span className="text-xs font-bold text-slate-800 font-mono">&lt;1.8s AVG</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 -left-6 glass border border-slate-200/80 p-3 rounded-xl shadow-[0_10px_25px_rgba(15,23,42,0.05)] flex items-center gap-2 max-w-[160px] z-30"
            >
              <div className="p-1.5 rounded-lg bg-brand-emerald/10 text-brand-emerald">
                <Eye className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-mono">GROUNDED</span>
                <span className="text-xs font-bold text-slate-800 font-mono">98.2% CITATION</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Futuristic bottom separator divider curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#f8fafc] text-[#f8fafc]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.66,138.83,118.81,209.4,103C261.27,91.33,285.57,70.52,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
