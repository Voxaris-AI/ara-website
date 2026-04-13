/**
 * Centralized color and gradient definitions for the Voxaris website.
 * All style applications should reference color/gradient names, not hex codes.
 */

export const COLORS = {
  // Gradients
  greyGlassGradient:
    "linear-gradient(90deg, rgba(68, 68, 68, 0.75), rgba(48, 48, 48, 0.75))",
  araGlassGradient:
    "radial-gradient(circle at 0% 0%, rgba(66, 31, 68, 0.9), rgba(11, 0, 20, 0.85), rgba(34, 0, 41, 0.9))",
  araGradient:
    "radial-gradient(circle at 0% 0%, #421f44, rgba(11, 0, 20, 0.95), #220029)",
  ariGradient:
    "radial-gradient(circle at 0% 0%, #44311f, rgba(20, 10, 0, 0.95), #291200)",

  // Solid Colors
  white: "#ffffff",
  darkerPurple: "#0e001b",
  darkPurple: "#1b0034",
  dullPurple: "#342b3a",
  lightLavender: "#dedae1",
  navbarButtonBg: "#ffffff",
  textPrimaryDarkBg: "#ffffff",
  textLightBg: "#0e0e0e",
  darkGrey: "#2b2b2b",
  darkerGrey: "#1b1b1b",
  textSecondaryDarkBg: "#b4b4b4",
} as const;

export const TYPOGRAPHY = {
  ibmPlexSerifLetterSpacing: "-0.04em",
} as const;

export type ColorKey = keyof typeof COLORS;
