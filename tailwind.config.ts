import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          cyan: "#06b6d4",     // OCR / Layout
          violet: "#8b5cf6",   // AI Reasoning / Neural
          emerald: "#10b981",  // Visual Grounding / Citations
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan-line 3s linear infinite",
        "float-slow": "float-slow-anim 6s ease-in-out infinite",
        "float-medium": "float-medium-anim 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse-anim 3s ease-in-out infinite",
        "border-glow": "border-glow-anim 4s linear infinite",
      },
      keyframes: {
        "scan-line": {
          "0%": { top: "0%" },
          "50%": { top: "100%" },
          "100%": { top: "0%" },
        },
        "float-slow-anim": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-12px) scale(1.02)" },
        },
        "float-medium-anim": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse-anim": {
          "0%, 100%": { opacity: "0.25", filter: "blur(40px)" },
          "50%": { opacity: "0.6", filter: "blur(60px)" },
        },
        "border-glow-anim": {
          "0%, 100%": { "border-color": "rgba(6, 182, 212, 0.2)" },
          "33%": { "border-color": "rgba(139, 92, 246, 0.2)" },
          "66%": { "border-color": "rgba(16, 185, 129, 0.2)" },
        }
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "radial-glowing": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [],
};
export default config;
