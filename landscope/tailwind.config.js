import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-0": ["#0d0d0d"],
        "dark-1": ["#161a1e"],
        container: ["#202428"],
        selection: ["#2c3034"],
        green: ["#214332"],
        yellow: ["#605b35"],
      },
      colors: {
        primary: ["#1967fd"],
        green: ["#1ab754"],
        yellow: ["#eacf39"],
        gray: ["#c6c9c9"],
      },
      fontFamily: {
        orbit: ["Orbitron", "sans-serif"],
        base: ["Montserrat"],
      },
    },
  },
  plugins: [],
});
