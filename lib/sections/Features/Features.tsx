"use client";

import React from "react";
import { FeaturesBox } from "@/lib/components/FeaturesBox";
import { H2 } from "@/lib/components/text";
import styles from "./Features.module.css";

interface FeaturesProps {
  isDarkMode: boolean;
}

export const Features: React.FC<FeaturesProps> = ({ isDarkMode }) => {
  return (
    <section
      id="features-section"
      className={`${styles.featuresSection} ${
        isDarkMode ? styles.featuresSectionDark : styles.featuresSectionLight
      }`}
    >
      <div className={styles.featuresFrame}>
        <H2
          className={`${styles.heading} ${isDarkMode ? styles.headingDark : ""}`}
        >
          <strong>
            <em>Everything</em>
          </strong>{" "}
          you need
        </H2>

        <FeaturesBox />
      </div>
    </section>
  );
};
