"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaComments, FaPhoneAlt } from "react-icons/fa";
import { H2, H4 } from "@/lib/components/text";
import { ImpactCards, type ImpactMetric } from "./ImpactCards";
import styles from "./Impact.module.css";

const METRICS: ImpactMetric[] = [
  {
    value: "40%",
    label: "Calls dropped",
    description: "Patients may hang up if no one answers quickly.",
    insight:
      "When call volume spikes, missed calls turn into missed bookings and unhappy patients.",
  },
  {
    value: "30%",
    label: "After-hours demand",
    description: "A large share of enquiries come in outside 9 to 5.",
    insight:
      "If nobody is available after hours, new patient opportunities are lost before morning.",
  },
  {
    value: "6hr",
    label: "Weekend admin load",
    description: "Teams spend hours handling repeat calls and FAQs.",
    insight:
      "Routine questions consume staff time that could be spent on patient-facing care.",
  },
];

const REVEAL_THRESHOLDS = [0, 0.34, 0.58];

const OUTCOME_ITEMS = [
  {
    text: "Fewer missed booking opportunities",
    icon: <FaPhoneAlt className={styles.outcomeIcon} aria-hidden="true" />,
  },
  {
    text: "Less pressure on reception teams",
    icon: <FaComments className={styles.outcomeIcon} aria-hidden="true" />,
  },
  {
    text: "More consistent patient experience",
    icon: <FaCalendarCheck className={styles.outcomeIcon} aria-hidden="true" />,
  },
] as const;

interface ImpactProps {
  isDarkMode: boolean;
}

export const Impact: React.FC<ImpactProps> = ({ isDarkMode }) => {
  const [visibleMetrics, setVisibleMetrics] = useState<boolean[]>(() =>
    METRICS.map(() => false),
  );
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);
  const metricCardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const pointerFrameRef = React.useRef<number>(0);
  const pointerPositionRef = React.useRef<{ x: number; y: number } | null>(
    null,
  );
  const activeCardRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const section = document.getElementById("impact-section");

    if (!section || !scrollContainer) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setVisibleMetrics(METRICS.map(() => true));
      return;
    }

    let rafId = 0;

    const updateRevealState = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;
      const scrollableSectionDistance = Math.max(
        1,
        sectionHeight - viewportHeight,
      );
      const rawProgress = (scrollTop - sectionTop) / scrollableSectionDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      let nextActiveMetricIndex = 0;

      for (let index = 0; index < REVEAL_THRESHOLDS.length; index += 1) {
        const threshold = REVEAL_THRESHOLDS[index] ?? 1;

        if (progress > threshold) {
          nextActiveMetricIndex = index;
        }
      }

      setActiveMetricIndex(nextActiveMetricIndex);

      setVisibleMetrics((currentVisibleMetrics) => {
        const nextVisibleMetrics = [...currentVisibleMetrics];

        for (let index = 0; index < METRICS.length; index += 1) {
          const threshold = REVEAL_THRESHOLDS[index] ?? 1;
          nextVisibleMetrics[index] = progress > threshold;
        }

        return nextVisibleMetrics;
      });
      rafId = 0;
    };

    const onScrollOrResize = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(updateRevealState);
    };

    updateRevealState();
    scrollContainer.addEventListener("scroll", onScrollOrResize, {
      passive: true,
    });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }

      scrollContainer.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== 0) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);

  const resetCardInteraction = (cardElement: HTMLDivElement | null) => {
    if (!cardElement) {
      return;
    }

    cardElement.style.setProperty("--card-mx", "50%");
    cardElement.style.setProperty("--card-my", "50%");
    cardElement.style.setProperty("--card-shadow-rx", "0");
    cardElement.style.setProperty("--card-shadow-ry", "0");
    cardElement.style.setProperty("--card-glow-alpha", "0");
  };

  const applyCardInteraction = () => {
    pointerFrameRef.current = 0;
    const cardElement = activeCardRef.current;
    const pointer = pointerPositionRef.current;

    if (!cardElement || !pointer) {
      return;
    }

    const rect = cardElement.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(rect.width, pointer.x - rect.left));
    const relativeY = Math.max(0, Math.min(rect.height, pointer.y - rect.top));
    const normalizedX = relativeX / rect.width - 0.5;
    const normalizedY = relativeY / rect.height - 0.5;

    cardElement.style.setProperty("--card-mx", `${relativeX}px`);
    cardElement.style.setProperty("--card-my", `${relativeY}px`);
    cardElement.style.setProperty(
      "--card-shadow-rx",
      `${normalizedX.toFixed(3)}`,
    );
    cardElement.style.setProperty(
      "--card-shadow-ry",
      `${normalizedY.toFixed(3)}`,
    );
    cardElement.style.setProperty("--card-glow-alpha", "1");
  };

  const onCardPointerMove =
    (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      const cardElement = metricCardRefs.current[index] ?? null;
      activeCardRef.current = cardElement;
      pointerPositionRef.current = { x: event.clientX, y: event.clientY };

      if (pointerFrameRef.current !== 0) {
        return;
      }

      pointerFrameRef.current =
        window.requestAnimationFrame(applyCardInteraction);
    };

  const onCardPointerLeave = (index: number) => () => {
    const cardElement = metricCardRefs.current[index] ?? null;

    if (pointerFrameRef.current !== 0) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = 0;
    }

    if (activeCardRef.current === cardElement) {
      activeCardRef.current = null;
    }

    pointerPositionRef.current = null;
    resetCardInteraction(cardElement);
  };

  return (
    <section
      id="impact-section"
      className={`${styles.impactSection} ${
        isDarkMode ? styles.impactSectionDark : styles.impactSectionLight
      }`}
    >
      <div className={styles.impactFrame}>
        <H2
          className={`${styles.heading} ${isDarkMode ? styles.textLight : ""}`}
        >
          <strong>
            <em>Tired</em>
          </strong>{" "}
          of unanswered enquiries?
        </H2>
        <H4
          className={`${styles.subheading} ${isDarkMode ? styles.textMutedLight : ""}`}
        >
          Your patients feel it first, and your team feels it every day.
        </H4>

        <div
          className={`${styles.progressWrap} ${isDarkMode ? styles.progressWrapDark : ""} ${
            activeMetricIndex === 0
              ? styles.progressAtOne
              : activeMetricIndex === 1
                ? styles.progressAtTwo
                : styles.progressAtThree
          }`}
        >
          <div className={styles.progressTrack}>
            <span className={styles.progressFill} />
          </div>
          <div className={styles.progressLabels}>
            {METRICS.map((metric, index) => (
              <span
                key={metric.label}
                className={`${styles.progressLabel} ${
                  index <= activeMetricIndex ? styles.progressLabelActive : ""
                }`}
              >
                {metric.label}
              </span>
            ))}
          </div>
        </div>

        <ImpactCards
          metrics={METRICS}
          visibleMetrics={visibleMetrics}
          activeMetricIndex={activeMetricIndex}
          isDarkMode={isDarkMode}
          metricCardRefs={metricCardRefs}
          onCardPointerMove={onCardPointerMove}
          onCardPointerLeave={onCardPointerLeave}
        />

        <div
          className={`${styles.outcomePanel} ${styles.outcomeReveal} ${
            visibleMetrics[2] ? styles.outcomeVisible : ""
          } ${isDarkMode ? styles.outcomePanelDark : ""}`}
        >
          <p className={styles.outcomeTitle}>
            What this means for your practice
          </p>
          <ul className={styles.outcomeList}>
            {OUTCOME_ITEMS.map((item) => (
              <li key={item.text} className={styles.outcomeItem}>
                <span className={styles.outcomeIconWrap}>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
