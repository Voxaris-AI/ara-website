import React from "react";
import Image from "next/image";
import { H2, Text } from "@/lib/components/text";
import styles from "./LineupCard.module.css";

type LineupCardVariant = "araGradient" | "ariGradient";

interface LineupCardProps {
  variant: LineupCardVariant;
}

export const LineupCard: React.FC<LineupCardProps> = ({ variant }) => {
  const isAra = variant === "araGradient";

  return (
    <div className={styles.card}>
      <div
        className={`${styles.inner} ${styles[variant]} ${
          isAra ? "" : styles.innerAri
        }`}
      >
        {isAra ? (
          <>
            <div className={styles.logoWrap} aria-hidden="true">
              <Image
                src="/ara-logo.png"
                alt=""
                width={360}
                height={140}
                className={`${styles.logo} ${styles.logoDefault}`}
                priority={false}
              />
              <Image
                src="/ara-logo-glow.png"
                alt=""
                width={360}
                height={140}
                className={`${styles.logo} ${styles.logoGlow}`}
                priority={false}
              />
            </div>

            <div className={styles.copyWrap}>
              <Text className={styles.copyText}>
                Ara is our intelligent clinical receptionist. Medical-grade and
                built for dental, GP and other healthcare clinics.
              </Text>
              <Text className={styles.copyText}>
                Ara answers your calls and ensures your patients get the care
                they deserve, even when you&apos;re not there
              </Text>
            </div>

            <Text
              className={styles.viewCta}
              style={{
                fontFamily:
                  "var(--font-ibm-plex-serif), 'IBM Plex Serif', serif",
              }}
            >
              <span className={styles.viewLabel}>View</span>
              <svg
                className={styles.viewIcon}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 9h10.5m0 0L9.2 4.7M13.5 9l-4.3 4.3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Text>
          </>
        ) : (
          <>
            <div
              className={`${styles.logoWrap} ${styles.logoWrapTop}`}
              aria-hidden="true"
            >
              <Image
                src="/ari-logo.png"
                alt=""
                width={360}
                height={140}
                className={`${styles.logo} ${styles.logoDefault}`}
                priority={false}
              />
              <Image
                src="/ari-logo-glow.png"
                alt=""
                width={360}
                height={140}
                className={`${styles.logo} ${styles.logoGlow}`}
                priority={false}
              />
            </div>

            <div className={styles.ariCenter}>
              <H2 className={styles.ariHeadline}>
                Coming <em>soon</em>
              </H2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
