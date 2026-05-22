"use client";

import React from "react";
import { Cpu, Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-slate-200 bg-white overflow-hidden z-10">
      {/* Background neon ambient light */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] rounded-full bg-brand-violet/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Info column */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center shadow-inner">
                  <Cpu className="w-4 h-4 text-brand-cyan" />
                </div>
              </div>
              <span className="font-bold tracking-tight text-slate-800 text-base">
                NEURAL<span className="text-brand-cyan">READ</span>
              </span>
            </a>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              An advanced AI system integrating layout understanding, visual grounding, and multi-modal reasoning engines to read documents semantic-first.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-cyan hover:border-brand-cyan/30 transition-all duration-300 shadow-sm"
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-cyan hover:border-brand-cyan/30 transition-all duration-300 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@neuralread.ai" 
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-cyan hover:border-brand-cyan/30 transition-all duration-300 shadow-sm"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider text-slate-800 uppercase">SYSTEM MODULES</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#workflow" className="text-slate-500 hover:text-brand-cyan transition-colors">
                  OCR Engine
                </a>
              </li>
              <li>
                <a href="#workflow" className="text-slate-500 hover:text-brand-cyan transition-colors">
                  Layout LM
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-slate-500 hover:text-brand-cyan transition-colors">
                  Hybrid Search
                </a>
              </li>
              <li>
                <a href="#demo" className="text-slate-500 hover:text-brand-cyan transition-colors">
                  Visual Grounding Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Publications/Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider text-slate-800 uppercase">RESOURCES</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-cyan transition-colors flex items-center gap-1">
                  Research Abstract <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-cyan transition-colors flex items-center gap-1">
                  LayoutLMv3 Paper <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-cyan transition-colors flex items-center gap-1">
                  Gemini API Docs <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-cyan transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-mono">
            &copy; {currentYear} NEURAL READ SYSTEM. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            Designed for <span className="text-brand-violet hover:underline cursor-pointer">Multimodal Document Intelligence Research</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
