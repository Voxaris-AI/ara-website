"use client";

import { H4, Title } from "@/lib/components/text";
import styles from "./Hero.module.css";

export function Hero() {
  const handleLearnMoreClick = () => {
    const scrollRoot = document.getElementById("scroll-container");
    const impactSection = document.getElementById("impact-section");

    if (impactSection && scrollRoot) {
      const sectionTop = impactSection.offsetTop;
      const maxSectionScroll = Math.max(
        0,
        impactSection.offsetHeight - scrollRoot.clientHeight,
      );
      const targetTop = Math.min(
        sectionTop + maxSectionScroll,
        scrollRoot.scrollHeight - scrollRoot.clientHeight,
      );

      scrollRoot.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }

    if (impactSection) {
      impactSection.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <section id="hero-section" className={styles.heroSection}>
      <div className={styles.heroFrame}>
        <div className={styles.copyCol}>
          <Title className={styles.title}>
            <strong>
              <em>Never</em>
            </strong>{" "}
            miss a patient again
          </Title>
          <H4 className={styles.subheading}>
            Ara answers your calls and ensures your patients get the care they
            deserve, even when you're not there
          </H4>

          <button
            type="button"
            onClick={handleLearnMoreClick}
            className={styles.learnMoreButton}
            aria-label="Learn more and scroll to the end of the impact section"
          >
            <span>Learn more</span>
            <svg
              viewBox="0 0 24 24"
              className={styles.learnMoreChevron}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6.5 9.5L12 15L17.5 9.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.previewBox} aria-hidden="true" />
      </div>
    </section>
  );
}
