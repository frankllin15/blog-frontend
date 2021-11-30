module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./public/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "white-trasparent": "rgba(255, 255, 255, 0.7)",
    }),

    flexGrow: {
      0: 0,
      DEFAULT: 1,
      1: 1,
      2: 2,
      3: 3,
    },
    flex: {
      1: "1 1 0%",
      2: "2",
      3: "3",
    },
    minWidth: {
      12: "12rem",
    },

    extend: {
      screens: {
        mobile: { max: "768px" },
      },
      spacing: {
        footer: "calc(100vh - 72px)",
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      cursor: ["hover", "focus"],
      backgroundColor: ["active", "focus-visible"],
      height: ["group-hover"],
      outline: ["focus-visible"],
    },
  },
  plugins: [],
}
