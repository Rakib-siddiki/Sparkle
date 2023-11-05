/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        pops: ["Poppins", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
        lobster: ["Lobster", "sans-serif"],
      },
      backgroundImage: {
        "reg-img": "url(./assets/reg/reg_Img.png)",
        "login-img": "url(./assets/login/login_img.jpg)",
        "forgetPass-img": "url(./assets/forgetPassword/forgetPassword.png)",
      },
      colors: {
        "reg-primary": "#11175D",
        "reg-seconadry": "#808080",
        "login-primary": "#03014C",
        "login-secondry": "#c4bfbf",
        forgetPass_text: "#37474F",
        primary: "#5F35F5",
      },
      borderRadius: {
        "20px": "20px",
      },
      dropShadow: {
        iconDropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        CardShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        CardShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        xxl: "1480px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [["prettier-plugin-tailwindcss"]],
};
