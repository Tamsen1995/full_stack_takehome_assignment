module.exports = {
  darkMode: "media", // Use media queries for dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: {
          critical: "#FEE2E2", // Light red for critical errors
          warning: "#FEF3C7", // Light yellow for warnings
          valid: "#ECFDF5", // Light green for valid fields
        },
      },
    },
  },
  plugins: [],
};
