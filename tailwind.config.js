/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        pops: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "reg-img": "url(./assets/reg/reg_Img.png)",
      },
      colors: {
        "reg-pripamry": "#11175D",
        "reg-seconadry": "#808080",
      },
    },
  },
  plugins: [
    ['prettier-plugin-tailwindcss'],
  ],
};
