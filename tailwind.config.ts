module.exports = {
  darkMode: "class", // Changed from "media" to "class" for manual dark mode toggle
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme color palette
        dark: {
          bg: {
            primary: "#121212",
            secondary: "#1E1E1E",
            tertiary: "#2D2D2D",
          },
          border: {
            default: "#333333",
            focus: "#4D4D4D",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#A0A0A0",
            muted: "#6C6C6C",
          },
          accent: {
            primary: "#6366F1", // Indigo-500
            secondary: "#818CF8", // Indigo-400
            hover: "#4F46E5", // Indigo-600
          },
          success: {
            primary: "#10B981", // Emerald-500
            secondary: "#059669", // Emerald-600
            bg: "#064E3B20", // Emerald-900 with opacity
          },
          warning: {
            primary: "#F59E0B", // Amber-500
            secondary: "#D97706", // Amber-600
            bg: "#78350F20", // Amber-900 with opacity
          },
          error: {
            primary: "#EF4444", // Red-500
            secondary: "#DC2626", // Red-600
            bg: "#7F1D1D20", // Red-900 with opacity
          },
        },
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
