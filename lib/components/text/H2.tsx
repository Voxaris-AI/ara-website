"use client";

import React from "react";
import { COLORS, ColorKey, TYPOGRAPHY } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const H2: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <h2
    style={{
      fontFamily: "var(--font-ibm-plex-serif), 'IBM Plex Serif', serif",
      letterSpacing: TYPOGRAPHY.ibmPlexSerifLetterSpacing,
      fontSize: "25px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </h2>
);
