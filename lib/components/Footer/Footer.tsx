"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FooterLeftCol } from "./FooterLeftCol";
import { FooterRightCol } from "./FooterRightCol";

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hideWatermark, setHideWatermark] = useState(false);

  useEffect(() => {
    const updateWatermarkVisibility = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionWidth = section.clientWidth;
      const sectionHeight = section.clientHeight;

      // Watermark aspect ratio is 1600/600 and its height is 75% of footer height.
      const watermarkWidth = sectionHeight * 0.75 * (1600 / 600);
      setHideWatermark(sectionWidth <= watermarkWidth);
    };

    updateWatermarkVisibility();

    const section = sectionRef.current;
    if (!section) return;

    const resizeObserver = new ResizeObserver(updateWatermarkVisibility);
    resizeObserver.observe(section);

    window.addEventListener("resize", updateWatermarkVisibility);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWatermarkVisibility);
    };
  }, []);

  const handleLogoClick = () => {
    const scrollRoot = document.getElementById("scroll-container");
    const heroSection = document.getElementById("hero-section");

    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (scrollRoot) {
      scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[33.33svh] w-full overflow-hidden bg-darkerPurple"
    >
      <FooterLeftCol onLogoClick={handleLogoClick} />
      <FooterRightCol />

      {!hideWatermark && (
        <Image
          src="/voxaris-footer-watermark-purple.png"
          alt="Voxaris footer watermark"
          width={1600}
          height={600}
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-auto -translate-x-1/2"
          style={{ height: "75%" }}
          priority
        />
      )}
    </section>
  );
};
