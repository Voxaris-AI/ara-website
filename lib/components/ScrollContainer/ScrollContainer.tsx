"use client";

import React from "react";
import styles from "./ScrollContainer.module.css";

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollContainer({ children, className }: ScrollContainerProps) {
  return (
    <main
      id="scroll-container"
      className={`${styles.container} ${className ?? ""}`}
    >
      {children}
    </main>
  );
}
