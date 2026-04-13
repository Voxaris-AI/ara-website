"use client";

import React from "react";
import { COLORS } from "@/lib/theme";
import styles from "./FeaturesBox.module.css";

export const FeaturesBox: React.FC = () => {
  return (
    <div className={styles.box} aria-label="Features layout preview">
      <div className={`${styles.card} ${styles.cardWideTop}`} />
      <div className={`${styles.card} ${styles.cardTinyTop}`} />
      <div className={`${styles.card} ${styles.cardTallRight}`} />
      <div className={`${styles.card} ${styles.cardWideBottom}`} />
      <div className={`${styles.card} ${styles.cardTinyBottom}`} />

      <style jsx>{`
        :global(.${styles.box}) {
          --features-box-bg: ${COLORS.darkerPurple};
          --features-card-bg: ${COLORS.darkPurple};
          --features-box-border: ${COLORS.araGlassGradient};
        }
      `}</style>
    </div>
  );
};
