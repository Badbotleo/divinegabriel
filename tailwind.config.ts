import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Original light theme (kept for detail / admin / card pages) ──
        ink: "#0A0A0A",
        muted: "#6B6B6B",
        line: "#E5E5E5",
        panel: "#F8F8F8",
        purple: "#534AB7",
        navy: "#0A1628",
        green: "#1A7A4A",
        gold: "#FAC775",

        // ── Futuristic dark theme (homepage) ──
        void: "#05060B",
        panel1: "#0A0C15",
        panel2: "#0E1120",
        edge: "rgba(255,255,255,0.09)",
        "text-hi": "#EEF1FA",
        "text-lo": "#8B93AC",
        violet: "#7C6BFF",
        cyan: "#38E0FF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1120px",
      },
      boxShadow: {
        glow: "0 0 44px -10px rgba(124,107,255,0.6)",
        "glow-cyan": "0 0 44px -10px rgba(56,224,255,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
