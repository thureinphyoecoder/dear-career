import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A0B7A4",
        warm: "#FFF6E8",
        surface: "#F2F2F2",
        textdark: "#2E2E2E",
        muted: "#6B6B6B",
      },
    },
  },
};

export default config;
