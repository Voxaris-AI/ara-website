import type { Config } from "tailwindcss";
import { COLORS } from "./lib/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#161616",
        foreground: "#ffffff",
        textPrimaryDarkBg: COLORS.textPrimaryDarkBg,
        textSecondaryDarkBg: COLORS.textSecondaryDarkBg,
        darkGrey: COLORS.darkGrey,
        darkerGrey: COLORS.darkerGrey,
        darkerPurple: COLORS.darkerPurple,
        darkPurple: COLORS.darkPurple,
        dullPurple: COLORS.dullPurple,
        lightLavender: COLORS.lightLavender,
      },
      backgroundImage: {
        "grey-glass": COLORS.greyGlassGradient,
        "ara-glass": COLORS.araGlassGradient,
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "shooting-star": "shooting-star 3s ease-in-out infinite",
        "orbit-star-1": "orbit-1 20s linear infinite",
        "orbit-star-2": "orbit-2 20s linear infinite",
      },
      keyframes: {
        "shooting-star": {
          "0%": {
            transform: "translateX(-100px) translateY(100px)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(1000px) translateY(-1000px)",
            opacity: "0",
          },
        },
        "orbit-1": {
          "0%": {
            transform: "rotate(0deg) translateX(80px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(80px) rotate(-360deg)",
          },
        },
        "orbit-2": {
          "0%": {
            transform: "rotate(180deg) translateX(80px) rotate(-180deg)",
          },
          "100%": {
            transform: "rotate(540deg) translateX(80px) rotate(-540deg)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
