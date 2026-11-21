import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from a subfolder in production (https://www.dcartdevelopment.com/clinicalreviewed/).
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // listen on all interfaces, including the Tailscale one
    allowedHosts: ['.ts.net'], // allow MagicDNS names
  },
})
