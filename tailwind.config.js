import threed from "tailwindcss-3d";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tg: {
          bg: {
            DEFAULT: "var(--tg-theme-bg-color, white)",
            second: "var(--tg-theme-secondary-bg-color, white)",
            tertiary: "var(--tg-theme-bg-tertiary)",
            section: "var(--tg-theme-section-bg-color, white)",
            opaque: "#38383885",
          },
          header: {
            DEFAULT: "var(--tg-theme-header-bg-color)",
            section: "var(--tg-theme-section-header-text-color)",
          },
          text: {
            DEFAULT: "var(--tg-theme-text-color)",
            accent: "var(--tg-theme-accent-text-color)",
          },
          button: {
            DEFAULT: "var(--tg-theme-button-color)",
            tinted:
              "color-mix(in srgb, var(--tg-theme-link-color) 10%, transparent)",
            text: "var(--tg-theme-button-text-color)",
          },
          hint: "var(--tg-theme-hint-color)",
          subtitle: "var(--tg-theme-subtitle-text-color)",
          link: "var(--tg-theme-link-color)",
          destructive: "var(--tg-theme-destructive-text-color)",
          separator:
            "color-mix(in srgb,var(--tg-theme-text-color) 15%,transparent)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      transitionProperty: {
        smooth: "cubic-bezier(0.2, 0, 0, 1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, threed],
};
