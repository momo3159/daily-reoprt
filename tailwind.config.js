module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        "1-10-1": "1fr 10fr 1fr",
        "10-1": "10fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
