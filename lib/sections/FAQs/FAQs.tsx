"use client";

import React from "react";
import { QuestionCard } from "@/lib/components/QuestionCard";
import { H2 } from "@/lib/components/text";
import styles from "./FAQs.module.css";

interface FAQsProps {
  isDarkMode: boolean;
}

const FAQ_ITEMS = [
  {
    question: "How easy is it to get set up?",
    answer:
      "Most teams can get started quickly. We map your call flows, connect required systems, and test safely before going live so disruption stays minimal.",
  },
  {
    question: "What practice systems do you integrate with?",
    answer:
      "Ara is built to integrate with common GP and clinic workflows, including telephony, scheduling, and CRM or patient management tools. We confirm compatibility during onboarding and tailor setup to your current stack.",
  },
  {
    question: "Does it integrate with my calendar?",
    answer:
      "Yes. Ara can integrate with supported calendars and scheduling systems so it can offer or capture appointment options in line with your availability rules.",
  },
  {
    question: "Can I keep using my existing business phone number?",
    answer:
      "Yes. In most cases Ara can work behind your current number so patients continue calling the same line, with no change to your public contact details.",
  },
  {
    question: "Is patient data secure?",
    answer:
      "Yes. Patient data is protected with encryption, role-based access controls, and secure infrastructure practices. Access is tightly controlled and monitored to protect sensitive information.",
  },
  {
    question: "How do you stay compliant with healthcare data regulations?",
    answer:
      "Ara is deployed with privacy and compliance controls in mind, including strict access controls, auditable workflows, and data handling aligned with UK healthcare and data protection requirements.",
  },
  {
    question: "What happens if Ara does not know the answer?",
    answer:
      "If confidence is low, Ara does not guess. It can escalate to your team, collect a callback request, or route the caller to the right person with a clear handover note.",
  },
  {
    question: "Do you replace our reception team?",
    answer:
      "No. Ara is designed to support your team by handling routine calls, triaging common requests, and reducing queue pressure so staff can focus on higher-value patient care.",
  },
  {
    question: "Can Ara handle multiple calls at once?",
    answer:
      "Yes. Ara can manage many concurrent calls, helping reduce missed enquiries during peak times while keeping response quality consistent.",
  },
  {
    question: "Does Ara sound like a robot?",
    answer:
      "Ara is tuned to sound natural, clear, and professional. It uses conversational pacing and context-aware replies to feel human-like while remaining concise and accurate.",
  },
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
          {FAQ_ITEMS.map(({ question, answer }) => (
            <QuestionCard
              key={question}
              question={question}
              answer={answer}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
