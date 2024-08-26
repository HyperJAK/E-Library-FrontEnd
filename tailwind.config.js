/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#1C1C1C',
        secondary: '#3b82f6',
        accent: '#F5F4F4',
        page: '#FFFFFF',
        opposite: '#FFFFFF',
        backupOppositeOfOpposite: '#D9D9D9',
      },
      backgroundImage: {
        space: 'url("/bg-explosion.jpeg")',
        site: 'url("/site-bg.svg")',
        sitePng: 'url("/svg-bg.png")',
        logo: 'url("/W4Kitchen.png")',
        recipeCategoriesImg: 'url("/recipeExample.png")',
        profileMainImg: 'url("/profilePic.png")',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, 'sans-serif'],
        sora: [`var(--font-sora)`, 'sans-serif'],
        rubik: [`var(--font-rubik)`, 'sans-serif'],
        robotoSlab: [`var(--font-roboto-slab)`, 'sans-serif'],
      },
    },
  },
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [require('tailwind-scrollbar')],
}