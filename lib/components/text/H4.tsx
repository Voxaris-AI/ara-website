"use client";

import React from "react";
import { COLORS, ColorKey, TYPOGRAPHY } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const H4: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <h4
    style={{
      fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
      fontSize: "15px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </h4>
);
