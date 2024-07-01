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
      colors: {
        "primary-gradient": "rgba(0, 69, 158, 1)",
      },
      keyframes: {
        rotateIn: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        rotateOut: {
          "0%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        rotateIn: "rotateIn 0.3s ease-in-out",
        rotateOut: "rotateOut 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
