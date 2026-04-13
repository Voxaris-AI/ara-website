"use client";

import React from "react";
import { ColorKey } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

const COLOR_CLASS_MAP: Record<ColorKey, string> = {
  greyGlassGradient: "text-[#b4b4b4]",
  araGradient: "text-[#b4b4b4]",
  ariGradient: "text-[#b4b4b4]",
  white: "text-[#ffffff]",
  navbarButtonBg: "text-[#ffffff]",
  textPrimaryDarkBg: "text-[#ffffff]",
  textLightBg: "text-[#0e0e0e]",
  darkGrey: "text-[#2b2b2b]",
  darkerGrey: "text-[#1b1b1b]",
  textSecondaryDarkBg: "text-[#b4b4b4]",
};

export const FooterText: React.FC<TextProps> = ({
  color = "textSecondaryDarkBg",
  children,
  className,
  ...props
}) => (
  <footer
    className={`font-sans text-[12px] ${COLOR_CLASS_MAP[color]} ${className ?? ""}`}
    {...props}
  >
    {children}
  </footer>
);
