"use client";

import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import SystemWorkflow from "@/components/sections/SystemWorkflow";
import Architecture from "@/components/sections/Architecture";
import MultimodalAI from "@/components/sections/MultimodalAI";
import LivePipeline from "@/components/sections/LivePipeline";
import Features from "@/components/sections/Features";
import TechStack from "@/components/sections/TechStack";
import Applications from "@/components/sections/Applications";
import Deployment from "@/components/sections/Deployment";
import ProjectInfo from "@/components/sections/ProjectInfo";
import Footer from "@/components/sections/Footer";


export default function Home() {
  return (
    <>
      {/* Top Floating Glass Navigation Header */}
      <Navbar />

      {/* Main Single Page Application Content Layers */}
      <main className="flex-grow">
        {/* Section 1: Futuristic Animated Hero Header */}
        <Hero />

        {/* Section 2: Core Innovation Problem & Solution Introduction */}
        <Introduction />

        {/* Section 3: 8-Step Interactive Operational Workflow */}
        <SystemWorkflow />

        {/* Section 4: 8-Layer Interactive Architecture Blueprint */}
        <Architecture />

        {/* Section 5: Theoretical Core - Multimodal Fusion Concepts */}
        <MultimodalAI />

        {/* Section 6: Real-time Dynamic Pipeline Data-Pulse Simulator */}
        <LivePipeline />



        {/* Section 8: Technical Feature Grid Matrix */}
        <Features />

        {/* Section 9: Fused Technology Stack Icons Subsystems */}
        <TechStack />

        {/* Section 10: Industry Impact Domains Applications */}
        <Applications />

        {/* Section 11: Scalable Cloud Architecture Deployment Routing */}
        <Deployment />

        {/* Section 12: Academic Thesis Project Credentials & Stats */}
        <ProjectInfo />
      </main>

      {/* Futuristic Ambient Bottom Gradient Footer */}
      <Footer />
    </>
  );
}
