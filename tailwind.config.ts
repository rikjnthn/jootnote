import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "430px",
      },
      colors: {
        gray: {
          light: "666666",
          lighter: "B3B3B3",
          lightest: "#C5C5C5",
        },
      },
      spacing: {
        "7.5": "1.875rem",
        "13": "3.25rem",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000000",
          secondary: "#000000",
          accent: "#000000",
          neutral: "#ff00ff",
          "base-100": "#ffffff",
          info: "#000000",
          success: "#000000",
          warning: "#fb923c",
          error: "#ff0000",
        },
      },
    ],
  },
};
export default config;
