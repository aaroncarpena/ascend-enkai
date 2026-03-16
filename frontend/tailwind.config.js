/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false, // ← evita que Tailwind resetee los estilos de PrimeReact
  },
  theme: { extend: {} },
  plugins: [],
}

