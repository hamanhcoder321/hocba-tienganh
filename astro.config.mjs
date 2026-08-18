import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';


const baseUrl = "https://hoc-ba.edu.vn"

export default defineConfig({
  site: baseUrl,
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',

  integrations: [
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    optimizeDeps: {
      include: ['react-share'],
    },
    build: {
      format: 'file',
      cssCodeSplit: true,
      minify: 'terser',
    },
    server: {
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'dev.techzen.asia',
        '.trycloudflare.com'
      ]
    }
  },

  image: {
    domains: ['astro.build'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-landing.hoc-ba.edu.vn',
      },
    ],
  },
});
