"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DemoModal } from "../DemoModal";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Impact", sectionId: "impact-section" },
  { label: "Integration", sectionId: "integration-section" },
  { label: "Features", sectionId: "features-section" },
  { label: "FAQs", sectionId: "faqs-section" },
];

const BOTTOM_SCROLL_SECTION_IDS = new Set([
  "impact-section",
  "integration-section",
]);

export const Navbar: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [isScrolledFromHero, setIsScrolledFromHero] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-container");
    const trackedSections = NAV_LINKS.map(({ sectionId }) =>
      document.getElementById(sectionId),
    ).filter((section): section is HTMLElement => Boolean(section));

    if (!scrollRoot || trackedSections.length === 0) {
      return;
    }

    const updateScrolledState = () => {
      const currentScroll = scrollRoot.scrollTop;
      setIsScrolledFromHero(currentScroll > 8);

      const viewportHeight = scrollRoot.clientHeight;
      const viewportCenter = currentScroll + viewportHeight / 2;

      const activeSection = trackedSections.find((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        return viewportCenter >= sectionTop && viewportCenter < sectionBottom;
      })?.id;

      if (activeSection) {
        setActiveSectionId(activeSection);
      } else {
        setActiveSectionId("");
      }
    };

    updateScrolledState();
    scrollRoot.addEventListener("scroll", updateScrolledState, {
      passive: true,
    });

    return () => {
      scrollRoot.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const scrollRoot = document.getElementById("scroll-container");
    const section = document.getElementById(sectionId);

    if (section && scrollRoot) {
      if (BOTTOM_SCROLL_SECTION_IDS.has(sectionId)) {
        const targetTop = Math.max(
          0,
          section.offsetTop + section.offsetHeight - scrollRoot.clientHeight,
        );
        scrollRoot.scrollTo({ top: targetTop, behavior: "smooth" });
        return;
      }

      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogoClick = () => {
    scrollToSection("hero-section");
  };

  const openDemoModal = () => {
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${
          isScrolledFromHero ? `${styles.navbarVisible} bg-ara-glass` : ""
        }`}
      >
        <button
          type="button"
          aria-label="Scroll to hero section"
          onClick={handleLogoClick}
          className={styles.logoButton}
        >
          <span className={styles.logoStack}>
            <Image
              src="/ara.png"
              alt="Ara Logo"
              width={240}
              height={120}
              className={`${styles.logo} ${styles.logoBase}`}
            />
            <Image
              src="/ara-glow.png"
              alt=""
              aria-hidden="true"
              width={240}
              height={120}
              className={`${styles.logo} ${styles.logoGlow}`}
            />
          </span>
        </button>

        <div className={styles.actions}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              onClick={() => scrollToSection(link.sectionId)}
              className={`${styles.linkButton} ${
                activeSectionId === link.sectionId
                  ? styles.linkButtonActive
                  : ""
              }`}
              aria-current={
                activeSectionId === link.sectionId ? "page" : undefined
              }
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            className={styles.demoButton}
            onClick={openDemoModal}
            aria-haspopup="dialog"
          >
            <span className={styles.demoButtonText}>Book a Demo</span>
          </button>
        </div>
      </nav>

      <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
    </>
  );
};
