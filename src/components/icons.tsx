import React from "react";
import { 
  SiNextdotjs, 
  SiFastapi, 
  SiPostgresql, 
  SiVercel, 
  SiRender, 
  SiHuggingface, 
  SiPython, 
  SiSqlite 
} from "react-icons/si";
import { GiBrain, GiProcessor } from "react-icons/gi";
import { TbVectorTriangle, TbBinaryTree } from "react-icons/tb";

// We'll export react-icons wrappers and custom styled SVGs to avoid import issues.
export const NextjsIcon = () => <SiNextdotjs className="w-6 h-6 text-white" />;
export const FastapiIcon = () => <SiFastapi className="w-6 h-6 text-emerald-400" />;
export const PythonIcon = () => <SiPython className="w-6 h-6 text-blue-400" />;
export const PostgresIcon = () => <SiPostgresql className="w-6 h-6 text-sky-400" />;
export const SqliteIcon = () => <SiSqlite className="w-6 h-6 text-blue-500" />;
export const VercelIcon = () => <SiVercel className="w-6 h-6 text-white" />;
export const RenderIcon = () => <SiRender className="w-6 h-6 text-cyan-400" />;
export const HuggingFaceIcon = () => <SiHuggingface className="w-6 h-6 text-yellow-400" />;

// Highly customized SVGs or stylized components for unique AI technologies
export const GeminiIcon = () => (
  <span className="relative flex h-6 w-6 items-center justify-center">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-20"></span>
    <GiBrain className="relative w-6 h-6 text-violet-400" />
  </span>
);

export const OpenCVIcon = () => (
  <div className="flex gap-0.5 items-center justify-center">
    <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
    <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black -translate-y-1.5" />
    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-black" />
  </div>
);

export const EasyOcrIcon = () => (
  <div className="font-extrabold text-xs tracking-tighter bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30">
    OCR
  </div>
);

export const LayoutLMv3Icon = () => (
  <TbBinaryTree className="w-6 h-6 text-cyan-400" />
);

export const ClipIcon = () => (
  <TbVectorTriangle className="w-6 h-6 text-violet-400" />
);

export const FaissIcon = () => (
  <GiProcessor className="w-6 h-6 text-indigo-400" />
);

export const Bm25Icon = () => (
  <div className="font-mono font-bold text-[10px] tracking-tight bg-slate-800 text-emerald-400 px-1 py-0.5 rounded border border-emerald-500/20">
    BM25
  </div>
);
