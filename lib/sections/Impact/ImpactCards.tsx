"use client";

import React from "react";
import { Text, Title } from "@/lib/components/text";
import styles from "./Impact.module.css";

export type ImpactMetric = {
  value: string;
  description: string;
};

interface ImpactCardsProps {
  metrics: ImpactMetric[];
  visibleMetrics: boolean[];
  isDarkMode: boolean;
  metricCardRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  onCardPointerMove: (
    index: number,
  ) => (event: React.PointerEvent<HTMLDivElement>) => void;
  onCardPointerLeave: (index: number) => () => void;
}

export const ImpactCards: React.FC<ImpactCardsProps> = ({
  metrics,
  visibleMetrics,
  isDarkMode,
  metricCardRefs,
  onCardPointerMove,
  onCardPointerLeave,
}) => {
  return (
    <div className={styles.metricsRow}>
      {metrics.map((metric, index) => (
        <article
          key={metric.value}
          className={`${styles.metricColumn} ${styles.cardReveal} ${
            visibleMetrics[index] ? styles.cardVisible : ""
          }`}
        >
          <div
            ref={(element) => {
              metricCardRefs.current[index] = element;
            }}
            onPointerMove={onCardPointerMove(index)}
            onPointerLeave={onCardPointerLeave(index)}
            className={`${styles.metricCard} ${styles.interactiveCard}`}
          >
            <Title className={styles.metricValue}>{metric.value}</Title>
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
  );
};
