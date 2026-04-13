import React from "react";
import { FooterText } from "@/lib/components/text";

type FooterLinkProps = {
  children: React.ReactNode;
};

const FooterLink: React.FC<FooterLinkProps> = ({ children }) => {
  return (
    <a href="#" className="transition hover:underline">
      {children}
    </a>
  );
};

export const FooterRightCol: React.FC = () => {
  return (
    <div className="absolute right-20 top-12 z-10 text-right sm:right-28 sm:top-[60px]">
      <h3 className="text-[26px] font-bold italic underline sm:text-[28px]">
        <a
          href="#"
          className="text-textPrimaryDarkBg transition duration-200 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.82)] focus-visible:text-white focus-visible:drop-shadow-[0_0_10px_rgba(255,255,255,0.82)]"
        >
          <span className="not-italic">Book</span> a call
        </a>
      </h3>
      <h4 className="mt-0 text-[20px] font-bold underline sm:text-[22px]">
        <a
          href="mailto:team@voxaris.ai"
          className="text-textPrimaryDarkBg transition duration-200 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.82)] focus-visible:text-white focus-visible:drop-shadow-[0_0_10px_rgba(255,255,255,0.82)]"
        >
          team@vox<span className="italic">aris</span>.ai
        </a>
      </h4>

      <FooterText className="mt-2 flex flex-col items-end gap-1">
        <FooterLink>Privacy Policy</FooterLink>
        <FooterLink>Terms of Service</FooterLink>
        <FooterLink>Careers</FooterLink>
        <FooterLink>Status</FooterLink>
      </FooterText>
    </div>
  );
};
