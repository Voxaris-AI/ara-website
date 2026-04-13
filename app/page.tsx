"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/lib/components/Navbar";
import { ScrollContainer } from "@/lib/components/ScrollContainer";
import { Footer } from "@/lib/components/Footer";
import styles from "./page.module.css";

type SectionConfig = {
  id: string;
  title: string;
  background: string;
  color: string;
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);

    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  const sections: SectionConfig[] = [
    {
      id: "hero-section",
      title: "Hero",
      background: isDarkMode
        ? styles.bgAraGradientDark
        : styles.bgAraGradientLight,
      color: styles.textWhite,
    },
    {
      id: "impact-section",
      title: "Impact",
      background: isDarkMode ? styles.bgDullPurple : styles.bgLightLavender,
      color: isDarkMode ? styles.textWhite : styles.textDarkPurple,
    },
    {
      id: "integration-section",
      title: "Integration",
      background: styles.bgDarkerPurple,
      color: styles.textWhite,
    },
    {
      id: "features-section",
      title: "Features",
      background: isDarkMode ? styles.bgDullPurple : styles.bgLightLavender,
      color: isDarkMode ? styles.textWhite : styles.textDarkPurple,
    },
    {
      id: "faqs-section",
      title: "FAQs",
      background: isDarkMode ? styles.bgDullPurple : styles.bgLightLavender,
      color: isDarkMode ? styles.textWhite : styles.textDarkPurple,
    },
  ];

  return (
    <>
      <Navbar />
      <ScrollContainer>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`${styles.section} ${section.background} ${section.color}`}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          </section>
        ))}

        <Footer />
      </ScrollContainer>
    </>
  );
}
