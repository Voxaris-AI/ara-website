import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#161616",
        foreground: "#ffffff",
        neutral: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        card: "rgba(40, 40, 40, 0.8)",
        "card-foreground": "#ffffff",
        primary: "#ffffff",
        "primary-foreground": "#161616",
        secondary: "#262626",
        "secondary-foreground": "#ffffff",
        muted: "#404040",
        "muted-foreground": "#d4d4d4",
        border: "rgba(255, 255, 255, 0.08)",
      },
      letterSpacing: {
        tight: "-0.025em",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
