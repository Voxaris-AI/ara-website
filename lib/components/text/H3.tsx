"use client";

import React from "react";
import { COLORS, ColorKey, TYPOGRAPHY } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const H3: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <h3
    style={{
      fontFamily: "var(--font-ibm-plex-serif), 'IBM Plex Serif', serif",
      letterSpacing: TYPOGRAPHY.ibmPlexSerifLetterSpacing,
      fontSize: "20px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </h3>
);
