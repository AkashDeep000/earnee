import {
  defineConfig
} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {
  VitePWA
} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workboxOptions: {
            skipWaiting: true
        }
      devOptions: {
        enabled: false
      },
      includeAssets: ['favicon.ico', 'logo.png'],
      manifest: {
        start_url: "/login",
        name: 'Earnee',
        short_name: 'Earnee',
        description: 'Next level online marketing',
        theme_color: '#ffffff',
        icons: [{
          src: 'e.png',
          sizes: '192x192',
          type: 'image/png'
        },
          {
            src: 'e.png',
            sizes: '512x512',
            type: 'image/png'
          }]
      }
    })
  ],
  resolve: {
    alias: [{
      find: "@public", replacement: path.resolve(__dirname, "public")
    },
      {
        find: "@", replacement: path.resolve(__dirname, "src")
      },
    ],
  },
});