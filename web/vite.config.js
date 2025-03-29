
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Ensure assets use relative paths for FiveM compatibility
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Ensure all assets use relative paths
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].js',
        // Make sure paths are relative
        manualChunks: undefined
      }
    }
  },
  // CRITICAL: Base path must be './' for FiveM NUI to work correctly
  base: './',
  server: {
    port: 3000
  }
})
