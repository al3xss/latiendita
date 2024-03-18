import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

let faviconURL = '/latiendita.svg';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [ "**/*", faviconURL ],
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        short_name: 'La Tiendita',
        description: 'La Tiendita de la esquina, encuentra todo lo que buscas.',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        swSrc: 'src/sw-custom.js',
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({url}) => url.pathname.startsWith("/expressApi/products"),
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache-v3.2",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/shopping-cart/,
            handler: 'NetworkOnly',
            options: {
              backgroundSync: {
                name: 'addToCartQueue',
                options: {
                  maxRetentionTime: 24 * 60, // Time in minutes
                }
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: process.env.NODE_ENV === 'development', // Enable PWA in development mode for testing
      }
    })
  ]
});
