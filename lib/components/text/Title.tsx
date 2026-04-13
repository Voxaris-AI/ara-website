"use client";

import React from "react";
import { COLORS, ColorKey, TYPOGRAPHY } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const Title: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <div
    style={{
      fontFamily: "var(--font-ibm-plex-serif), 'IBM Plex Serif', serif",
      letterSpacing: TYPOGRAPHY.ibmPlexSerifLetterSpacing,
      lineHeight: "1.1",
      fontSize: "85px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
