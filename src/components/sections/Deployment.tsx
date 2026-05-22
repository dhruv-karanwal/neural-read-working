"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Server, CloudLightning, ArrowLeftRight } from "lucide-react";
import Card from "@/components/ui/Card";

interface DeploymentNode {
  name: string;
  host: string;
  icon: React.ReactNode;
  desc: string;
  color: "cyan" | "violet" | "emerald";
  details: string[];
}

export default function Deployment() {
  const [hoveredNode, setHoveredNode] = useState<"client" | "api" | "server" | "none">("none");

  const nodes: DeploymentNode[] = [
    {
      name: "Frontend Application Client",
      host: "Vercel Global Edge Networks",
      icon: <Globe className="w-5 h-5 text-brand-cyan" />,
      desc: "Delivers responsive TypeScript static pages, interactive visualizers, and grounding canvases to users.",
      color: "cyan",
      details: ["Next.js 14 Static HTML/JS Assets", "Edge CDN distribution", "Client-side coordinate drawings"]
    },
    {
      name: "Asynchronous REST API Gateway",
      host: "Secured HTTPS Routes (FastAPI)",
      icon: <CloudLightning className="w-5 h-5 text-brand-violet" />,
      desc: "Handles payload handoff, document streaming queues, and coordinates responses.",
      color: "violet",
      details: ["Python FastAPI Framework", "RESTful file-stream uploads", "Uvicorn concurrency routing"]
    },
    {
      name: "Multimodal AI Inference Engine",
      host: "Render Scaled Container Nodes",
      icon: <Server className="w-5 h-5 text-brand-emerald" />,
      desc: "Coordinates bilateral skew enhancements, LayoutLMv3 element parsing, FAISS vector search, and Gemini reasoning.",
      color: "emerald",
      details: ["Docker container instances", "PyTorch EasyOCR/LayoutLMv3", "Google Gemini API connection"]
    }
  ];

  return (
    <section id="deployment" className="relative py-24 bg-grid-faint z-10 border-t border-slate-200/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-brand-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            Infrastructure Schematic
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Scalable Cloud Deployment Architecture
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Our pipeline is engineered for low latency and dynamic scaling. Explore the globally distributed visual cloud deployment routing.
          </p>
        </div>

        {/* Dynamic Interactive Flow Schematic */}
        <div className="glass-premium rounded-2xl p-8 border border-slate-200/80 bg-white/70 max-w-4xl mx-auto mb-16 relative overflow-hidden select-none shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="absolute inset-0 bg-grid opacity-15" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 z-10 py-6">
            
            {/* Vercel Client Node */}
            <div 
              onMouseEnter={() => setHoveredNode("client")}
              onMouseLeave={() => setHoveredNode("none")}
              className={`flex flex-col items-center gap-3 w-48 p-4 rounded-xl border transition-all duration-300 ${
                hoveredNode === "client" 
                  ? "border-cyan-400 bg-cyan-50 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-cyan-600 font-semibold" 
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className={`text-xs font-bold ${hoveredNode === "client" ? "text-cyan-700" : "text-slate-800"}`}>Vercel Edge</h4>
                <p className="text-[10px] text-slate-400 mt-1">Frontend Host Client</p>
              </div>
            </div>

            {/* Connecting link 1 */}
            <div className="relative flex-grow flex items-center justify-center h-4 w-full md:w-auto">
              <div className="w-full h-0.5 bg-slate-200 relative">
                {/* Glowing flow particle */}
                {hoveredNode === "client" || hoveredNode === "api" ? (
                  <motion.span 
                    initial={{ left: 0 }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-2 h-1 bg-brand-cyan rounded-full filter blur-[1px] -translate-y-[1px]"
                  />
                ) : null}
              </div>
              <ArrowLeftRight className="w-4 h-4 text-slate-400 absolute" />
            </div>

            {/* API Gateway Node */}
            <div 
              onMouseEnter={() => setHoveredNode("api")}
              onMouseLeave={() => setHoveredNode("none")}
              className={`flex flex-col items-center gap-3 w-48 p-4 rounded-xl border transition-all duration-300 ${
                hoveredNode === "api" 
                  ? "border-violet-400 bg-violet-50 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-violet-600 font-semibold" 
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet">
                <CloudLightning className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-center">
                <h4 className={`text-xs font-bold ${hoveredNode === "api" ? "text-violet-700" : "text-slate-800"}`}>REST HTTPS API</h4>
                <p className="text-[10px] text-slate-400 mt-1">FastAPI Gateway</p>
              </div>
            </div>

            {/* Connecting link 2 */}
            <div className="relative flex-grow flex items-center justify-center h-4 w-full md:w-auto">
              <div className="w-full h-0.5 bg-slate-200 relative">
                {/* Glowing flow particle */}
                {hoveredNode === "server" || hoveredNode === "api" ? (
                  <motion.span 
                    initial={{ left: 0 }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-2 h-1 bg-brand-emerald rounded-full filter blur-[1px] -translate-y-[1px]"
                  />
                ) : null}
              </div>
              <ArrowLeftRight className="w-4 h-4 text-slate-400 absolute" />
            </div>

            {/* Render Inference Server Node */}
            <div 
              onMouseEnter={() => setHoveredNode("server")}
              onMouseLeave={() => setHoveredNode("none")}
              className={`flex flex-col items-center gap-3 w-48 p-4 rounded-xl border transition-all duration-300 ${
                hoveredNode === "server" 
                  ? "border-emerald-400 bg-emerald-50 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-emerald-600 font-semibold" 
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className={`text-xs font-bold ${hoveredNode === "server" ? "text-emerald-700" : "text-slate-800"}`}>Render Container</h4>
                <p className="text-[10px] text-slate-400 mt-1">Inference Engine</p>
              </div>
            </div>

          </div>

          {/* Status logs text */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] font-mono text-center text-slate-500 tracking-wider">
            {hoveredNode === "none" && "Hover nodes on the schematic to inspect layout parameters."}
            {hoveredNode === "client" && "FRONTEND: Client maps coordinate highlighting layers locally."}
            {hoveredNode === "api" && "GATEWAY: Secure async routing handles large documents stream seamlessly."}
            {hoveredNode === "server" && "BACKEND: Docker environment serves LayoutLMv3, EasyOCR and Gemini API outputs."}
          </div>
        </div>

        {/* Detailed Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nodes.map((node) => (
            <Card key={node.name} className="bg-white/80 border border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.02)]" glowColor={node.color}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {node.icon}
                </div>
                <div>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">INFRASTRUCTURE LAYER</span>
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight mt-0.5">{node.name}</h4>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">{node.desc}</p>
              
              <ul className="flex flex-col gap-2 font-mono text-[10px] text-slate-600">
                {node.details.map((det) => (
                  <li key={det} className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                    <span>{det}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
