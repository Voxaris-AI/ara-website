"use client";

import React from "react";
import { QuestionCard } from "@/lib/components/QuestionCard";
import { H2 } from "@/lib/components/text";
import styles from "./FAQs.module.css";

interface FAQsProps {
  isDarkMode: boolean;
}

const QUESTIONS = [
  "Do you replace our reception team?",
  "What practice systems do you integrate with?",
  "Can I keep using my existing business phone number?",
  "Would using this service breach data protection laws or terms in my contract?",
  "Can Ara handle multiple calls at once?",
  "How easy is it to get set up?",
];

export const FAQs: React.FC<FAQsProps> = ({ isDarkMode }) => {
  return (
    <section
      id="faqs-section"
      className={`${styles.faqsSection} ${
        isDarkMode ? styles.faqsSectionDark : styles.faqsSectionLight
      }`}
    >
      <div className={styles.faqsFrame}>
        <H2
          className={styles.heading}
          color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
        >
          <strong>
            <em>Your questions</em>
          </strong>
          , answered
        </H2>

        <div className={styles.cardsStack}>
          {QUESTIONS.map((question) => (
            <QuestionCard
              key={question}
              question={question}
              answer="placeholder"
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
