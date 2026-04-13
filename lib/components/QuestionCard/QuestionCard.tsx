"use client";

import React, { useState } from "react";
import { Text } from "@/lib/components/text";
import styles from "./QuestionCard.module.css";

interface QuestionCardProps {
  question: string;
  answer: string;
  isDarkMode: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  isDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={styles.cardWrap}>
      <div
        className={`${styles.cardSurface} ${
          isDarkMode ? styles.cardButtonDark : styles.cardButtonLight
        }`}
      >
        <button
          type="button"
          className={styles.cardButton}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={`${isOpen ? "Collapse" : "Expand"} question: ${question}`}
        >
          <span className={styles.questionText}>{question}</span>
          <svg
            viewBox="0 0 24 24"
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`${styles.answerPanel} ${isOpen ? styles.answerOpen : ""}`}
        >
          <div className={styles.answerInner}>
            <Text
              className={styles.answerText}
              color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
            >
              {answer}
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
};
