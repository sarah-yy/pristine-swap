/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    colors: {
      lightPrimary: {
        dark: "#2ba7b0",
        default: "#36D1DC",
        light: "#72DFE7",
      },
      lightSecondary: {
        dark: "#496bb7",
        default: "#5B86E5",
        light: "#8CAAED",
      },
      darkPrimary: {
        dark: "#366e82",
        default: "#4389A2",
        light: "#7BACBE",
      },
      darkSecondary: {
        dark: "#423e78",
        default: "#524E96",
        light: "#8683B6",
      },
      darkTertiary: {
        dark: "#4a1e71",
        default: "#5C258D",
        light: "#8D66AF",
      },
      lightBackground: {
        primary: "#FFFFFF",
        secondary: "#F3F4FF",
        tertiary: "rgba(99, 115, 129, 0.12)",
      },
      darkBackground: {
        primary: "#1F2A37",
        secondary: "#374151",
        tertiary: "rgba(255, 255, 255, 0.08)",
      },
      lightText: {
        primary: "#111928",
        secondary: "#637381",
      },
      darkText: {
        primary: "#F3F4F6",
        secondary: "#9CA3AF",
      },
      lightGradientColors: {
        left: "#C9D6FF",
        firstQuarter: "#D5DCF1",
        secondQuarter: "#E0E1E5",
        right: "#E2E2E2",
      },
      darkGradientColors: {
        left: "#353341",
        firstHalf: "#605D72",
        right: "#837F9A",
      },
    },
    extend: {
      fontFamily: {
        display: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif", // Adds a new `font-display` class
      },
      fontSize: {
        tooltip: "0.625rem", /* 10px */
        body4: "0.6875rem", /* 11px */
        body3: "0.8125rem", /* 13px */
        body2: "1rem", /* 16px */
        body1: "1.125rem", /* 18px */
        h6: "1.125rem", /* 18px */
        h5: "1.25rem", /* 20px */
        h4: "1.625rem", /* 26px */
        h3: "2rem", /* 32px */
        h2: "3rem", /* 48px */
        h1: "3.75rem", /* 60px */
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      screens: {
        sm: "0px",
        // => @media (min-width: 0) { ... }
  
        md: "600px",
        // => @media (min-width: 600px) { ... }
  
        lg: "960px",
        // => @media (min-width: 960px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1920px",
        // => @media (min-width: 1920px) { ... }
      },
    },
  },
  plugins: [],
}

