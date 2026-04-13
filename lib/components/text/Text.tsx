"use client";

import React from "react";
import { COLORS, ColorKey } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <p
    style={{
      fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
      fontSize: "15px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </p>
);
