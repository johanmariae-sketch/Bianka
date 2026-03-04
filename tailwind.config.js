/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light beauty salon palette
        silk: "#FBF8F3",
        ivory: "#F3EDE6",
        espresso: "#1A1215",
        "rose-gold": "#C41E3A",
        plum: "#7B3F9E",
        "plum-light": "#9B5FBE",
        warm: "#C9956B",
        surface: "#F3EDE6",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Outfit"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
