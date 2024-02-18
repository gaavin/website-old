/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        sun: {
          50: "#FFFBF5",
          100: "#FFF7EB",
          200: "#FFEFD6",
          300: "#FFE8C2",
          400: "#FFE0AD",
          500: "#FFD797",
          600: "#FFB947",
          700: "#F59700",
          800: "#A36500",
          900: "#523200",
          950: "#291900",
        },
      },
    },
  },
};
