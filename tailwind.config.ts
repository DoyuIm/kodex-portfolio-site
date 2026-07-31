import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1220",
        mint: "#34D399",
        offwhite: "#F8FAFC",
        slate: "#94A3B8",
        muted: "#6B798B",
      },
    },
  },
  plugins: [],
};
export default config;
