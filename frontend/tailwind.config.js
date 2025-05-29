/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#F59E0B",
        dark: "#111827",
        light: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
