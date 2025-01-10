/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        bowlby: ['"Bowlby One"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        black: "#262626",
        white: "#F6F7EB",
        primary: {
          DEFAULT: "#FE5D26", // Replace with your desired primary color
        },
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
