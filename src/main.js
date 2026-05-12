import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// ✅ FIX LCP: Setelah Vue mount dan render nav aslinya,
// hapus static logo placeholder dari DOM.
// nextTick memastikan Vue sudah selesai render satu frame
// sebelum kita sembunyikan placeholder-nya.
app._context.app.config.globalProperties.$nextTick?.(() => {
  const placeholder = document.getElementById('static-logo-placeholder')
  if (placeholder) {
    // Tambah class dulu (fade out via CSS kalau mau)
    placeholder.classList.add('vue-mounted')
  }
})

// Cara alternatif yang lebih simple & reliable:
setTimeout(() => {
  const placeholder = document.getElementById('static-logo-placeholder')
  if (placeholder) placeholder.remove()
}, 100)