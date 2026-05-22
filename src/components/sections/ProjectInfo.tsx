"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Award, Zap, ShieldAlert } from "lucide-react";
import Card from "@/components/ui/Card";

interface StatItem {
  number: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: "cyan" | "violet" | "emerald";
}

export default function ProjectInfo() {
  const stats: StatItem[] = [
    {
      number: "98.4%",
      label: "EasyOCR Precision",
      desc: "Pixel-accurate raw text character detection rate under affine skew pre-corrections.",
      icon: <Cpu className="w-5 h-5 text-brand-cyan" />,
      color: "cyan"
    },
    {
      number: "<1.8s",
      label: "Response Latency",
      desc: "Average round-trip pipeline duration from multi-page document upload to coordinates highlight.",
      icon: <Zap className="w-5 h-5 text-brand-violet" />,
      color: "violet"
    },
    {
      number: "99.8%",
      label: "Grounding Confidence",
      desc: "Footnote citation verification precision checked against spatial coordinate token maps.",
      icon: <Award className="w-5 h-5 text-brand-emerald" />,
      color: "emerald"
    }
  ];

  return (
    <section id="project-info" className="relative py-24 bg-grid-faint z-10 border-t border-slate-200/50">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[300px] rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Statistics Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-white/80 border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.02)]" glowColor={stat.color} hoverEffect={true}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-lg border ${
                    stat.color === "cyan" ? "bg-cyan-50/50 text-cyan-600 border-cyan-100" : stat.color === "violet" ? "bg-violet-50/50 text-violet-600 border-violet-100" : "bg-emerald-50/50 text-emerald-600 border-emerald-100"
                  }`}>
                    {stat.icon}
                  </div>
                  <span className="text-[32px] sm:text-4xl font-extrabold text-slate-800 font-mono leading-none tracking-tight">
                    {stat.number}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 tracking-tight mb-2">{stat.label}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{stat.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technical Highlights Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Summary text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">Research Background</span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2 mb-6">
              Research-Inspired AI System Architecture
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              This system is built as an advanced Multimodal RAG platform designed to tackle layout breakdowns, visual figure references, and citation verification gaps. Fusing state-of-the-art models like LayoutLMv3, CLIP, FAISS, and Google Gemini, we provide a complete, verified pipeline that solves document reading order failures.
            </p>
            
            {/* Meta specs list */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 border border-slate-200/80 p-3 rounded-lg flex flex-col shadow-sm">
                <span className="text-[9px] font-mono text-slate-400 uppercase">PROJECT TYPE</span>
                <span className="text-xs font-bold text-slate-800 mt-1">Research Prototype</span>
              </div>
              <div className="bg-white/70 border border-slate-200/80 p-3 rounded-lg flex flex-col shadow-sm">
                <span className="text-[9px] font-mono text-slate-400 uppercase">ARCHITECTURE</span>
                <span className="text-xs font-bold text-slate-800 mt-1">Multimodal Grounding RAG</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: High-Tech Project Specifications Inspector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-slate-200/80 bg-white/80 p-6 relative overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.04)]" hoverEffect={false}>
              <div className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full bg-brand-cyan/5 blur-[60px] pointer-events-none" />

              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4 select-none">
                <ShieldAlert className="w-5 h-5 text-cyan-600 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-800 font-mono uppercase tracking-wider">PROJECT CREDENTIALS</h4>
              </div>

              <ul className="flex flex-col gap-4 text-xs text-slate-600">
                <li className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-400">COLLEGE DIVISION</span>
                  <span className="font-semibold text-slate-700 text-right">Department of Multimodal AI Studies</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-400">RESEARCH FIELD</span>
                  <span className="font-semibold text-cyan-600">Neural Machine Reading (NMR)</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-400">FUSED LIBRARIES COUNT</span>
                  <span className="font-semibold font-mono text-violet-600">15+ Core Modules Fused</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-slate-400">COMPLEXITY VECTOR</span>
                  <span className="font-semibold text-emerald-600">Level 5 (Advanced Scale)</span>
                </li>
              </ul>
            </Card>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
