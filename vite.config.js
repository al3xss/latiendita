import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest:{
        display:'standalone',
        display_override: ['window-controls-overlay'],
        short_name: 'La Tiendita',
        description: 'La Tiendita de la esquina, encuentra todo lo que buscas.',
        theme_color: '#5ECE7B',
        background_color: '#5ECE7B',
        icons:[
          {
            src: 'ios/64.png',
            sizes: '64x64'
          },
          {
            src: 'ios/192.png',
            sizes: '192x192',
            purpose: 'any'
          },
          {
            src: 'ios/512.png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
