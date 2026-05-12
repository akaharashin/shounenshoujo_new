import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// ✅ Install dulu: npm install vite-plugin-image-optimizer sharp --save-dev
// sharp diperlukan oleh vite-plugin-image-optimizer untuk proses gambar
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),

    // ✅ Otomatis compress semua gambar di /public saat build
    // Termasuk semua thum*.webp yang sekarang terlalu besar
    ViteImageOptimizer({
      // WebP: target quality 75 (dari default ~80)
      // Savings estimasi: 30-50% per gambar tanpa perbedaan visual signifikan
      webp: {
        quality: 75,
        effort: 6,
      },
      // PNG fallback (untuk ss-pink.png)
      png: {
        quality: 80,
      },
      // Scan folder /public juga (bukan hanya src/)
      includePublic: true,
      // Log hasil kompresi saat build
      logStats: true,
    }),
  ],

  build: {
    // ✅ Pisah Vue core dari app bundle
    // Ini bikin browser bisa cache Vue terpisah dari kode aplikasi kamu
    // Kalau kamu update konten tapi tidak update Vue, browser tidak perlu
    // re-download chunk vendor
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue core dipisah jadi vendor chunk tersendiri
          'vendor': ['vue'],
        },
      },
    },

    // ✅ Batas warning chunk size (default 500kb, naikan sedikit biar tidak warning)
    chunkSizeWarningLimit: 600,

    // ✅ Target modern browsers — kode lebih kecil karena tidak perlu polyfill lama
    target: 'es2020',
  },
})