"use client";

import React, { useEffect, useState } from "react";
import { H1, H2, H4, Text } from "@/lib/components/text";
import { ScrollSection } from "@/lib/components/ScrollSection";
import { COLORS } from "@/lib/theme";
import styles from "./Contact.module.css";

interface ContactProps {
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [cardVisible, setCardVisible] = useState(false);
  const cardRef = React.useRef<HTMLAnchorElement | null>(null);
  const pointerFrameRef = React.useRef<number>(0);
  const pointerPositionRef = React.useRef<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const cardElement = cardRef.current;

    if (!cardElement || !scrollContainer) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setCardVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setCardVisible(true);
          observer.disconnect();
        }
      },
      {
        root: scrollContainer,
        threshold: [0.1, 0.2, 0.4],
      },
    );

    observer.observe(cardElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== 0) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);

  const resetCardInteraction = () => {
    const cardElement = cardRef.current;

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
    const cardElement = cardRef.current;
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

  const onCardPointerMove: React.PointerEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    if (event.pointerType === "touch") {
      return;
    }

    pointerPositionRef.current = { x: event.clientX, y: event.clientY };

    if (pointerFrameRef.current !== 0) {
      return;
    }

    pointerFrameRef.current =
      window.requestAnimationFrame(applyCardInteraction);
  };

  const onCardPointerLeave: React.PointerEventHandler<
    HTMLAnchorElement
  > = () => {
    pointerPositionRef.current = null;

    if (pointerFrameRef.current !== 0) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = 0;
    }

    resetCardInteraction();
  };

  const onCardBlur: React.FocusEventHandler<HTMLAnchorElement> = () => {
    pointerPositionRef.current = null;

    if (pointerFrameRef.current !== 0) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = 0;
    }

    resetCardInteraction();
  };

  return (
    <ScrollSection
      id="contact-section"
      backgroundColor={COLORS.darkGrey}
      contentPlacement="top"
      topOffsetMode="nav"
      visibilityThreshold={0.11}
      heightMode="twoThirds"
    >
      <H1
        className="text-center font-bold"
        color="textPrimaryDarkBg"
      >
        Talk <em>to us</em>
      </H1>
      <H4
        className="mx-auto mt-0 max-w-2xl text-center"
        color="textPrimaryDarkBg"
      >
        Interested in learning more about our products or
        <br />
        partnering with us? We&apos;d love to hear from you
      </H4>
      <div className="flex w-full items-center justify-center py-2">
        <a
          href="mailto:team@voxaris.ai"
          aria-label="Email Voxaris at team@voxaris.ai"
          ref={cardRef}
          onPointerMove={onCardPointerMove}
          onPointerLeave={onCardPointerLeave}
          onBlur={onCardBlur}
          className={`${styles.cardReveal} ${
            cardVisible ? styles.cardVisible : ""
          } ${styles.interactiveCard} block w-[min(calc((100vw-16px)*0.8),960px)] max-w-none rounded-[28px] bg-grey-glass p-px no-underline shadow-[0_14px_30px_rgba(0,0,0,0.28),0_4px_10px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 sm:w-[min(72vw,960px)]`}
        >
          <div
            className={`${styles.interactiveSurface} flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-[27px] bg-grey-glass px-6 py-5`}
          >
            <Text color="textPrimaryDarkBg" className="text-center">
              Email us at:
            </Text>
            <div className="flex items-center justify-center gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 7L12 13L20 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <H2
                color="textPrimaryDarkBg"
                className="text-center font-bold italic"
              >
                team@voxaris.ai
              </H2>
            </div>
          </div>
        </a>
      </div>
    </ScrollSection>
  );
};
