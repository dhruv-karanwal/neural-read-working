"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Eye, Layers, Compass } from "lucide-react";
import Card from "@/components/ui/Card";

export default function Introduction() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-brand-cyan" />,
      title: "Layout Understanding",
      desc: "Preserves two-dimensional document structure using LayoutLMv3 spatial tokens, classifying headers, footnotes, columns, and figures.",
    },
    {
      icon: <Eye className="w-5 h-5 text-brand-emerald" />,
      title: "Visual Grounding",
      desc: "Every extracted word is stored with its exact absolute page bounding box coordinates, allowing exact highlighting when cited.",
    },
    {
      icon: <Compass className="w-5 h-5 text-brand-violet" />,
      title: "Multimodal Fusion",
      desc: "Combines text encodings, layout position encodings, and visual CLIP image embeddings into a single cohesive query space.",
    },
  ];

  return (
    <section id="introduction" className="relative py-24 z-10 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-600 mb-3">
            Core Innovation
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Breaking the Limits of Traditional Document Search
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Traditional AI text-readers are blind to the visual and structural design of files, causing catastrophic reading failures. Our system reads documents as humans do: visually, contextually, and semantically.
          </p>
        </div>

        {/* 1. Comparison Grid: Traditional vs Grounded */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          
          {/* Traditional Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-red-200 bg-red-50/20 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5" hoverEffect={false}>
              <div className="flex items-center gap-3 border-b border-red-100 pb-4 mb-6">
                <div className="p-2 rounded-lg bg-red-50 text-red-500 border border-red-100">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Traditional Text-Only RAG</h4>
                  <p className="text-xs font-mono text-red-500 font-semibold">Lacks visual structure awareness</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-5 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold font-mono">✕</span>
                  <span><strong className="text-slate-800">Reading Order Corruption:</strong> Mashes multi-column PDFs together into a single continuous left-to-right string, corrupting paragraphs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold font-mono">✕</span>
                  <span><strong className="text-slate-800">Table Breakdown:</strong> Flattens row/column numbers into single-lines, making financial sheets completely unreadable.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold font-mono">✕</span>
                  <span><strong className="text-slate-800">Zero Figure Context:</strong> Completely ignores graphs, flowcharts, schemas, and images, omitting vital engineering data.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold font-mono">✕</span>
                  <span><strong className="text-slate-800">Blind Answers:</strong> Synthesizes answers without absolute source citations, making it impossible for humans to verify.</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Our Solution Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-emerald-200 bg-emerald-50/20 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5" hoverEffect={false}>
              <div className="flex items-center gap-3 border-b border-emerald-100 pb-4 mb-6">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Grounded Neural Machine Reading</h4>
                  <p className="text-xs font-mono text-emerald-600 font-semibold">Spatial Multimodal Integration</p>
                </div>
              </div>

              <ul className="flex flex-col gap-5 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold font-mono">✓</span>
                  <span><strong className="text-slate-800">Spatial Layout Integrity:</strong> OpenCV filters and LayoutLM preserve paragraphs, headers, and multi-column order natively.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold font-mono">✓</span>
                  <span><strong className="text-slate-800">Cell-Level Table OCR:</strong> Preserves row/column boundaries using coordinate boxes, letting the LLM read raw table matrices.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold font-mono">✓</span>
                  <span><strong className="text-slate-800">Multimodal Graph Analysis:</strong> Fuses CLIP embeddings of charts with surrounding text, enabling reasoning over figures.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold font-mono">✓</span>
                  <span><strong className="text-slate-800">Visual Citations:</strong> Returns answers linked to exact bounding coordinates on the document, drawing highlighting boxes on the screen.</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* 2. Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full bg-white/90 shadow-sm border-slate-200/60" glowColor={idx === 0 ? "cyan" : idx === 1 ? "emerald" : "violet"}>
                <div className="p-3 w-fit rounded-xl bg-slate-100 border border-slate-200/80 mb-5">
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">{pillar.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
