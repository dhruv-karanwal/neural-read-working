import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import CanvasParticles from "@/components/ui/CanvasParticles";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Advanced Neural Machine Reading with Visual Grounding",
  description: "Multimodal AI-Powered Document Intelligence System using layout understanding, spatial visual grounding, hybrid semantic retrieval, and deep reasoning.",
  keywords: [
    "Neural Machine Reading",
    "Visual Grounding",
    "Document Understanding",
    "Multimodal AI",
    "OCR RAG",
    "LayoutLMv3",
    "Gemini RAG",
    "OpenCV",
    "FAISS vector search"
  ],
  authors: [{ name: "Multimodal AI Research Group" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} antialiased bg-[#f8fafc] text-slate-900 font-sans selection:bg-brand-cyan/20 selection:text-brand-cyan-700`}>
        {/* Floating particles network background */}
        <CanvasParticles />
        
        {/* Main layout container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
