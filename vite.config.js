import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
      // Optionally ignore big folders that don’t need watching:
      ignored: ['**/node_modules/**', '**/dist/**']
    }
  }
})
