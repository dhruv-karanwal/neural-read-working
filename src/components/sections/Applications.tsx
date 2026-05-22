"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  HeartPulse, 
  FolderLock, 
  LineChart, 
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import Card from "@/components/ui/Card";

interface Application {
  icon: React.ReactNode;
  title: string;
  category: string;
  metric: string;
  desc: string;
  glow: "cyan" | "violet" | "emerald";
}

export default function Applications() {
  const apps: Application[] = [
    {
      icon: <GraduationCap className="w-5 h-5 text-brand-cyan" />,
      title: "Research Paper Analysis",
      category: "ACADEMIC SCIENCE",
      metric: "85% Review Speedup",
      desc: "Instantly index research repositories. Fuses formulas and chart crops to let students query dense visual findings directly.",
      glow: "cyan",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-brand-violet" />,
      title: "Legal Contract Audits",
      category: "CORPORATE LAW",
      metric: "90% Cost Reduction",
      desc: "Parses scanning anomalies and column layouts across legal briefs, extracting coordinate footnotes to verify clauses.",
      glow: "violet",
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-brand-emerald" />,
      title: "Healthcare Diagnostics",
      category: "MEDICAL BIOTECH",
      metric: "95% Record Accuracy",
      desc: "Extracts multi-page clinical histories and lab tables, matching treatment records without spatial reading breakdown.",
      glow: "emerald",
    },
    {
      icon: <FolderLock className="w-5 h-5 text-brand-cyan" />,
      title: "Enterprise Knowledge",
      category: "SAAS DATABASE",
      metric: "12x Search Latency Cut",
      desc: "Consolidates distributed corporate wikis, scans, and PDFs into a single spatial semantic search domain.",
      glow: "cyan",
    },
    {
      icon: <LineChart className="w-5 h-5 text-brand-violet" />,
      title: "Financial Report Auditing",
      category: "FINANCE AUDIT",
      metric: "80% Speed Improvement",
      desc: "Extracts cell-level tabular rows and columns across quarterly revenue sheets without manual index cell breaks.",
      glow: "violet",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-brand-emerald" />,
      title: "Educational E-Learning",
      category: "ACADEMIC ED-TECH",
      metric: "60% Study Hours Relieved",
      desc: "Provides visual Q&A for textbook scans, mapping complex diagrams to clear pedagogical answers.",
      glow: "emerald",
    }
  ];

  return (
    <section id="applications" className="relative py-24 bg-grid-faint z-10 border-t border-slate-200/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-brand-violet/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            Impact Domains
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Real-World Industry Applications
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Deploying spatial multimodal RAG models across critical knowledge domains. Explore how neural machine reading streamlines operations.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app, idx) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Card className="h-full bg-white/80 border border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:bg-white" glowColor={app.glow}>
                {/* Accent Header */}
                <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {app.icon}
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-cyan-700 uppercase bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                    {app.metric}
                  </span>
                </div>

                {/* Subtitle Category */}
                <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                  {app.category}
                </span>

                {/* Title */}
                <h4 className="text-lg font-bold text-slate-800 tracking-tight mt-1.5 mb-3 flex items-center justify-between group cursor-pointer">
                  <span>{app.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed">{app.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
