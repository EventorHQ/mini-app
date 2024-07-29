import threed from "tailwindcss-3d";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          bg: {
            "DEFAULT": "var(--tg-theme-bg-color, white)",
            "second": "var(--tg-theme-secondary-bg-color, white)",
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
        },
        background: {
          "gradient-section-top":
            "linear-gradient(to top, color-mix(in srgb, var(--tg-theme-section-bg-color) 40%, transparent), color-mix(in srgb, var(--tg-theme-section-bg-color) 90%, transparent))",
          "gradient-section-bottom":
            "linear-gradient(to bottom, color-mix(in srgb, var(--tg-theme-section-bg-color) 40%, transparent), color-mix(in srgb, var(--tg-theme-section-bg-color) 90%, transparent))",
        },
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, threed],
}