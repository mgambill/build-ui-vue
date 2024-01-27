import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: (theme) => ({
        // @ts-ignore
        control: theme('colors.zinc.300')
      })
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('dx', '& [data-ic]')
      addVariant('dxa', '& [data-anchor]')
      addVariant('dx-placeholder', '& [data-ic-empty]')
      addVariant('editor', () => 'html[data-editor] &')
    })
  ],
}