"use client";

import { useEffect, useState } from "react";
import { H4, Title } from "@/lib/components/text";
import { ScrollSection } from "@/lib/components/ScrollSection";
import { TYPING_WORDS } from "./typingWords";

const FALLBACK_WORDS = ["simplicity"];
const WORDS = TYPING_WORDS.length > 0 ? TYPING_WORDS : FALLBACK_WORDS;
const LONGEST_WORD = WORDS.reduce(
  (longest, word) => (word.length > longest.length ? word : longest),
  WORDS[0],
);

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState<string>(WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChevronClick = () => {
    const scrollRoot = document.getElementById("scroll-container");
    const productsSection = document.getElementById("products-section");

    if (productsSection && scrollRoot) {
      const sectionTop = productsSection.offsetTop;
      const maxSectionScroll = Math.max(
        0,
        productsSection.offsetHeight - scrollRoot.clientHeight,
      );
      const targetTop = Math.min(
        sectionTop + maxSectionScroll,
        scrollRoot.scrollHeight - scrollRoot.clientHeight,
      );

      scrollRoot.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }

    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const targetWord = WORDS[wordIndex];

    let delay = isDeleting ? 75 : 110;

    if (!isDeleting && displayWord === targetWord) {
      delay = 2500;
    }

    if (isDeleting && displayWord.length === 0) {
      delay = 250;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayWord.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          return;
        }

        setDisplayWord((prev) => prev.slice(0, -1));
        return;
      }

      if (displayWord.length < targetWord.length) {
        setDisplayWord(targetWord.slice(0, displayWord.length + 1));
        return;
      }

      setIsDeleting(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayWord, isDeleting, wordIndex]);

  return (
    <ScrollSection
      id="hero-section"
      className="relative bg-[url('/hero-background.png')] bg-cover bg-center"
      overlay={
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-white/80">
          <button
            type="button"
            onClick={handleChevronClick}
            aria-label="Scroll to end of products section"
            className="scroll-down-chevron pointer-events-auto block bg-transparent"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 sm:h-8 sm:w-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      }
    >
      <div className="w-full max-w-5xl px-5 pt-24 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-24">
        <Title className="hero-title font-bold">
          We build
          <br />
          <span className="relative inline-block min-w-[9.5ch] text-center align-baseline sm:min-w-[12ch]">
            <span className="invisible italic">{LONGEST_WORD}</span>
            <span className="absolute inset-0 inline-flex items-baseline justify-center">
              <em className="italic">{displayWord || "\u00A0"}</em>
              <span aria-hidden="true" className="typing-caret" />
            </span>
          </span>
        </Title>
        <H4 className="mx-auto mt-8 max-w-sm px-1 text-[clamp(0.86rem,2.2vw+0.35rem,0.9375rem)] leading-relaxed sm:mt-20 sm:max-w-2xl sm:px-0">
          We build intelligent tools and infrastructure to help people and AI
          <br className="hidden sm:block" /> work together, streamlining
          workflows
        </H4>
      </div>
    </ScrollSection>
  );
}
