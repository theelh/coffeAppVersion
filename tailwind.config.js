/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
        Runy: ["Runy", "sans-serif"],
        Mental: ["Mental", "sans-serif"],
        MeriendaBlack: ["Merienda-Black", "sans-serif"],
        MeriendaBold: ["Merienda-Bold", "sans-serif"],
        MeriendaExtraBold: ["Merienda-ExtraBold", "sans-serif"],
        MeriendaLight: ["Merienda-Light", "sans-serif"],
        MeriendaMedium: ["Merienda-Medium", "sans-serif"],
        MeriendaRegular: ["Merienda-Regular", "sans-serif"],
        MeriendaSemiBold: ["Merienda-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}