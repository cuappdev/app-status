import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pro-disp-sb": ["pro-disp-sb", "serif"],
        "pro-disp-md": ["pro-disp-md", "serif"],
        "pro-text-md": ["pro-text-md", "serif"],
        "pro-text-rg": ["pro-text-rg", "serif"],
      },
      height: {
        "15": "60px",
        "13": "52px",
      },
      width: {
        "15": "60px",
      },
      colors: {
        success: "#3AC078",
        warning: "#EAA800",
        failure: "#FF6860",
        ruby: "#CA4238",
        highlight: "#BACCFA",
        "gray-08": "#24292E",
        "gray-07": "#2F363D",
        "gray-06": "#444D56",
        "gray-05": "#586069",
        "gray-04": "#6A737D",
        "gray-03": "#959DA5",
        "gray-00": "#EFF1F4",
        "stroke-colors": "#E5E6EA",
        "gray-bug": "#F0F4F8",
      },
      screens: {
        "lg-desktop": "1920px",
        "md-desktop": "1440px",
        "sm-desktop": "1200px",
        "lg-tablet": "760px",
        "sm-tablet": "480px",
        mobile: "300px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          info: "#EFF1F4",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
