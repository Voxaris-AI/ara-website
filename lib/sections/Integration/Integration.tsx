"use client";

import Image from "next/image";
import React from "react";
import { FaCogs, FaStethoscope, FaTooth } from "react-icons/fa";
import { H2, H4 } from "@/lib/components/text";
import { COLORS } from "@/lib/theme";
import styles from "./Integration.module.css";

const CARD_CONTENT = [
  {
    title: "Dental Clinics",
    copy: "From first enquiry to follow-up reminders, Ara keeps your front desk responsive so patients always feel looked after.",
    icon: <FaTooth className={styles.cardIcon} aria-hidden="true" />,
  },
  {
    title: "Healthcare Practices",
    copy: "Perfect for multidisciplinary teams that need dependable call handling, triage support, and clear patient communication at scale.",
    icon: <FaStethoscope className={styles.cardIcon} aria-hidden="true" />,
  },
  {
    title: "Custom Solutions",
    copy: "Need a bespoke workflow? We configure Ara around your systems and processes for a seamless, branded patient experience.",
    icon: <FaCogs className={styles.cardIcon} aria-hidden="true" />,
  },
] as const;

export const Integration: React.FC = () => {
  const [cardsVisible, setCardsVisible] = React.useState(false);
  const [bottomTextVisible, setBottomTextVisible] = React.useState(false);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const pointerFrameRef = React.useRef<number>(0);
  const pointerPositionRef = React.useRef<{ x: number; y: number } | null>(
    null,
  );
  const activeCardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const section = document.getElementById("integration-section");

    if (!scrollContainer || !section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setCardsVisible(true);
      setBottomTextVisible(true);
      return;
    }

    let rafId = 0;

    const updateRevealState = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;

      const revealStart = sectionTop - viewportHeight;
      const revealDistance = Math.max(1, viewportHeight + sectionHeight);
      const rawProgress = (scrollTop - revealStart) / revealDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      const inSectionScroll = scrollTop - sectionTop;
      const bottomTextRevealOffset = viewportHeight * 0.38;

      setCardsVisible(progress > 0.18);
      setBottomTextVisible(inSectionScroll > bottomTextRevealOffset);
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

  React.useEffect(() => {
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

      const cardElement = cardRefs.current[index] ?? null;
      activeCardRef.current = cardElement;
      pointerPositionRef.current = { x: event.clientX, y: event.clientY };

      if (pointerFrameRef.current !== 0) {
        return;
      }

      pointerFrameRef.current =
        window.requestAnimationFrame(applyCardInteraction);
    };

  const onCardPointerLeave = (index: number) => () => {
    const cardElement = cardRefs.current[index] ?? null;

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
    <section id="integration-section" className={styles.integrationSection}>
      <div className={styles.integrationFrame}>
        <div className={styles.headingRow}>
          <Image
            src="/ara.png"
            alt="Ara"
            width={80}
            height={50}
            className={styles.araLogo}
            priority={false}
          />
          <H2 className={styles.heading}>handles it all</H2>
        </div>

        <H4 className={styles.topSubheading}>
          Ara is built to adapt to and learn your workflows, whether you&apos;re
          a singular clinic or a chain of practices
        </H4>

        <div className={styles.cardsRow}>
          {CARD_CONTENT.map((card, index) => (
            <div
              key={card.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              onPointerMove={onCardPointerMove(index)}
              onPointerLeave={onCardPointerLeave(index)}
              className={`${styles.integrationCard} ${styles.interactiveCard} ${styles.cardReveal} ${cardsVisible ? styles.cardVisible : ""}`}
            >
              <div className={styles.cardIconWrap}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardCopy}>{card.copy}</p>
            </div>
          ))}
        </div>

        <H4
          className={`${styles.bottomSubheading} ${styles.textReveal} ${bottomTextVisible ? styles.textVisible : ""}`}
        >
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
