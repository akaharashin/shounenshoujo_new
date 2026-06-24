<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)
const isLoading = ref(true)
const isMenuJustOpened = ref(false)

// ============================================
// 🌍 MULTI-LANGUAGE / i18n SYSTEM
// ============================================
const detectUserLanguage = () => {
  const saved = localStorage.getItem('preferred-language')
  if (saved) return saved
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('id')) return 'id'
  if (browserLang.startsWith('ja')) return 'ja'
  return 'en'
}

const currentLang = ref(detectUserLanguage())

const setLanguage = (lang) => {
  currentLang.value = lang
  localStorage.setItem('preferred-language', lang)
}

const showScrollTop = ref(false)

const translations = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', activities: 'Kegiatan', contact: 'Kontak' },
    hero: {
      badge: 'ANIKURA, KOMUNITAS J-POP',
      subtitle: 'J-Pop • Anison • Vocaloid • Idol • Odottemita • Utattemita',
      description: 'J-Pop & Anikura Community yang aktif menghadirkan skena Random Play Dance, Odottemita, dan Utattemita di berbagai event Jejepangan.',
      ctaCollection: 'Koleksi RPD',
      ctaBook: 'HADIRKAN RPD DI EVENT KAMU',
    },
    about: {
      badge: 'TENTANG KAMI',
      title: 'Hadirkan Vibes',
      titleHighlight: 'J-Pop di Event Kamu',
      p1: 'adalah komunitas yang berfokus pada budaya J-Pop,',
      p1Highlight: '(Anime Club Culture: Anisong, Game, dan Vocaloid),',
      p1Continue: 'serta berbagai bentuk budaya pop Jepang lainnya. Kami jadi rumah buat para penggemar J-Pop, Vocaloid, dan Idol buat kumpul, berkreasi, dan have fun bareng.',
      p2: 'Dengan',
      p2Highlight: 'yang solid, kami aktif tampil di berbagai event lokal, bawa energi dan vibes J-Pop yang autentik. Dari Utattemita sampai Odottemita, kami siap bikin event kamu makin seru dan berkesan.',
      p3: 'Kami terbuka buat kolaborasi sama',
      p3Highlight: 'Event Organizer',
      p3Continue: 'yang pengen hadirin konten J-Pop dan Anikura di event mereka. Yuk bikin event kamu makin berkesan bareng kami!',
      rpd: 'Random Play Dance', utattemita: 'Karaoke / Song Cover', anikura: 'Anisong Club', media: 'Dokumentasi & Konten Jpop'
    },
    activities: {
      badge: 'KEGIATAN KAMI', title: 'RPD & Sesi Karaoke',
      description: 'Saksikan aksi kami di berbagai event melalui video dokumentasi kami.',
      share: 'Bagikan', viewAll: 'LIHAT SEMUA VIDEO'
    },
    contact: {
      title: 'Mau Collab Bareng?',
      description: 'Lagi nyari talent buat event kamu? Kami siap bawa vibes J-Pop yang bikin event kamu beda dari yang lain.',
      descriptionHighlight: 'Yuk collab!',
      ctaInstagram: 'INSTAGRAM', ctaEmail: 'SALIN EMAIL'
    },
    footer: { tagline: 'RPD, Anikura, dan vibes J-Pop — siap hadir di event kamu 🌸', copyright: `© 2025–${new Date().getFullYear()} Shounen Shoujo. Dibuat dengan 💖 oleh Akahara` },
    toast: { emailCopied: 'Email berhasil disalin! 📋', linkCopied: 'Link berhasil disalin! 🔗' },
    theme: { toggle: 'Ganti tema' }
  },
  en: {
    nav: { home: 'Home', about: 'About', activities: 'Activities', contact: 'Contact' },
    hero: {
      badge: 'ANIKURA, J-POP COMMUNITY',
      subtitle: 'J-Pop • Anison • Vocaloid • Idol • Odottemita • Utattemita',
      description: 'An active J-Pop & Anikura Community bringing Random Play Dance, Odottemita, and Utattemita scenes to various Japanese culture events.',
      ctaCollection: 'RPD Collection', ctaBook: 'BRING RPD TO YOUR EVENT',
    },
    about: {
      badge: 'ABOUT US', title: 'Bringing J-Pop', titleHighlight: 'Vibes to Your Event',
      p1: 'is a community focused on J-Pop culture,',
      p1Highlight: '(Anime Club Culture: Anisong, Games, and Vocaloid),',
      p1Continue: 'and various other forms of Japanese pop culture. We\'re a home for J-Pop, Vocaloid, and Idol fans to hang out, create, and have fun together.',
      p2: 'With our solid',
      p2Highlight: 'we actively perform at various local events, bringing authentic J-Pop energy and vibes. From Utattemita to Odottemita, we\'re ready to make your event more exciting and unforgettable.',
      p3: 'We\'re open to collaboration with',
      p3Highlight: 'Event Organizers',
      p3Continue: 'who want to bring J-Pop and Anikura content to their events. Let\'s make your event unforgettable together!',
      rpd: 'Random Play Dance', utattemita: 'Karaoke / Song Cover', anikura: 'Anisong Club', media: 'Documentation & Jpop Content'
    },
    activities: {
      badge: 'OUR ACTIVITIES', title: 'RPD & Karaoke Session',
      description: 'Watch our performances at various events through our video documentation.',
      share: 'Share', viewAll: 'VIEW ALL VIDEOS'
    },
    contact: {
      title: 'Want to Collab With Us?',
      description: 'Looking for talent for your event? We\'re ready to bring J-Pop energy that makes your event stand out.',
      descriptionHighlight: 'Let\'s collab!',
      ctaInstagram: 'INSTAGRAM', ctaEmail: 'COPY EMAIL'
    },
    footer: { tagline: 'Spreading J-Pop Love, One Event at a Time 🌸', copyright: `© 2025–${new Date().getFullYear()} Shounen Shoujo. Made with 💖 by Akahara` },
    toast: { emailCopied: 'Email copied to clipboard! 📋', linkCopied: 'Link copied to clipboard! 🔗' },
    theme: { toggle: 'Toggle theme' }
  },
  ja: {
    nav: { home: 'ホーム', about: '私たちについて', activities: '活動', contact: 'お問い合わせ' },
    hero: {
      badge: 'アニクラ、J-POPコミュニティ',
      subtitle: 'J-Pop • アニソン • ボカロ • アイドル • 踊ってみた • 歌ってみた',
      description: 'ランダムプレイダンス、踊ってみた、歌ってみたのシーンを様々な日本文化イベントで展開する活発なJ-Pop＆アニクラコミュニティです。',
      ctaCollection: 'RPDコレクション', ctaBook: 'イベントにRPDを予約する',
    },
    about: {
      badge: '私たちについて', title: 'J-Popのシーンを', titleHighlight: 'あなたのイベントへ',
      p1: 'は、J-Pop文化、',
      p1Highlight: '（アニメクラブカルチャー：アニソン、ゲーム、ボカロ）、',
      p1Continue: 'および日本のポップカルチャーの様々な形態に焦点を当てたコミュニティです。J-Pop、ボカロ、アイドルファンが集まり、創作し、一緒に楽しむ場を提供しています。',
      p2: '堅実な',
      p2Highlight: 'で、私たちは様々なローカルイベントで積極的にパフォーマンスを行い、本格的なJ-Popのエネルギーと雰囲気をもたらしています。歌ってみたから踊ってみたまで、あなたのイベントをより盛り上げる準備ができています。',
      p3: 'イベントにJ-Popとアニクラコンテンツを取り入れたい',
      p3Highlight: 'イベントオーガナイザー',
      p3Continue: 'とのコラボレーションを歓迎しています。一緒に思い出に残るイベント体験を作りましょう。',
      rpd: 'ランダムプレイダンス', utattemita: 'カラオケ / 歌ってみた', anikura: 'アニソンクラブ', media: 'ドキュメンテーション & Jpopコンテンツ'
    },
    activities: {
      badge: '私たちの活動', title: 'RPD ＆ カラオケセッション',
      description: '様々なイベントでのパフォーマンスをビデオドキュメンテーションでご覧ください。',
      share: 'シェア', viewAll: 'すべてのビデオを見る'
    },
    contact: {
      title: 'コラボしてみない？',
      description: 'イベントのタレントをお探しですか？J-Popのエネルギーであなたのイベントをもっと特別なものにします。',
      descriptionHighlight: '一緒にコラボしよう！',
      ctaInstagram: 'インスタグラム', ctaEmail: 'メールをコピー'
    },
    footer: { tagline: 'J-Popの愛を、一つひとつのイベントに 🌸', copyright: `© 2025–${new Date().getFullYear()} Shounen Shoujo. 💖で作られました by Akahara` },
    toast: { emailCopied: 'メールがコピーされました！📋', linkCopied: 'リンクがコピーされました！🔗' },
    theme: { toggle: 'テーマ切替' }
  }
}

const t = computed(() => translations[currentLang.value])

const languages = [
  { code: 'id', name: 'Indonesia', flag: 'ɪᴅ' },
  { code: 'en', name: 'English', flag: 'ᴇɴ' },
  { code: 'ja', name: '日本語', flag: 'ᴊᴘ' }
]

const isLangMenuOpen = ref(false)

// ============================================
// 🎨 THEME (light/dark) — meniru pola i18n
// Default LIGHT, ikut device, toggle manual tersimpan.
// data-theme awal sudah diset skrip sinkron di index.html (anti-FOUC).
// ============================================
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

const applyTheme = (val) => {
  theme.value = val
  document.documentElement.setAttribute('data-theme', val)
  localStorage.setItem('theme', val)
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

// Ikuti preferensi device — HANYA kalau user belum pernah set manual
const prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)')
const handleSchemeChange = (e) => {
  if (localStorage.getItem('theme')) return
  const val = e.matches ? 'dark' : 'light'
  theme.value = val
  document.documentElement.setAttribute('data-theme', val)
}

// ============================================
// SCROLL & MENU LOGIC
// ============================================
const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (window.scrollY / windowHeight) * 100
  showScrollTop.value = window.scrollY > 300
}

const closeMenuOnOutsideClick = (event) => {
  if (isMenuJustOpened.value) return
  const mobileMenu = document.querySelector('.mobile-menu')
  const menuButton = document.querySelector('.menu-button')
  const langMenu = document.querySelector('.lang-menu')
  const langButton = document.querySelector('.lang-button')
  if (mobileMenu && mobileMenu.contains(event.target)) return
  if (langMenu && langMenu.contains(event.target)) return
  if (langButton && langButton.contains(event.target)) return
  if (isMenuOpen.value && mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
    isMenuOpen.value = false
  }
  if (isLangMenuOpen.value && langMenu && !langMenu.contains(event.target) && !langButton.contains(event.target)) {
    isLangMenuOpen.value = false
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    if (isMenuOpen.value) isMenuOpen.value = false
    if (isLangMenuOpen.value) isLangMenuOpen.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    isMenuJustOpened.value = true
    setTimeout(() => { isMenuJustOpened.value = false }, 100)
  }
}

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in')
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })
  document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el))
  return observer
}

// ============================================
// SCROLL-SPY — penanda nav aktif (satu indikator)
// Section yang melewati pita tengah viewport jadi aktif.
// ============================================
const activeSection = ref('home')
let sectionObserver = null
const setupSectionObserver = () => {
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activeSection.value = entry.target.id
    })
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
  document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s))
}

const copyEmail = async () => {
  const email = 'shounenshoujo19@email.com'
  try {
    await navigator.clipboard.writeText(email)
    showToast(t.value.toast.emailCopied)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = email
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    showToast(t.value.toast.emailCopied)
  }
}

const toastMessage = ref('')
const showToastFlag = ref(false)
const showToast = (message) => {
  toastMessage.value = message
  showToastFlag.value = true
  setTimeout(() => { showToastFlag.value = false }, 3000)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  // ✅ FIX: Hapus artificial 500ms delay — langsung hide loading screen
  // Delay lama bikin FCP & LCP makin lambat tanpa manfaat nyata
  isLoading.value = false

  window.addEventListener('scroll', handleScroll, { passive: true }) // ✅ passive listener
  document.addEventListener('click', closeMenuOnOutsideClick, true)
  document.addEventListener('keydown', handleEscapeKey)
  prefersDarkMedia.addEventListener('change', handleSchemeChange)
  setTimeout(() => { setupIntersectionObserver() }, 100)
  setupSectionObserver()
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        isMenuOpen.value = false
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeMenuOnOutsideClick, true)
  document.removeEventListener('keydown', handleEscapeKey)
  prefersDarkMedia.removeEventListener('change', handleSchemeChange)
  if (sectionObserver) sectionObserver.disconnect()
})

const videos = [
  { title: "ODORISHO RPD VOL. 1", thumbnail: "/image/thum1.webp", link: "https://youtu.be/7DjSxkNy-ho?si=G3-6JDsmZY7MwQwG" },
  { title: "ODORISHO RPD VOL. 2.5", thumbnail: "/image/thum2.webp", link: "https://youtu.be/gEXuPEbk85I?si=vURyUFI_WC-j8iRD" },
  { title: "ODORISHO RPD VOL. 3", thumbnail: "/image/thum3.webp", link: "https://youtu.be/4JzGPu56rQo?si=-j0TfUT7r65LL_E2" },
  { title: "ODORISHO RPD VOL. 4", thumbnail: "/image/thum5.webp", link: "https://youtu.be/BGQM8ZCF7Gk?si=D64XtKi3Ox4IuD2d" },
  { title: "UTAISHO KARAOKE VOL. 1", thumbnail: "/image/thum4.webp", link: "https://youtu.be/Kh9qVLhWEmg?si=FgPafIoE-D1b_RKG" }
]

const shareVideo = async (video) => {
  if (navigator.share) {
    try {
      await navigator.share({ title: video.title, text: `Check out ${video.title} by Shounen Shoujo!`, url: video.link })
    } catch (err) {
      if (err.name !== 'AbortError') copyToClipboard(video.link)
    }
  } else {
    copyToClipboard(video.link)
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showToast(t.value.toast.linkCopied)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg text-fg overflow-x-hidden">

    <!-- Loading Screen -->
    <!--
      ✅ FIX: isLoading sekarang langsung false saat mount.
      Transition tetap ada kalau suatu saat dipakai lagi.
    -->
    <transition leave-active-class="transition-opacity duration-300" leave-to-class="opacity-0">
      <div v-if="isLoading" class="fixed inset-0 bg-bg z-[100] flex items-center justify-center" aria-hidden="true">
        <div class="text-center">
          <div class="w-20 h-20 border-4 border-[#fea3fe] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-subtle font-bold">Loading...</p>
        </div>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2">
      <!--
        ✅ FIX: Hapus backdrop-blur dari toast — ganti bg lebih opaque.
        backdrop-blur pada elemen kecil tetap mahal di mobile.
      -->
      <div v-if="showToastFlag" role="status" aria-live="polite"
        class="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-4 bg-elevate-solid border border-border-c rounded-2xl shadow-2xl">
        <p class="text-fg font-bold">{{ toastMessage }}</p>
      </div>
    </transition>

    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-border-c z-[60]" aria-hidden="true">
      <div class="h-full bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <!-- Background decorations — hidden on mobile (hemat render) -->
    <div class="fixed inset-0 opacity-5 pointer-events-none z-0 hidden md:block" aria-hidden="true">
      <div class="absolute inset-0"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, var(--texture) 35px, var(--texture) 70px);">
      </div>
    </div>

    <!--
      ✅ FIX BESAR: Glow orbs
      - Hapus :style scroll parallax (recalculate setiap scroll = mahal)
      - Hapus animate-pulse di mobile (GPU-heavy)
      - Sembunyikan di mobile sepenuhnya (paling impactful untuk TBT)
    -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block" aria-hidden="true">
      <div
        class="orb absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#fea3fe] rounded-full blur-[130px]"
        style="animation-duration: 6s;"></div>
      <div
        class="orb absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#61fdfe] rounded-full blur-[130px]"
        style="animation-duration: 7.5s; animation-delay: -2s;"></div>
      <div
        class="orb absolute -bottom-40 right-1/3 w-[450px] h-[450px] bg-purple-500 rounded-full blur-[130px]"
        style="animation-duration: 9s; animation-delay: -4s;"></div>
    </div>

    <!-- Navigation -->
    <nav
      :class="['fixed w-full z-50 transition-all duration-500 text-fg', scrolled ? 'nav-scrolled' : 'bg-transparent']"
      role="navigation" aria-label="Main navigation">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">

          <!-- Logo -->
          <a href="#home"
            class="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded-xl"
            aria-label="Shounen Shoujo Home">
            <div class="relative flex items-center gap-3 px-0 md:px-6 py-3 rounded-2xl">
              <!--
                ✅ FIX: Logo sudah ada preload di index.html.
                Pastikan width/height sesuai ukuran tampil (128px) biar tidak ada layout shift.
              -->
              <img src="/image/ss-pink.webp" alt="Shounen Shoujo Logo" loading="eager" fetchpriority="high"
                width="128" height="128"
                class="w-32 transition-opacity duration-500 hover:opacity-80" />
            </div>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-2">
            <a v-for="(item, key) in t.nav" :key="key" :href="`#${key}`"
              class="relative px-6 py-3 font-bold text-sm tracking-wide transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded-xl"
              :class="activeSection === key ? 'text-fg' : 'text-muted hover:text-fg'"
              :aria-current="activeSection === key ? 'page' : undefined">
              <span class="relative z-10">{{ item.toUpperCase() }}</span>
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-pink-ink transition-all duration-300"
                :class="activeSection === key ? 'w-full' : 'w-0 group-hover:w-full'"></div>
            </a>

            <!-- Theme Toggle Desktop -->
            <button @click="toggleTheme"
              class="theme-button glass-btn flex items-center justify-center w-12 h-12 ml-2 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
              :aria-label="t.theme.toggle" :aria-pressed="theme === 'dark'">
              <!-- Matahari: tampil saat dark (klik untuk ke light) -->
              <svg v-if="theme === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path stroke-linecap="round"
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <!-- Bulan: tampil saat light (klik untuk ke dark) -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>

            <!-- Language Switcher Desktop -->
            <div class="relative ml-4">
              <!--
                ✅ FIX: backdrop-blur hanya di md ke atas via CSS class custom
                Lihat .glass-btn di <style>
              -->
              <button @click.stop="isLangMenuOpen = !isLangMenuOpen"
                class="lang-button glass-btn flex items-center justify-center gap-3 px-5 py-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
                :aria-expanded="isLangMenuOpen">
                <span class="text-base font-bold leading-none tracking-tight pb-1">
                  {{ languages.find(l => l.code === currentLang).flag }}
                </span>
                <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isLangMenuOpen }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2">
                <div v-if="isLangMenuOpen"
                  class="lang-menu absolute right-0 mt-3 w-48 bg-elevate text-fg md:backdrop-blur-xl border border-border-c rounded-xl overflow-hidden shadow-2xl"
                  role="menu">
                  <button v-for="lang in languages" :key="lang.code"
                    @click.stop="setLanguage(lang.code); isLangMenuOpen = false"
                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface transition-all text-left group"
                    :class="{ 'bg-[#fea3fe]/10 border-l-2 border-[#fea3fe]': currentLang === lang.code }"
                    role="menuitem">
                    <span class="text-xl group-hover:scale-110 transition-transform pb-1">{{ lang.flag }}</span>
                    <span class="font-bold text-sm flex-1">{{ lang.name }}</span>
                    <svg v-if="currentLang === lang.code" class="w-5 h-5 text-pink-ink" fill="currentColor"
                      viewBox="0 0 20 20" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <!--
            ✅ FIX: Ganti backdrop-blur dengan solid bg yang agak opaque di mobile
          -->
          <button @click="toggleMenu"
            class="menu-button glass-btn md:hidden p-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu">
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
          <div v-if="isMenuOpen" id="mobile-menu" class="mobile-menu md:hidden pb-6 space-y-2 text-fg">
            <!--
              ✅ FIX: Hapus backdrop-blur dari mobile menu items
              Panel ini permukaan solid → pakai token surface + teks fg sendiri
            -->
            <a v-for="(item, key) in t.nav" :key="key" :href="`#${key}`" @click="isMenuOpen = false"
              class="block px-6 py-4 rounded-xl bg-surface border border-border-c font-bold text-sm tracking-wide hover:bg-surface-strong hover:border-border-c transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]">
              {{ item.toUpperCase() }}
            </a>

            <!-- Theme Toggle Mobile -->
            <button @click="toggleTheme"
              class="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-surface border border-border-c hover:bg-surface-strong transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
              :aria-label="t.theme.toggle" :aria-pressed="theme === 'dark'">
              <span class="font-bold text-sm tracking-wide">{{ t.theme.toggle.toUpperCase() }}</span>
              <svg v-if="theme === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path stroke-linecap="round"
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>

            <div class="pt-4 border-t border-border-subtle mt-4">
              <p class="px-6 py-2 text-xs text-subtle font-black tracking-widest">SELECT LANGUAGE</p>
              <div class="space-y-2">
                <button v-for="lang in languages" :key="lang.code"
                  @click.stop="setLanguage(lang.code); isMenuOpen = false"
                  class="w-full flex items-center gap-4 px-6 py-4 rounded-xl bg-surface border border-border-c hover:bg-surface-strong hover:border-[#fea3fe]/40 transition-all group"
                  :class="{ 'bg-[#fea3fe]/15 border-[#fea3fe]/50 ring-1 ring-[#fea3fe]/20': currentLang === lang.code }">
                  <span class="text-2xl group-hover:scale-110 transition-transform pb-1.5">{{ lang.flag }}</span>
                  <span class="font-bold text-base flex-1 text-left">{{ lang.name }}</span>
                  <svg v-if="currentLang === lang.code" class="w-5 h-5 text-pink-ink" fill="currentColor"
                    viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Mobile Menu Backdrop — no blur, just dark overlay -->
      <transition enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
        <div v-if="isMenuOpen" class="fixed inset-0 bg-black/70 -z-10 md:hidden"
          @click="isMenuOpen = false" aria-hidden="true"></div>
      </transition>
    </nav>

    <main>

      <!-- Hero Section — ikut tema (flip). Pemanis hanya dari orbs global tersebar. -->
      <section id="home" class="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24">
        <div class="max-w-7xl mx-auto w-full relative z-10">
          <div class="text-center scroll-animate">

            <div class="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 bg-surface rounded-full border border-border-c">
              <span class="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-ink opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-pink-ink"></span>
              </span>
              <span class="text-xs sm:text-sm font-bold tracking-wider text-fg">{{ t.hero.badge }}</span>
            </div>

            <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-none">
              <span class="wordmark inline-block">SHOUNEN</span>
              <br />
              <span class="wordmark inline-block">SHOUJO</span>
            </h1>

            <p class="text-sm sm:text-lg md:text-xl lg:text-2xl text-fg mb-3 sm:mb-4 font-bold tracking-wide px-4">
              {{ t.hero.subtitle }}
            </p>
            <p class="text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              {{ t.hero.description }}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-stretch sm:items-center mb-12 sm:mb-16 px-4">
              <a href="#activities"
                class="group relative px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide overflow-hidden hover:scale-105 transition-transform duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50 text-center btn-primary"
                :aria-label="t.hero.ctaCollection">
                <span class="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4 4h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    <path d="M16 10l6-4v12l-6-4z" />
                  </svg>
                  <span>{{ t.hero.ctaCollection }}</span>
                </span>
              </a>

              <!--
                ✅ FIX: Hapus backdrop-blur dari tombol sekunder
              -->
              <a href="#contact"
                class="px-6 sm:px-10 py-4 sm:py-5 border-2 border-border-c rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide text-fg hover:bg-surface hover:border-[#61fdfe]/70 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#61fdfe]/40 text-center">
                {{ t.hero.ctaBook }}
              </a>
            </div>

            <div class="flex justify-center">
              <div class="animate-bounce" aria-hidden="true">
                <svg class="w-6 h-6 text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div class="scroll-animate">

              <div class="inline-flex items-center px-4 py-2 bg-surface border border-border-c rounded-full text-xs font-black tracking-widest mb-4 sm:mb-6">
                <span class="bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">{{ t.about.badge }}</span>
              </div>

              <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
                {{ t.about.title }}
                <span class="block bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">
                  {{ t.about.titleHighlight }}
                </span>
              </h2>
              <div class="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted leading-relaxed">
                <p>
                  <strong class="text-fg">Shounen Shoujo</strong> {{ t.about.p1 }}
                  <strong class="text-cyan-ink">Anikura</strong> {{ t.about.p1Highlight }}
                  {{ t.about.p1Continue }}
                </p>
                <p>{{ t.about.p2 }} <strong class="text-pink-ink">Random Play Dance Team</strong> {{ t.about.p2Highlight }}</p>
                <p>{{ t.about.p3 }} <strong class="text-cyan-ink">{{ t.about.p3Highlight }}</strong> {{ t.about.p3Continue }}</p>
              </div>
            </div>

            <div class="relative scroll-animate">
              <!-- ✅ FIX: Glow di belakang card — hidden di mobile, jadi tidak boros GPU -->
              <div class="absolute inset-0 bg-gradient-to-br from-[#fea3fe] to-[#61fdfe] rounded-2xl sm:rounded-3xl blur-3xl opacity-15 hidden md:block" aria-hidden="true"></div>

              <!--
                ✅ FIX: Hapus backdrop-blur dari about card di mobile
                Ganti dengan bg solid yang lebih gelap
              -->
              <div class="relative about-card rounded-2xl sm:rounded-3xl border border-border-c p-6 sm:p-8 md:p-12 hover:scale-105 transition-transform duration-500">
                <div class="grid grid-cols-2 gap-6 sm:gap-8">

                  <div class="text-center hover:scale-110 transition-transform duration-300">
                    <div class="mb-3 sm:mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#61fdfe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                        <circle cx="8" cy="5" r="2" /><circle cx="16" cy="5" r="2" />
                        <path d="M4 21v-6l4-3 4 3v6" /><path d="M12 21v-6l4-3 4 3v6" />
                      </svg>
                    </div>
                    <div class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#61fdfe] to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">RPD</div>
                    <div class="text-xs sm:text-sm text-subtle font-semibold">{{ t.about.rpd }}</div>
                  </div>

                  <div class="text-center hover:scale-110 transition-transform duration-300">
                    <div class="mb-3 sm:mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#fea3fe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                        <rect x="9" y="2" width="6" height="12" rx="2" /><path d="M5 10v2a7 7 0 0014 0v-2" /><path d="M12 22v-4" />
                      </svg>
                    </div>
                    <div class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#fea3fe] to-[#d066d8] bg-clip-text text-transparent mb-1 sm:mb-2">Utattemita</div>
                    <div class="text-xs sm:text-sm text-subtle font-semibold">{{ t.about.utattemita }}</div>
                  </div>

                  <div class="text-center hover:scale-110 transition-transform duration-300">
                    <div class="mb-3 sm:mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#b87ef5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                        <circle cx="9" cy="13" r="4" /><path d="M13 13h7" /><path d="M20 9v8" />
                      </svg>
                    </div>
                    <div class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#b87ef5] to-[#fea3fe] bg-clip-text text-transparent mb-1 sm:mb-2">Anikura</div>
                    <div class="text-xs sm:text-sm text-subtle font-semibold">{{ t.about.anikura }}</div>
                  </div>

                  <div class="text-center hover:scale-110 transition-transform duration-300">
                    <div class="mb-3 sm:mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#61fdfe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <div class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#61fdfe] to-[#fea3fe] bg-clip-text text-transparent mb-1 sm:mb-2">Media</div>
                    <div class="text-xs sm:text-sm text-subtle font-semibold">{{ t.about.media }}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Activities Section -->
      <section id="activities" class="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#fea3fe]/4 to-transparent">
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="text-center mb-12 sm:mb-20 scroll-animate">

            <div class="inline-flex items-center px-4 py-2 bg-surface border border-border-c rounded-full text-xs font-black tracking-widest mb-4 sm:mb-6">
              <span class="bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">{{ t.activities.badge }}</span>
            </div>

            <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">{{ t.activities.title }}</h2>
            <p class="text-base sm:text-lg md:text-xl text-subtle max-w-2xl mx-auto px-4">{{ t.activities.description }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div v-for="(video, idx) in videos" :key="idx" class="group relative scroll-animate video-card"
              :style="{ animationDelay: `${idx * 100}ms` }">
              <!-- ✅ FIX: Glow hover hanya di desktop -->
              <div class="absolute -inset-1 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-2xl sm:rounded-3xl blur-xl opacity-0 md:group-hover:opacity-50 transition-all duration-500" aria-hidden="true"></div>

              <!--
                ✅ FIX: Hapus backdrop-blur dari video card (mahal x5 card!)
                Ganti solid bg yang lebih dark
              -->
              <div class="relative block video-card-inner rounded-2xl sm:rounded-3xl overflow-hidden border border-border-c group-hover:scale-105 transition-transform duration-500">
                <a :href="video.link" target="_blank" rel="noopener noreferrer"
                  :aria-label="`Watch ${video.title} on YouTube`"
                  class="block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50 rounded-2xl sm:rounded-3xl">
                  <div class="aspect-video relative overflow-hidden">
                    <!--
                      ✅ FIX: Tambah sizes attribute — browser tau ukuran tampil sebelum download
                      Ini hint penting biar browser download resolusi yang tepat
                      Tambah decoding="async" biar tidak block main thread
                    -->
                    <img
                      :src="video.thumbnail"
                      :alt="`Thumbnail for ${video.title}`"
                      loading="lazy"
                      decoding="async"
                      width="1280"
                      height="720"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-black/50 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
                <div class="p-4 sm:p-6">
                  <h3 class="text-lg sm:text-xl font-black text-fg group-hover:bg-gradient-to-r group-hover:from-[#fea3fe] group-hover:to-[#61fdfe] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2 sm:mb-3">
                    {{ video.title }}
                  </h3>
                  <button @click="shareVideo(video)"
                    class="flex items-center gap-2 text-sm text-subtle hover:text-fg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded px-2 py-1"
                    :aria-label="`Share ${video.title}`">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                      <polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span class="font-semibold">{{ t.activities.share }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-12 sm:mt-16 scroll-animate px-4">
            <!--
              ✅ FIX: Hapus backdrop-blur dari tombol view all
            -->
            <a href="https://www.youtube.com/@shounen_shoujo" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-surface border-2 border-border-c rounded-xl sm:rounded-2xl font-black text-sm sm:text-base tracking-wide hover:bg-surface-strong hover:border-[#fea3fe]/60 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/40">
              <span>{{ t.activities.viewAll }}</span>
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto relative z-10 scroll-animate">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#fea3fe] via-[#a855f7] to-[#61fdfe] rounded-[2rem] sm:rounded-[3rem] blur-3xl opacity-35 hidden md:block" aria-hidden="true"></div>
            <div class="relative bg-gradient-to-br from-[#fea3fe] via-[#a855f7] to-[#61fdfe] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center overflow-hidden border border-white/20">
              <div class="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-[0.08] rounded-full blur-3xl" aria-hidden="true"></div>
              <div class="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-black opacity-15 rounded-full blur-3xl" aria-hidden="true"></div>
              <div class="relative z-10">
                <div class="mb-4 sm:mb-6 flex justify-center" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M4 12l4-4 4 4 4-4 4 4" /><path d="M2 10l6-6" /><path d="M22 10l-6-6" />
                  </svg>
                </div>
                <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 drop-shadow-2xl">
                  {{ t.contact.title }}
                </h2>
                <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
                  {{ t.contact.description }}
                  <span class="font-bold">{{ t.contact.descriptionHighlight }}</span>
                </p>
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                  <a href="https://instagram.com/shounenshoujo_" target="_blank" rel="noopener noreferrer"
                    class="group px-6 sm:px-10 py-4 sm:py-5 bg-white text-black rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide hover:scale-105 hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
                    </svg>
                    <span>{{ t.contact.ctaInstagram }}</span>
                  </a>
                  <!--
                    ✅ FIX: Hapus backdrop-blur dari tombol email di contact
                  -->
                  <button @click="copyEmail"
                    class="group px-6 sm:px-10 py-4 sm:py-5 bg-black/30 border-2 border-white/70 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide text-white hover:bg-black/45 hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
                    </svg>
                    <span>{{ t.contact.ctaEmail }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-border-subtle text-fg" role="contentinfo">
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <img src="/image/ss-pink.webp" alt="Shounen Shoujo Logo" loading="lazy" decoding="async" width="80" height="80"
            class="w-16 sm:w-20 transition-opacity duration-500 hover:opacity-80" />
          <div class="text-left">
            <div class="wordmark text-xl sm:text-2xl font-black">
              SHOUNEN SHOUJO
            </div>
            <div class="text-xs font-bold text-subtle tracking-widest">COMMUNITY</div>
          </div>
        </div>

        <p class="text-muted mb-8 sm:mb-10 text-base sm:text-lg font-semibold px-4">{{ t.footer.tagline }}</p>

        <ul class="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 list-none p-0 m-0" aria-label="Social media links">
          <li>
            <!--
              ✅ FIX: Hapus backdrop-blur dari social icons di footer
            -->
            <a href="https://instagram.com/shounenshoujo_" target="_blank" rel="noopener noreferrer"
              class="group w-12 h-12 sm:w-14 sm:h-14 bg-transparent hover:bg-surface-strong rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border-c hover:border-[#fea3fe]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/40"
              aria-label="Follow us on Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 text-muted group-hover:text-pink-ink group-hover:scale-125 transition-all" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@shounen_shoujo" target="_blank" rel="noopener noreferrer"
              class="group w-12 h-12 sm:w-14 sm:h-14 bg-transparent hover:bg-surface-strong rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border-c hover:border-[#61fdfe]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#61fdfe]/40"
              aria-label="Subscribe to our YouTube channel">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7 text-muted group-hover:text-pink-ink group-hover:scale-125 transition-all" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z" />
              </svg>
            </a>
          </li>
        </ul>

        <div class="text-subtle text-xs sm:text-sm font-semibold px-4">
          {{ t.footer.copyright }}
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <transition enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      leave-active-class="transition-all duration-300 ease-in" enter-from-class="opacity-0 translate-y-6 scale-50"
      enter-to-class="opacity-100 translate-y-0 scale-100" leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-6 scale-50">
      <button v-if="showScrollTop" @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-13 h-13 scroll-top-btn rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-transform duration-300 focus:outline-none"
        aria-label="Scroll to top">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fea3fe" />
              <stop offset="100%" stop-color="#61fdfe" />
            </linearGradient>
          </defs>
          <path stroke="url(#arrowGrad)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<style scoped>
/* ===================================================
   HERO — wordmark gradient (ikut tema via CSS var)
=================================================== */
.wordmark {
  background-image: var(--wordmark-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
/* "Breathing" glow HANYA di hero — footer dapat gradient teks tanpa animasi.
   Opacity teks tetap penuh; hanya drop-shadow membesar/mengecil. */
#home .wordmark {
  animation: wordmarkGlow 4s ease-in-out infinite;
}
@keyframes wordmarkGlow {
  0%, 100% { filter: drop-shadow(0 0 14px var(--wm-glow)); }
  50%      { filter: drop-shadow(0 0 22px var(--wm-glow)); }
}

/* ===================================================
   ORBS — "breathing" sendiri (opacity + scale), ritme tak serempak
   Base opacity = var(--orb-opacity) → saat reduced-motion tetap samar, tak menyala penuh.
=================================================== */
.orb {
  opacity: var(--orb-opacity);
  animation: orbBreath 6s ease-in-out infinite;
}
@keyframes orbBreath {
  0%, 100% { opacity: var(--orb-opacity); transform: scale(1); }
  50%      { opacity: calc(var(--orb-opacity) * 1.8); transform: scale(1.12); }
}

/* ===================================================
   BTN PRIMARY
=================================================== */
.btn-primary {
  background: linear-gradient(135deg, #fea3fe 0%, #c084fc 50%, #61fdfe 100%);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.btn-primary:hover {
  filter: brightness(1.1);
}

/* ===================================================
   SCROLL TO TOP BUTTON
=================================================== */
.scroll-top-btn {
  background: var(--surface-strong);
  border: 1.5px solid var(--border);
  width: 52px;
  height: 52px;
}


/* ===================================================
   GLASS BUTTON — backdrop-blur hanya di desktop
   ✅ FIX UTAMA: semua glass effect dimatikan di mobile
=================================================== */
/*
   Hero kini ikut flip, jadi tombol nav SELALU berbasis token.
   Transparan + border tipis; ikon pakai var(--fg) → terbaca di kedua mode.
*/
.glass-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--fg);
}
.glass-btn:hover {
  background: var(--surface);
  border-color: var(--border);
}

/* ===================================================
   NAV SCROLLED STATE
   ✅ FIX: backdrop-blur hanya di md ke atas
=================================================== */
.nav-scrolled {
  background: var(--elevate);
  border-bottom: 1px solid var(--border);
}
@media (min-width: 768px) {
  .nav-scrolled {
    background: var(--elevate);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }
}

/* ===================================================
   ABOUT CARD
   ✅ FIX: backdrop-blur hanya di md ke atas
=================================================== */
.about-card {
  background: var(--surface);
}
@media (min-width: 768px) {
  .about-card {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}

/* ===================================================
   VIDEO CARD INNER
   ✅ FIX: backdrop-blur hanya di md ke atas
=================================================== */
.video-card-inner {
  background: var(--surface);
}
@media (min-width: 768px) {
  .video-card-inner {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}

/* ===================================================
   SCROLL ANIMATE
=================================================== */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* ===================================================
   VIDEO CARD — 3D hover hanya di md ke atas
   ✅ FIX: perspective transform mahal di mobile
=================================================== */
.video-card {
  animation-fill-mode: both;
}
@media (min-width: 768px) {
  .video-card {
    perspective: 1000px;
  }
  .video-card:hover {
    transform: rotateY(2deg) rotateX(-2deg);
  }
}

/* ===================================================
   REDUCED MOTION
=================================================== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .scroll-animate {
    opacity: 1;
    transform: none;
  }
  /* Matikan eksplisit animasi hidup hero */
  #home .wordmark { animation: none; filter: none; }
  .orb { animation: none; }
  .animate-pulse { animation: none; }
}

html {
  scroll-behavior: smooth;
}
:focus-visible {
  outline: none;
}
</style>