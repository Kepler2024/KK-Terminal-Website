import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        terminal: {
          bg: "#0a0a0a",
          bg2: "#0d0d0d",
          bg3: "#111111",
          green: "#00ff41",
          "green-dim": "#00cc33",
          "green-dark": "#00aa2a",
          "green-muted": "#006618",
          white: "#eeeeee",
          amber: "#ffb800",
          cyan: "#00e5ff",
          red: "#ff3333",
          comment: "#3a5a3a",
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        fadeIn: "fadeIn 0.8s ease forwards",
        fadeInDelay1: "fadeIn 0.8s ease 0.3s forwards",
        fadeInDelay2: "fadeIn 0.8s ease 0.8s forwards",
        fadeInDelay3: "fadeIn 0.8s ease 1.2s forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(15px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
