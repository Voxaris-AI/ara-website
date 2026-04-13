"use client";

import React from "react";
import { H1, H4, Text, Title } from "@/lib/components/text";
import styles from "./Impact.module.css";

type ImpactMetric = {
  value: string;
  description: string;
};

const METRICS: ImpactMetric[] = [
  {
    value: "40%",
    description:
      "Patients abandon calls if they can't get through within 15 seconds. To handle multiple calls at the same time, you'd need multiple receptionists",
  },
  {
    value: "30%",
    description:
      "Enquiries occur outside 9-5 after people finish work. Without automation, this is revenue left on the table.",
  },
  {
    value: "6hr",
    description:
      "Average amount of time required to fulfil all queries and FAQs on a weekend",
  },
];

interface ImpactProps {
  isDarkMode: boolean;
}

export const Impact: React.FC<ImpactProps> = ({ isDarkMode }) => {
  return (
    <section
      id="impact-section"
      className={`${styles.impactSection} ${
        isDarkMode ? styles.impactSectionDark : styles.impactSectionLight
      }`}
    >
      <div className={styles.impactFrame}>
        <H1
          className={`${styles.heading} ${isDarkMode ? styles.textLight : ""}`}
        >
          <em>Tired</em> of unanswered enquiries?
        </H1>
        <H4
          className={`${styles.subheading} ${isDarkMode ? styles.textMutedLight : ""}`}
        >
          Your patients are, too:
        </H4>

        <div className={styles.metricsRow}>
          {METRICS.map((metric) => (
            <article key={metric.value} className={styles.metricColumn}>
              <div className={styles.metricCard}>
                <Title className={styles.metricValue}>
                  <strong>
                    <em>{metric.value}</em>
                  </strong>
                </Title>
              </div>
              <Text
                className={`${styles.metricDescription} ${
                  isDarkMode ? styles.textLight : ""
                }`}
              >
                {metric.description}
              </Text>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
