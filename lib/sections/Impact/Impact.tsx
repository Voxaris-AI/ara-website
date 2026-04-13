"use client";

import React, { useEffect, useState } from "react";
import { H2, H4 } from "@/lib/components/text";
import { ImpactCards, type ImpactMetric } from "./ImpactCards";
import styles from "./Impact.module.css";

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

const REVEAL_THRESHOLDS = [0, 0.34, 0.58];

interface ImpactProps {
  isDarkMode: boolean;
}

export const Impact: React.FC<ImpactProps> = ({ isDarkMode }) => {
  const [visibleMetrics, setVisibleMetrics] = useState<boolean[]>(() =>
    METRICS.map(() => false),
  );
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
          Your patients are, too:
        </H4>

        <ImpactCards
          metrics={METRICS}
          visibleMetrics={visibleMetrics}
          isDarkMode={isDarkMode}
          metricCardRefs={metricCardRefs}
          onCardPointerMove={onCardPointerMove}
          onCardPointerLeave={onCardPointerLeave}
        />
      </div>
    </section>
  );
};
