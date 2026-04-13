"use client";

import Image from "next/image";
import React from "react";
import { H1, H4 } from "@/lib/components/text";
import { COLORS } from "@/lib/theme";
import styles from "./Integration.module.css";

export const Integration: React.FC = () => {
  return (
    <section id="integration-section" className={styles.integrationSection}>
      <div className={styles.integrationFrame}>
        <div className={styles.headingRow}>
          <Image
            src="/ara-logo.png"
            alt="Ara"
            width={180}
            height={62}
            className={styles.araLogo}
            priority={false}
          />
          <H1 className={styles.heading}>handles it all</H1>
        </div>

        <H4 className={styles.topSubheading}>
          Ara is built to adapt to and learn your workflows, whether you're a
          singular clinic or a chain of practices
        </H4>

        <div className={styles.cardsRow}>
          <div className={styles.integrationCard} aria-hidden="true" />
          <div className={styles.integrationCard} aria-hidden="true" />
          <div className={styles.integrationCard} aria-hidden="true" />
        </div>

        <H4 className={styles.bottomSubheading}>
          Integration is seamless and we can get set up with your systems within
          days, not months
        </H4>
      </div>

      <style jsx>{`
        :global(.${styles.integrationCard}) {
          --integration-card-bg: ${COLORS.darkPurple};
        }
      `}</style>
    </section>
  );
};
