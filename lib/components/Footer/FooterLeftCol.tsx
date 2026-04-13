import React from "react";
import Image from "next/image";
import { FooterText } from "@/lib/components/text";

type FooterLeftColProps = {
  onLogoClick: () => void;
};

export const FooterLeftCol: React.FC<FooterLeftColProps> = ({
  onLogoClick,
}) => {
  return (
    <div className="absolute left-20 top-12 z-10 sm:left-28 sm:top-[60px]">
      <button
        type="button"
        aria-label="Scroll to hero section"
        onClick={onLogoClick}
        className="group cursor-pointer border-0 bg-transparent p-0"
      >
        <span className="grid">
          <Image
            src="/voxaris-logo.png"
            alt="Voxaris Logo"
            width={120}
            height={24}
            className="col-start-1 row-start-1 h-7 w-auto transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 sm:h-[30px]"
            priority
          />
          <Image
            src="/voxaris-logo-glow.png"
            alt=""
            aria-hidden="true"
            width={120}
            height={24}
            className="col-start-1 row-start-1 h-7 w-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-[30px]"
          />
        </span>
      </button>

      <FooterText className="mt-2 leading-tight">
        Intelligence infrastructure for
        <br />
        modern businesses
      </FooterText>

      <FooterText className="mt-1">
        <a
          href="https://www.google.com/maps/place/London,+United+Kingdom"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline focus-visible:underline"
        >
          London, United Kingdom
        </a>
      </FooterText>

      <div className="mt-3 flex gap-1 text-textPrimaryDarkBg">
        <a
          href="https://www.linkedin.com/company/voxaris"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex rounded p-1 transition duration-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.78)] focus-visible:text-white focus-visible:drop-shadow-[0_0_8px_rgba(255,255,255,0.78)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
            <path d="M7 12v5" />
            <path d="M11 17v-3.2c0-1 .8-1.8 1.8-1.8h.2c1 0 1.8.8 1.8 1.8V17" />
            <path d="M11 12v.2" />
          </svg>
        </a>

        <a
          href="#"
          aria-label="Instagram"
          className="inline-flex rounded p-1 transition duration-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.78)] focus-visible:text-white focus-visible:drop-shadow-[0_0_8px_rgba(255,255,255,0.78)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </a>

        <a
          href="#"
          aria-label="X"
          className="inline-flex rounded p-1 transition duration-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.78)] focus-visible:text-white focus-visible:drop-shadow-[0_0_8px_rgba(255,255,255,0.78)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.24 2H21l-6.01 6.87L22 22h-5.64l-4.42-5.85L6.8 22H4.04l6.43-7.35L2 2h5.78l4 5.3L18.24 2Zm-.97 18h1.56L6.93 3.9H5.27L17.27 20Z" />
          </svg>
        </a>
      </div>

      <div className="mt-[16px] h-px w-32 bg-textSecondaryDarkBg sm:w-28" />
      <FooterText className="mt-3">© 2026 Voxaris Ltd.</FooterText>
    </div>
  );
};
