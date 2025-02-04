/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': 'url("/path/to/your/image.jpg")',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        calagreen: "#02903D",
        calayellow: "#FCF775",
        calaclaro: "#FCF775",
        calagreen_light: "#02ad49"
      },
      keyframes: {
        changeColor: {
          "50%": { color: "white" },
          "100%": { color: "#02903D" },
        },
      },
      animation: {
        changeColor: "changeColor 1s forwards",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
};
