/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  images: {
    domains: ['s3.amazonaws.com'],
  },
};

export default config;
