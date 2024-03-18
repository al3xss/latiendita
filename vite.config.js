import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

let faviconURL = '/latiendita.svg'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [faviconURL],
      manifest:{
        display:'standalone',
        display_override: ['window-controls-overlay'],
        short_name: 'La Tiendita',
        description: 'La Tiendita de la esquina, encuentra todo lo que buscas.',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons:[
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
      workbox:{
        runtimeCaching:[
          {
            urlPattern:({url}) => {
              return url.pathname.startsWith("/expressApi/products");
            },
            handler: "CacheFirst",
            options: {
                cacheName: "api-cache-v3",
                cacheableResponse:{
                  statuses: [0, 200]
                }
            }
          }
        ]
      }
    })
  ],
})
