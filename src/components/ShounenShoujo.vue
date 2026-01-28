<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)
const isLoading = ref(true)
const isMenuJustOpened = ref(false) // Flag untuk mencegah close immediate

// ============================================
// 🌍 MULTI-LANGUAGE / i18n SYSTEM
// ============================================

// Detect user's region/language
const detectUserLanguage = () => {
  // 1. Check localStorage (user preference)
  const saved = localStorage.getItem('preferred-language')
  if (saved) return saved

  // 2. Check browser language
  const browserLang = navigator.language || navigator.userLanguage

  // 3. Map to supported languages
  if (browserLang.startsWith('id')) return 'id' // Indonesian
  if (browserLang.startsWith('ja')) return 'ja' // Japanese
  return 'en' // Default to English
}

// Current language state
const currentLang = ref(detectUserLanguage())

// Language switcher
const setLanguage = (lang) => {
  currentLang.value = lang
  localStorage.setItem('preferred-language', lang)
}

// Translation object
const translations = {
  id: {
    // Navigation
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      activities: 'Kegiatan',
      contact: 'Kontak'
    },
    // Hero Section
    hero: {
      badge: 'ANIKURA, KOMUNITAS J-POP',
      subtitle: 'J-Pop • Anison • Vocaloid • Idol • Odottemita • Utattemita',
      description: 'J-Pop & Anikura Community yang aktif menghadirkan skena Random Play Dance, Odottemita, dan Utattemita di berbagai event Jejepangan.',
      ctaCollection: 'Koleksi RPD',
      ctaBook: 'BOOK RPD UNTUK EVENT ANDA',
    },
    // About Section
    about: {
      badge: 'TENTANG KAMI',
      title: 'Membawa Skena',
      titleHighlight: 'J-Pop ke Event Anda',
      p1: 'adalah komunitas yang berfokus pada budaya J-Pop,',
      p1Highlight: '(Anime Club Culture: Anisong, Game, dan Vocaloid),',
      p1Continue: 'serta berbagai bentuk budaya pop Jepang lainnya. Kami menjadi wadah bagi penggemar J-Pop, Vocaloid, dan Idol untuk berkumpul, berkreasi, dan bersenang-senang bersama.',
      p2: 'Dengan',
      p2Highlight: 'yang solid, kami aktif tampil di berbagai event lokal, menghadirkan energi dan vibes J-Pop yang autentik. Mulai dari Utattemita hingga Odottemita, kami siap menghibur dan membuat event Anda semakin meriah.',
      p3: 'Kami terbuka untuk kolaborasi dengan',
      p3Highlight: 'Event Organizer',
      p3Continue: 'yang ingin menghadirkan konten J-Pop dan Anikura di event mereka. Mari ciptakan pengalaman event yang berkesan bersama.',
      rpd: 'Random Play Dance',
      utattemita: 'Karaoke / Song Cover',
      anikura: 'Anisong Club',
      media: 'Dokumentasi & Konten Jpop'
    },
    // Activities Section
    activities: {
      badge: 'KEGIATAN KAMI',
      title: 'RPD & Sesi Karaoke',
      description: 'Saksikan aksi kami di berbagai event melalui video dokumentasi kami.',
      share: 'Bagikan',
      viewAll: 'LIHAT SEMUA VIDEO'
    },
    // Contact Section
    contact: {
      title: 'Siap Berkolaborasi?',
      description: 'Sedang mencari talent untuk event Anda? Kami siap membawa energi J-Pop ke acara Anda.',
      descriptionHighlight: 'Mari berkolaborasi.',
      ctaInstagram: 'INSTAGRAM',
      ctaEmail: 'SALIN EMAIL'
    },
    // Footer
    footer: {
      tagline: 'Membawa Budaya J-Pop ke Kehidupan',
      copyright: '© 2025 Shounen Shoujo. Dibuat dengan 💖 oleh Akahara'
    },
    // Toast Messages
    toast: {
      emailCopied: 'Email berhasil disalin! 📋',
      linkCopied: 'Link berhasil disalin! 🔗'
    }
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      activities: 'Activities',
      contact: 'Contact'
    },
    // Hero Section
    hero: {
      badge: 'ANIKURA, J-POP COMMUNITY',
      subtitle: 'J-Pop • Anison • Vocaloid • Idol • Odottemita • Utattemita',
      description: 'An active J-Pop & Anikura Community bringing Random Play Dance, Odottemita, and Utattemita scenes to various Japanese culture events.',
      ctaCollection: 'RPD Collection',
      ctaBook: 'BOOK RPD FOR YOUR EVENT',
    },
    // About Section
    about: {
      badge: 'ABOUT US',
      title: 'Bringing J-Pop',
      titleHighlight: 'to Your Event',
      p1: 'is a community focused on J-Pop culture,',
      p1Highlight: '(Anime Club Culture: Anisong, Games, and Vocaloid),',
      p1Continue: 'and various other forms of Japanese pop culture. We provide a space for J-Pop, Vocaloid, and Idol fans to gather, create, and have fun together.',
      p2: 'With our solid',
      p2Highlight: 'we actively perform at various local events, bringing authentic J-Pop energy and vibes. From Utattemita to Odottemita, we\'re ready to entertain and make your event more exciting.',
      p3: 'We\'re open to collaboration with',
      p3Highlight: 'Event Organizers',
      p3Continue: 'who want to bring J-Pop and Anikura content to their events. Let\'s create memorable event experiences together.',
      rpd: 'Random Play Dance',
      utattemita: 'Karaoke / Song Cover',
      anikura: 'Anisong Club',
      media: 'Documentation & Jpop Content'
    },
    // Activities Section
    activities: {
      badge: 'OUR ACTIVITIES',
      title: 'RPD & Karaoke Session',
      description: 'Watch our performances at various events through our video documentation.',
      share: 'Share',
      viewAll: 'VIEW ALL VIDEOS'
    },
    // Contact Section
    contact: {
      title: 'Ready to Collaborate?',
      description: 'Looking for talent for your event? We\'re ready to bring J-Pop energy to your occasion.',
      descriptionHighlight: 'Let\'s collaborate.',
      ctaInstagram: 'INSTAGRAM',
      ctaEmail: 'COPY EMAIL'
    },
    // Footer
    footer: {
      tagline: 'Bringing J-Pop Culture to Life',
      copyright: '© 2025 Shounen Shoujo. Made with 💖 by Akahara'
    },
    // Toast Messages
    toast: {
      emailCopied: 'Email copied to clipboard! 📋',
      linkCopied: 'Link copied to clipboard! 🔗'
    }
  },

  ja: {
    // Navigation
    nav: {
      home: 'ホーム',
      about: '私たちについて',
      activities: '活動',
      contact: 'お問い合わせ'
    },
    // Hero Section
    hero: {
      badge: 'アニクラ、J-POPコミュニティ',
      subtitle: 'J-Pop • アニソン • ボカロ • アイドル • 踊ってみた • 歌ってみた',
      description: 'ランダムプレイダンス、踊ってみた、歌ってみたのシーンを様々な日本文化イベントで展開する活発なJ-Pop＆アニクラコミュニティです。',
      ctaCollection: 'RPDコレクション',
      ctaBook: 'イベントにRPDを予約する',
    },
    // About Section
    about: {
      badge: '私たちについて',
      title: 'J-Popのシーンを',
      titleHighlight: 'あなたのイベントへ',
      p1: 'は、J-Pop文化、',
      p1Highlight: '（アニメクラブカルチャー：アニソン、ゲーム、ボカロ）、',
      p1Continue: 'および日本のポップカルチャーの様々な形態に焦点を当てたコミュニティです。J-Pop、ボカロ、アイドルファンが集まり、創作し、一緒に楽しむ場を提供しています。',
      p2: '堅実な',
      p2Highlight: 'で、私たちは様々なローカルイベントで積極的にパフォーマンスを行い、本格的なJ-Popのエネルギーと雰囲気をもたらしています。歌ってみたから踊ってみたまで、あなたのイベントをより盛り上げる準備ができています。',
      p3: 'イベントにJ-Popとアニクラコンテンツを取り入れたい',
      p3Highlight: 'イベントオーガナイザー',
      p3Continue: 'とのコラボレーションを歓迎しています。一緒に思い出に残るイベント体験を作りましょう。',
      rpd: 'ランダムプレイダンス',
      utattemita: 'カラオケ / 歌ってみた',
      anikura: 'アニソンクラブ',
      media: 'ドキュメンテーション & Jpopコンテンツ'
    },
    // Activities Section
    activities: {
      badge: '私たちの活動',
      title: 'RPD ＆ カラオケセッション',
      description: '様々なイベントでのパフォーマンスをビデオドキュメンテーションでご覧ください。',
      share: 'シェア',
      viewAll: 'すべてのビデオを見る'
    },
    // Contact Section
    contact: {
      title: 'コラボレーションの準備はできていますか？',
      description: 'イベントのタレントをお探しですか？私たちはあなたのイベントにJ-Popのエネルギーをもたらす準備ができています。',
      descriptionHighlight: '一緒にコラボレーションしましょう。',
      ctaInstagram: 'インスタグラム',
      ctaEmail: 'メールをコピー'
    },
    // Footer
    footer: {
      tagline: 'J-Pop文化を生き生きと',
      copyright: '© 2025 Shounen Shoujo. 💖で作られました by Akahara'
    },
    // Toast Messages
    toast: {
      emailCopied: 'メールがコピーされました！📋',
      linkCopied: 'リンクがコピーされました！🔗'
    }
  }
}

// Computed property untuk akses translation
const t = computed(() => translations[currentLang.value])

// Language names untuk dropdown
const languages = [
  { code: 'id', name: 'Indonesia', flag: 'ɪᴅ' },
  { code: 'en', name: 'English', flag: 'ᴇɴ' },
  { code: 'ja', name: '日本語', flag: 'ᴊᴘ' }
]

const isLangMenuOpen = ref(false)

// ============================================
// END OF i18n SYSTEM
// ============================================

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (window.scrollY / windowHeight) * 100
}

const closeMenuOnOutsideClick = (event) => {
  // Skip jika menu baru saja dibuka
  if (isMenuJustOpened.value) {
    return
  }

  const mobileMenu = document.querySelector('.mobile-menu')
  const menuButton = document.querySelector('.menu-button')
  const langMenu = document.querySelector('.lang-menu')
  const langButton = document.querySelector('.lang-button')

  // Check if click is inside mobile menu (termasuk language section)
  if (mobileMenu && mobileMenu.contains(event.target)) {
    // Jika click pada language button di dalam mobile menu, allow it
    return
  }

  // Check if click is inside language dropdown
  if (langMenu && langMenu.contains(event.target)) {
    return
  }

  if (langButton && langButton.contains(event.target)) {
    return
  }

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

// Function untuk toggle menu dengan delay protection
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  // Set flag bahwa menu baru dibuka
  if (isMenuOpen.value) {
    isMenuJustOpened.value = true
    // Reset flag setelah 100ms
    setTimeout(() => {
      isMenuJustOpened.value = false
    }, 100)
  }
}

const setupIntersectionObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, options)

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el)
  })

  return observer
}

const copyEmail = async () => {
  const email = 'shounenshoujo19@email.com'
  try {
    await navigator.clipboard.writeText(email)
    showToast(t.value.toast.emailCopied)
  } catch (err) {
    const textArea = document.createElement('textarea')
    textArea.value = email
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showToast(t.value.toast.emailCopied)
  }
}

const toastMessage = ref('')
const showToastFlag = ref(false)
const showToast = (message) => {
  toastMessage.value = message
  showToastFlag.value = true
  setTimeout(() => {
    showToastFlag.value = false
  }, 3000)
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)

  window.addEventListener('scroll', handleScroll)
  
  // Gunakan capturing phase untuk document click listener
  document.addEventListener('click', closeMenuOnOutsideClick, true)
  document.addEventListener('keydown', handleEscapeKey)

  setTimeout(() => {
    setupIntersectionObserver()
  }, 100)

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        isMenuOpen.value = false
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeMenuOnOutsideClick, true)
  document.removeEventListener('keydown', handleEscapeKey)
})

const videos = [
  {
    title: "ODORISHO RPD VOL. 1",
    thumbnail: "/image/thum3.png",
    link: "https://youtu.be/7DjSxkNy-ho?si=G3-6JDsmZY7MwQwG"
  },
  {
    title: "ODORISHO RPD VOL. 2.5",
    thumbnail: "/image/thum2.png",
    link: "https://youtu.be/gEXuPEbk85I?si=vURyUFI_WC-j8iRD"
  },
  {
    title: "ODORISHO RPD VOL. 3",
    thumbnail: "/image/thum1.png",
    link: "https://youtu.be/4JzGPu56rQo?si=-j0TfUT7r65LL_E2"
  },
  {
    title: "UTAISHO KARAOKE VOL. 1",
    thumbnail: "/image/thum4.png",
    link: "https://youtu.be/Kh9qVLhWEmg?si=FgPafIoE-D1b_RKG"
  }
]

const shareVideo = async (video) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: video.title,
        text: `Check out ${video.title} by Shounen Shoujo!`,
        url: video.link
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard(video.link)
      }
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
  <div class="min-h-screen bg-black text-white overflow-x-hidden">
    <!-- Loading Screen -->
    <transition enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-500" enter-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isLoading" class="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <div class="text-center">
          <div class="w-20 h-20 border-4 border-[#fea3fe] border-t-transparent rounded-full animate-spin mx-auto mb-4">
          </div>
          <p class="text-white/60 font-bold">Loading...</p>
        </div>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2">
      <div v-if="showToastFlag"
        class="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <p class="text-white font-bold">{{ toastMessage }}</p>
      </div>
    </transition>

    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-white/10 z-[60]">
      <div class="h-full bg-gradient-to-r from-[#fea3fe] via-purple-400 to-[#61fdfe] transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <!-- Japanese Pattern Background -->
    <div class="fixed inset-0 opacity-5 pointer-events-none z-0">
      <div class="absolute inset-0"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px);">
      </div>
    </div>

    <!-- Animated Gradient Blobs -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#fea3fe] opacity-20 rounded-full blur-[120px] animate-pulse will-change-transform"
        :style="{ transform: `translate(${scrollProgress * 0.5}px, ${scrollProgress * 0.3}px)` }">
      </div>
      <div
        class="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#61fdfe] opacity-20 rounded-full blur-[120px] animate-pulse will-change-transform"
        style="animation-delay: 1.5s;"
        :style="{ transform: `translate(-${scrollProgress * 0.3}px, ${scrollProgress * 0.5}px)` }">
      </div>
      <div
        class="absolute -bottom-40 right-1/3 w-[450px] h-[450px] bg-purple-500 opacity-15 rounded-full blur-[120px] animate-pulse will-change-transform"
        style="animation-delay: 3s;"
        :style="{ transform: `translate(${scrollProgress * 0.2}px, -${scrollProgress * 0.4}px)` }">
      </div>
    </div>

    <!-- Navigation -->
    <nav :class="[
      'fixed w-full z-50 transition-all duration-500',
      scrolled
        ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10'
        : 'bg-transparent'
    ]" role="navigation" aria-label="Main navigation">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">
          <!-- Logo -->
          <a href="#home"
            class="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded-xl"
            aria-label="Shounen Shoujo Home">
            <div class="relative flex items-center gap-3 px-0 md:px-6 py-3 rounded-2xl">
              <span class="text-3xl">
                <img src="/image/ss-pink.png" alt="Shounen Shoujo Logo" loading="eager"
                  class="w-32 transition-all duration-500 hover:opacity-80 hover:scale-105 will-change-transform" />
              </span>
            </div>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-2">
            <a v-for="(item, key) in t.nav" :key="key" :href="`#${key}`" :aria-label="`Navigate to ${item} section`"
              class="relative px-6 py-3 font-bold text-sm tracking-wide text-white/80 hover:text-white transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded-xl">
              <span class="relative z-10">{{ item.toUpperCase() }}</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 will-change-opacity">
              </div>
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] group-hover:w-full transition-all duration-300">
              </div>
            </a>

            <!-- Language Switcher Desktop -->
            <div class="relative ml-4">
              <button @click.stop="isLangMenuOpen = !isLangMenuOpen"
                class="lang-button flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#fea3fe]/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
                :aria-label="`Current language: ${languages.find(l => l.code === currentLang).name}`">

                <span class="text-base font-bold leading-none tracking-tight pb-1">
                  {{languages.find(l => l.code === currentLang).flag}}
                </span>

                <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isLangMenuOpen }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <!-- Language Dropdown -->
              <transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2">
                <div v-if="isLangMenuOpen"
                  class="lang-menu absolute right-0 mt-3 w-48 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                  <button v-for="lang in languages" :key="lang.code"
                    @click.stop="setLanguage(lang.code); isLangMenuOpen = false"
                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-all text-left group"
                    :class="{ 'bg-gradient-to-r from-[#fea3fe]/10 to-[#61fdfe]/10 border-l-2 border-[#fea3fe]': currentLang === lang.code }">
                    <span class="text-xl group-hover:scale-110 transition-transform pb-1">{{ lang.flag }}</span>
                    <span class="font-bold text-sm flex-1">{{ lang.name }}</span>
                    <svg v-if="currentLang === lang.code" class="w-5 h-5 text-[#fea3fe]" fill="currentColor"
                      viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <!-- Mobile Menu Button - GUNAKAN toggleMenu() -->
          <button @click="toggleMenu"
            class="menu-button md:hidden p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="isMenuOpen">
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              aria-hidden="true">
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
          <div v-if="isMenuOpen" class="mobile-menu md:hidden pb-6 space-y-2">
            <a v-for="(item, key) in t.nav" :key="key" :href="`#${key}`" @click="isMenuOpen = false"
              :aria-label="`Navigate to ${item} section`"
              class="block px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-sm tracking-wide hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]">
              {{ item.toUpperCase() }}
            </a>

            <!-- Language Switcher Mobile -->
            <div class="pt-4 border-t border-white/10 mt-4">
              <p class="px-6 py-2 text-xs text-white/40 font-black tracking-widest">SELECT LANGUAGE</p>
              <div class="space-y-2">
                <button v-for="lang in languages" :key="lang.code"
                  @click.stop="setLanguage(lang.code); isMenuOpen = false"
                  class="w-full flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#fea3fe]/50 transition-all group"
                  :class="{ 'bg-gradient-to-r from-[#fea3fe]/10 to-[#61fdfe]/10 border-[#fea3fe] ring-1 ring-[#fea3fe]/30': currentLang === lang.code }">
                  <span class="text-2xl group-hover:scale-110 transition-transform pb-1.5">{{ lang.flag }}</span>
                  <span class="font-bold text-base flex-1 text-left">{{ lang.name }}</span>
                  <svg v-if="currentLang === lang.code" class="w-5 h-5 text-[#fea3fe]" fill="currentColor"
                    viewBox="0 0 20 20">
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

      <!-- Mobile Menu Backdrop -->
      <transition enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
        <div v-if="isMenuOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 md:hidden"
          @click="isMenuOpen = false" aria-hidden="true"></div>
      </transition>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24">
      <div class="max-w-7xl mx-auto w-full relative z-10">
        <div class="text-center scroll-animate">
          <div
            class="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 bg-white/5 backdrop-blur-xl rounded-full border border-white/20">
            <span class="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fea3fe] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#fea3fe]"></span>
            </span>
            <span class="text-xs sm:text-sm font-bold tracking-wider text-white/90">{{ t.hero.badge }}</span>
          </div>

          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-none">
            <span
              class="inline-block bg-gradient-to-r from-[#fea3fe] via-purple-400 to-[#61fdfe] bg-clip-text text-transparent drop-shadow-2xl animate-pulse will-change-opacity"
              style="text-shadow: 0 0 30px rgba(254, 163, 254, 0.3);">
              SHOUNEN
            </span>
            <br />
            <span
              class="inline-block bg-gradient-to-r from-[#61fdfe] via-blue-400 to-[#fea3fe] bg-clip-text text-transparent drop-shadow-2xl"
              style="animation-delay: 0.5s; text-shadow: 0 0 30px rgba(97, 253, 254, 0.3);">
              SHOUJO
            </span>
          </h1>

          <p class="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-3 sm:mb-4 font-bold tracking-wide px-4">
            {{ t.hero.subtitle }}
          </p>

          <p class="text-base sm:text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            {{ t.hero.description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-stretch sm:items-center mb-12 sm:mb-16 px-4">
            <a href="#activities" class="group relative px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe]
                rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide overflow-hidden
                transform hover:scale-105 transition-all duration-300 will-change-transform
                focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50 text-center"
              :aria-label="t.hero.ctaCollection">
              <span class="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform will-change-transform"
                  viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 4h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  <path d="M16 10l6-4v12l-6-4z" />
                </svg>
                <span>{{ t.hero.ctaCollection }}</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-[#61fdfe] to-[#fea3fe]
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a href="#contact" class="px-6 sm:px-10 py-4 sm:py-5 bg-white/5 backdrop-blur-xl border-2 border-white/20
                rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide text-white
                hover:bg-white/10 hover:border-[#61fdfe]
                transform hover:scale-105 transition-all duration-300 will-change-transform
                focus:outline-none focus-visible:ring-4 focus-visible:ring-[#61fdfe]/50 text-center" :aria-label="t.hero.ctaBook">
              {{ t.hero.ctaBook }}
            </a>
          </div>

          <div class="flex justify-center">
            <div class="animate-bounce">
              <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3">
                </path>
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
            <div
              class="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-full text-xs font-black tracking-widest mb-4 sm:mb-6">
              {{ t.about.badge }}
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
              {{ t.about.title }}
              <span class="block bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">
                {{ t.about.titleHighlight }}
              </span>
            </h2>

            <div class="space-y-4 sm:space-y-6 text-base sm:text-lg text-white/70 leading-relaxed">
              <p>
                <strong class="text-white">Shounen Shoujo</strong> {{ t.about.p1 }}
                <strong class="text-[#61fdfe]">Anikura</strong> {{ t.about.p1Highlight }}
                {{ t.about.p1Continue }}
              </p>

              <p>
                {{ t.about.p2 }} <strong class="text-[#fea3fe]">Random Play Dance Team</strong> {{ t.about.p2Highlight
                }}
              </p>

              <p>
                {{ t.about.p3 }}
                <strong class="text-[#61fdfe]">{{ t.about.p3Highlight }}</strong>
                {{ t.about.p3Continue }}
              </p>
            </div>
          </div>

          <div class="relative scroll-animate">
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#fea3fe] to-[#61fdfe] rounded-2xl sm:rounded-3xl blur-3xl opacity-30 will-change-opacity">
            </div>

            <div class="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 md:p-12
              transform hover:scale-105 transition-all duration-500 will-change-transform">

              <div class="grid grid-cols-2 gap-6 sm:gap-8">
                <div
                  class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-3 sm:mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#61fdfe]" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <circle cx="8" cy="5" r="2" />
                      <circle cx="16" cy="5" r="2" />
                      <path d="M4 21v-6l4-3 4 3v6" />
                      <path d="M12 21v-6l4-3 4 3v6" />
                    </svg>
                  </div>
                  <div
                    class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#61fdfe] to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                    RPD
                  </div>
                  <div class="text-xs sm:text-sm text-white/60 font-semibold">
                    {{ t.about.rpd }}
                  </div>
                </div>

                <div
                  class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-3 sm:mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#fea3fe]" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <rect x="9" y="2" width="6" height="12" rx="2" />
                      <path d="M5 10v2a7 7 0 0014 0v-2" />
                      <path d="M12 22v-4" />
                    </svg>
                  </div>
                  <div
                    class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#fea3fe] to-purple-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                    Utattemita
                  </div>
                  <div class="text-xs sm:text-sm text-white/60 font-semibold">
                    {{ t.about.utattemita }}
                  </div>
                </div>

                <div
                  class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-3 sm:mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-400" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <circle cx="9" cy="13" r="4" />
                      <path d="M13 13h7" />
                      <path d="M20 9v8" />
                    </svg>
                  </div>
                  <div
                    class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-[#fea3fe] bg-clip-text text-transparent mb-1 sm:mb-2">
                    Anikura
                  </div>
                  <div class="text-xs sm:text-sm text-white/60 font-semibold">
                    {{ t.about.anikura }}
                  </div>
                </div>

                <div
                  class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-3 sm:mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-pink-400" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div
                    class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-400 to-[#61fdfe] bg-clip-text text-transparent mb-1 sm:mb-2">
                    Media
                  </div>
                  <div class="text-xs sm:text-sm text-white/60 font-semibold">
                    {{ t.about.media }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Section -->
    <section id="activities"
      class="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#fea3fe]/5 to-transparent">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-12 sm:mb-20 scroll-animate">
          <div
            class="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-full text-xs font-black tracking-widest mb-4 sm:mb-6">
            {{ t.activities.badge }}
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            {{ t.activities.title }}
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            {{ t.activities.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="(video, idx) in videos" :key="idx" class="group relative scroll-animate video-card"
            :style="{ animationDelay: `${idx * 100}ms` }">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 will-change-opacity">
            </div>
            <div
              class="relative block bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 transform group-hover:scale-105 transition-all duration-500 will-change-transform">
              <a :href="video.link" target="_blank" rel="noopener noreferrer"
                :aria-label="`Watch ${video.title} on YouTube`"
                class="block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50 rounded-2xl sm:rounded-3xl">
                <div class="aspect-video relative overflow-hidden">
                  <img :src="video.thumbnail" :alt="`Thumbnail for ${video.title}`" loading="lazy"
                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform" />
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      class="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/50 transform group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
              <div class="p-4 sm:p-6">
                <h3
                  class="text-lg sm:text-xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#fea3fe] group-hover:to-[#61fdfe] group-hover:bg-clip-text transition-all duration-300 mb-2 sm:mb-3">
                  {{ video.title }}
                </h3>

                <button @click="shareVideo(video)"
                  class="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded px-2 py-1"
                  :aria-label="`Share ${video.title}`">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  <span class="font-semibold">{{ t.activities.share }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12 sm:mt-16 scroll-animate px-4">
          <a href="https://www.youtube.com/@shounenshoujou" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base tracking-wide hover:bg-white/10 hover:border-[#fea3fe] transform hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50"
            :aria-label="t.activities.viewAll">
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
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#fea3fe] via-purple-500 to-[#61fdfe] rounded-[2rem] sm:rounded-[3rem] blur-3xl opacity-50">
          </div>
          <div
            class="relative bg-gradient-to-br from-[#fea3fe] via-purple-500 to-[#61fdfe] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center overflow-hidden border-2 sm:border-4 border-white/20">
            <div class="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-black opacity-20 rounded-full blur-3xl"></div>

            <div class="relative z-10">
              <div class="mb-4 sm:mb-6 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                  <path d="M4 12l4-4 4 4 4-4 4 4" />
                  <path d="M2 10l6-6" />
                  <path d="M22 10l-6-6" />
                </svg>
              </div>

              <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 drop-shadow-2xl">
                {{ t.contact.title }}
              </h2>

              <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
                {{ t.contact.description }}
                <span class="font-semibold">{{ t.contact.descriptionHighlight }}</span>
              </p>

              <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <a href="https://instagram.com/shounenshoujo_" target="_blank" rel="noopener noreferrer" class="group px-6 sm:px-10 py-4 sm:py-5 bg-white text-black rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide
                    transform hover:scale-105 transition-all duration-300 will-change-transform
                    flex items-center justify-center gap-3 sm:gap-4
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                  :aria-label="t.contact.ctaInstagram">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform will-change-transform"
                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
                  </svg>
                  <span>{{ t.contact.ctaInstagram }}</span>
                </a>

                <button @click="copyEmail" class="group px-6 sm:px-10 py-4 sm:py-5 bg-black/30 backdrop-blur-xl border-2 sm:border-4 border-white
                    rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide text-white
                    hover:bg-black/50 transform hover:scale-105 transition-all duration-300 will-change-transform
                    flex items-center justify-center gap-3 sm:gap-4
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                  :aria-label="t.contact.ctaEmail">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform will-change-transform"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span>{{ t.contact.ctaEmail }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10" role="contentinfo">
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <img src="/image/ss-pink.png" alt="Shounen Shoujo Logo" loading="lazy"
            class="w-16 sm:w-20 transition-all duration-500 hover:opacity-80 hover:scale-105 will-change-transform" />
          <div class="text-left">
            <div class="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">
              SHOUNEN SHOUJO
            </div>
            <div class="text-xs font-bold text-white/50 tracking-widest">
              COMMUNITY
            </div>
          </div>
        </div>

        <p class="text-white/60 mb-8 sm:mb-10 text-base sm:text-lg font-semibold px-4">
          {{ t.footer.tagline }}
        </p>

        <div class="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10" role="list" aria-label="Social media links">
          <a href="https://instagram.com/shounenshoujo_" target="_blank" rel="noopener noreferrer" class="group w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
              flex items-center justify-center transition-all duration-300
              hover:scale-110 border border-white/20 will-change-transform
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50"
            aria-label="Follow us on Instagram">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-125 transition-transform will-change-transform"
              viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
            </svg>
          </a>

          <a href="https://www.youtube.com/@shounenshoujou" target="_blank" rel="noopener noreferrer" class="group w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
              flex items-center justify-center transition-all duration-300
              hover:scale-110 border border-white/20 will-change-transform
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50"
            aria-label="Subscribe to our YouTube channel">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-125 transition-transform will-change-transform"
              viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z" />
            </svg>
          </a>
        </div>

        <div class="text-white/40 text-xs sm:text-sm font-semibold px-4">
          {{ t.footer.copyright }}
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.video-card {
  animation-fill-mode: both;
}

:focus-visible {
  outline: none;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .scroll-animate {
    opacity: 1;
    transform: none;
  }
}

.video-card {
  perspective: 1000px;
}

.video-card:hover {
  transform: rotateY(2deg) rotateX(-2deg);
}

.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}
</style>