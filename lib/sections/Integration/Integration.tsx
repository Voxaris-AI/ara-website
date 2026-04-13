"use client";

import Image from "next/image";
import React from "react";
import { FaCogs, FaStethoscope, FaTooth } from "react-icons/fa";
import { H2, H4 } from "@/lib/components/text";
import styles from "./Integration.module.css";

const CARD_CONTENT = [
  {
    title: "Dental Clinics",
    copy: "Automate high-volume admin tasks so your front desk can focus on in-clinic patients.",
    useCases: [
      "Book and reschedule appointments from inbound calls",
      "Run recall campaigns and rebook overdue patients",
      "Answer common treatment and billing questions instantly",
    ],
    ctaLabel: "Find out more",
    ctaHref: "#features-section",
    icon: <FaTooth className={styles.cardIcon} aria-hidden="true" />,
  },
  {
    title: "Healthcare Practices",
    copy: "Reduce reception pressure during peak times with calm, guided patient navigation.",
    useCases: [
      "Handle the 8am call rush with smart call routing",
      "Triage common requests before they reach clinicians",
      "Send follow-up messages and appointment reminders",
    ],
    ctaLabel: "Find out more",
    ctaHref: "#features-section",
    icon: <FaStethoscope className={styles.cardIcon} aria-hidden="true" />,
  },
  {
    title: "Custom Solutions",
    copy: "For enterprise teams with specialised workflows, we build around your exact operational model.",
    useCases: [
      "Bespoke automations for multi-site organisations",
      "Custom API integrations with internal systems",
      "Brand-safe patient journeys with governance controls",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "#contact-section",
    icon: <FaCogs className={styles.cardIcon} aria-hidden="true" />,
  },
] as const;

export const Integration: React.FC = () => {
  const [cardsVisible, setCardsVisible] = React.useState(false);
  const [bottomPanelVisible, setBottomPanelVisible] = React.useState(false);
  const cardRefs = React.useRef<Array<HTMLElement | null>>([]);
  const pointerFrameRef = React.useRef<number>(0);
  const pointerPositionRef = React.useRef<{ x: number; y: number } | null>(
    null,
  );
  const activeCardRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const section = document.getElementById("integration-section");

    if (!scrollContainer || !section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setCardsVisible(true);
      setBottomPanelVisible(true);
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
      setBottomPanelVisible(inSectionScroll > bottomTextRevealOffset);
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

  const resetCardInteraction = (cardElement: HTMLElement | null) => {
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
    (index: number) => (event: React.PointerEvent<HTMLElement>) => {
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
          <H2 className={styles.heading}>adapts to you</H2>
        </div>

        <H4 className={styles.topSubheading}>
          Ara connects with the systems your team already uses, so you can
          launch faster, keep patient context intact, and scale service quality
          without adding front-desk overhead.
        </H4>

        <div className={styles.cardsRow}>
          {CARD_CONTENT.map((card, index) => {
            const [firstWord, ...remainingWords] = card.title.split(" ");

            return (
              <article
                key={card.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                onPointerMove={onCardPointerMove(index)}
                onPointerLeave={onCardPointerLeave(index)}
                className={`${styles.integrationCard} ${styles.interactiveCard} ${styles.cardReveal} ${cardsVisible ? styles.cardVisible : ""}`}
              >
                <div className={styles.cardIconWrap}>{card.icon}</div>
                <h3 className={styles.cardTitle}>
                  <em>{firstWord}</em> {remainingWords.join(" ")}
                </h3>
                <p className={styles.cardCopy}>{card.copy}</p>

                <p className={styles.cardListLabel}>Use cases</p>
                <ul className={styles.cardList}>
                  {card.useCases.map((item) => (
                    <li key={item} className={styles.cardListItem}>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href={card.ctaHref} className={styles.cardCta}>
                  {card.ctaLabel}
                </a>
              </article>
            );
          })}
        </div>

        <div
          className={`${styles.rolloutPanel} ${styles.textReveal} ${bottomPanelVisible ? styles.textVisible : ""}`}
        >
          <p className={styles.rolloutTitle}>
            <em>How</em> rollout works
          </p>
          <div className={styles.rolloutSteps}>
            <div className={styles.rolloutStep}>
              <span className={styles.stepNumber}>1</span>
              <p className={styles.stepCopy}>
                We review your current tools and booking flow.
              </p>
            </div>
            <div className={styles.rolloutStep}>
              <span className={styles.stepNumber}>2</span>
              <p className={styles.stepCopy}>
                We connect Ara and test everything with your team.
              </p>
            </div>
            <div className={styles.rolloutStep}>
              <span className={styles.stepNumber}>3</span>
              <p className={styles.stepCopy}>
                You go live with support and check-ins whenever needed.
              </p>
            </div>
          </div>

          <H4 className={styles.bottomSubheading}>
            Our systems are built so that you can go live with us in days, not
            weeks.
          </H4>
        </div>
      </div>
    </section>
  );
};
