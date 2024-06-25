/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "button-gradient":
          "linear-gradient(to bottom left, rgba(0, 69, 158, 1) 0%, rgba(0, 69, 158, 1) 100%)",
      },
      borderColor: {
        "button-gradient": "rgba(0, 69, 158, 1)",
      },
    },
  },
  plugins: [],
};
