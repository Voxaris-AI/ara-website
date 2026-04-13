"use client";

import React, { useEffect, useState } from "react";
import { H1, H4 } from "@/lib/components/text";
import { LineupCard } from "@/lib/components/LineupCard";
import { ScrollSection } from "@/lib/components/ScrollSection";
import { COLORS } from "@/lib/theme";
import styles from "./Products.module.css";

interface ProductsProps {
  isDarkMode: boolean;
}

export const Products: React.FC<ProductsProps> = ({ isDarkMode }) => {
  const [firstCardVisible, setFirstCardVisible] = useState(false);
  const [secondCardVisible, setSecondCardVisible] = useState(false);
  const firstCardRef = React.useRef<HTMLAnchorElement | null>(null);
  const secondCardRef = React.useRef<HTMLAnchorElement | null>(null);
  const pointerFrameRef = React.useRef<number>(0);
  const pointerPositionRef = React.useRef<{ x: number; y: number } | null>(
    null,
  );
  const activeCardRef = React.useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const section = document.getElementById("products-section");

    if (!section || !scrollContainer) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setFirstCardVisible(true);
      setSecondCardVisible(true);
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

      setFirstCardVisible(progress > 0.1);
      setSecondCardVisible(progress > 0.4);
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

  const resetCardInteraction = (cardElement: HTMLAnchorElement | null) => {
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
    (cardRef: React.RefObject<HTMLAnchorElement | null>) =>
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      activeCardRef.current = cardRef.current;
      pointerPositionRef.current = { x: event.clientX, y: event.clientY };

      if (pointerFrameRef.current !== 0) {
        return;
      }

      pointerFrameRef.current =
        window.requestAnimationFrame(applyCardInteraction);
    };

  const onCardPointerLeave =
    (cardRef: React.RefObject<HTMLAnchorElement | null>) => () => {
      const cardElement = cardRef.current;

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
    <ScrollSection
      id="products-section"
      className={styles.extendedScrollRoom}
      backgroundColor={isDarkMode ? COLORS.darkerGrey : COLORS.white}
      contentPlacement="top"
      topOffsetMode="nav"
      visibilityThreshold={0.11}
    >
      <H1
        className="text-center font-bold"
        color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
      >
        Our <em>lineup</em>
      </H1>
      <H4
        className="mx-auto mt-0 max-w-2xl text-center"
        color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
      >
        Our selection of voice-enabled AI tools for every industry
      </H4>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-10">
        <a
          href="https://ara.voxaris.ai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Ara product in a new tab"
          ref={firstCardRef}
          onPointerMove={onCardPointerMove(firstCardRef)}
          onPointerLeave={onCardPointerLeave(firstCardRef)}
          className={`${styles.cardReveal} ${
            firstCardVisible ? styles.cardVisible : ""
          } ${styles.interactiveCard}`}
        >
          <div className={styles.interactiveSurface}>
            <LineupCard variant="araGradient" />
          </div>
        </a>
        <a
          href="#"
          aria-label="View Ari product"
          ref={secondCardRef}
          onPointerMove={onCardPointerMove(secondCardRef)}
          onPointerLeave={onCardPointerLeave(secondCardRef)}
          className={`${styles.cardReveal} ${
            secondCardVisible ? styles.cardVisible : ""
          } ${styles.interactiveCard}`}
        >
          <div className={styles.interactiveSurface}>
            <LineupCard variant="ariGradient" />
          </div>
        </a>
      </div>
    </ScrollSection>
  );
};
