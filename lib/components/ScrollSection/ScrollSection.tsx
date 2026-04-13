"use client";

import React, { useEffect, useRef, useState } from "react";
import { COLORS, type ColorKey } from "@/lib/theme";
import styles from "./ScrollSection.module.css";

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
  backgroundColor?: ColorKey | string;
  contentPlacement?: "center" | "top";
  topOffsetMode?: "default" | "nav";
  visibilityThreshold?: number;
  heightMode?: "default" | "twoThirds";
}

const BACKGROUND_CLASS_MAP: Record<string, string> = {
  darkGrey: "bgDarkGrey",
  darkerGrey: "bgDarkerGrey",
  [COLORS.darkGrey]: "bgDarkGrey",
  [COLORS.darkerGrey]: "bgDarkerGrey",
  "#101010": "bgDark",
  "#f4f4f1": "bgLight",
  "#252525": "bgCharcoal",
};

export function ScrollSection({
  id,
  children,
  overlay,
  className,
  backgroundColor,
  contentPlacement = "center",
  topOffsetMode = "default",
  visibilityThreshold = 0.35,
  heightMode = "default",
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(
          entry.isIntersecting && entry.intersectionRatio > visibilityThreshold,
        );
      },
      {
        threshold: [0.1, visibilityThreshold, 0.6],
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [visibilityThreshold]);

  const sectionChildren = React.Children.toArray(children);
  const backgroundClass = backgroundColor
    ? styles[BACKGROUND_CLASS_MAP[backgroundColor] ?? ""]
    : "";
  const placementClass = contentPlacement === "top" ? styles.topAligned : "";
  const offsetClass = topOffsetMode === "nav" ? styles.navOffsetTop : "";
  const sectionHeightClass =
    heightMode === "twoThirds" ? styles.twoThirdsSection : "";
  const frameHeightClass =
    heightMode === "twoThirds" ? styles.twoThirdsFrame : "";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.section} ${sectionHeightClass} ${backgroundClass} ${className ?? ""}`}
    >
      <div
        className={`${styles.stickyFrame} ${frameHeightClass} ${placementClass} ${offsetClass}`}
      >
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          {sectionChildren.map((child, index) => (
            <div key={index} className={styles.revealItem}>
              {child}
            </div>
          ))}
        </div>
        {overlay}
      </div>
    </section>
  );
}
