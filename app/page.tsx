"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/lib/components/Navbar";
import { ScrollContainer } from "@/lib/components/ScrollContainer";
import { Footer } from "@/lib/components/Footer";
import { Hero } from "@/lib/sections/Hero";
import { Impact } from "@/lib/sections/Impact";
import { Integration } from "@/lib/sections/Integration";
import { Features } from "@/lib/sections/Features";
import { FAQs } from "@/lib/sections/FAQs";

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

  return (
    <>
      <Navbar />
      <ScrollContainer>
        <Hero />
        <Impact isDarkMode={isDarkMode} />
        <Integration />
        <Features isDarkMode={isDarkMode} />
        <FAQs isDarkMode={isDarkMode} />

        <Footer />
      </ScrollContainer>
    </>
  );
}
