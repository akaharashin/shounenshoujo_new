<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)
const isLoading = ref(true)

// Intersection Observer untuk scroll animations
const observedElements = ref(new Set())

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  
  // Calculate scroll progress
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (window.scrollY / windowHeight) * 100
}

// Close menu on outside click
const closeMenuOnOutsideClick = (event) => {
  const mobileMenu = document.querySelector('.mobile-menu')
  const menuButton = document.querySelector('.menu-button')
  
  if (isMenuOpen.value && mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
    isMenuOpen.value = false
  }
}

// Close menu on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

// Setup Intersection Observer for scroll animations
const setupIntersectionObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observedElements.value.add(entry.target)
      }
    })
  }, options)
  
  // Observe all elements with scroll-animate class
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el)
  })
  
  return observer
}

// Copy to clipboard with toast notification
const copyEmail = async () => {
  const email = 'shounenshoujo19@email.com'
  try {
    await navigator.clipboard.writeText(email)
    showToast('Email copied to clipboard! 📋')
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = email
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showToast('Email copied to clipboard! 📋')
  }
}

// Toast notification
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
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
  }, 500)
  
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closeMenuOnOutsideClick)
  document.addEventListener('keydown', handleEscapeKey)
  
  // Setup intersection observer after component mounted
  setTimeout(() => {
    setupIntersectionObserver()
  }, 100)

  // Smooth scroll untuk semua anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        isMenuOpen.value = false // Close mobile menu
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
  document.removeEventListener('click', closeMenuOnOutsideClick)
  document.removeEventListener('keydown', handleEscapeKey)
})

// Video Portfolio
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
    title: "UTAIMASHO KARAOKE VOL. 1",
    thumbnail: "/image/thum4.png",
    link: "https://youtu.be/Kh9qVLhWEmg?si=FgPafIoE-D1b_RKG"
  }
]

// Share video function
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
    showToast('Link copied to clipboard! 🔗')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-black text-white overflow-x-hidden">
    <!-- Loading Screen -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-500"
      enter-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isLoading" class="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <div class="text-center">
          <div class="w-20 h-20 border-4 border-[#fea3fe] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white/60 font-bold">Loading...</p>
        </div>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="showToastFlag" class="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <p class="text-white font-bold">{{ toastMessage }}</p>
      </div>
    </transition>

    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-white/10 z-[60]">
      <div 
        class="h-full bg-gradient-to-r from-[#fea3fe] via-purple-400 to-[#61fdfe] transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- Japanese Pattern Background -->
    <div class="fixed inset-0 opacity-5 pointer-events-none z-0">
      <div class="absolute inset-0"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px);">
      </div>
    </div>

    <!-- Animated Gradient Blobs with Parallax -->
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
    <nav 
      :class="[
        'fixed w-full z-50 transition-all duration-500',
        scrolled
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10'
          : 'bg-transparent'
      ]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">
          <!-- Logo -->
          <a href="#home" class="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded-xl" aria-label="Shounen Shoujo Home">
            <div class="relative flex items-center gap-3 px-0 md:px-6 py-3 rounded-2xl">
              <span class="text-3xl">
                <img 
                  src="/image/ss-pink.png" 
                  alt="Shounen Shoujo Logo"
                  loading="eager"
                  class="w-32 transition-all duration-500 hover:opacity-80 hover:scale-105 will-change-transform" 
                />
              </span>
            </div>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-2">
            <a 
              v-for="item in ['Home', 'About', 'Activities', 'Contact']" 
              :key="item" 
              :href="`#${item.toLowerCase()}`"
              :aria-label="`Navigate to ${item} section`"
              class="relative px-6 py-3 font-bold text-sm tracking-wide text-white/80 hover:text-white transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded-xl"
            >
              <span class="relative z-10">{{ item.toUpperCase() }}</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 will-change-opacity">
              </div>
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] group-hover:w-full transition-all duration-300 will-change-auto">
              </div>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="menu-button md:hidden p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            aria-expanded="isMenuOpen"
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu with Backdrop -->
        <transition 
          enter-active-class="transition duration-300 ease-out" 
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0" 
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0" 
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-if="isMenuOpen" class="mobile-menu md:hidden pb-6 space-y-2">
            <a 
              v-for="item in ['Home', 'About', 'Activities', 'Contact']" 
              :key="item" 
              :href="`#${item.toLowerCase()}`"
              @click="isMenuOpen = false"
              :aria-label="`Navigate to ${item} section`"
              class="block px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-sm tracking-wide hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe]"
            >
              {{ item.toUpperCase() }}
            </a>
          </div>
        </transition>
      </div>
      
      <!-- Mobile Menu Backdrop -->
      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isMenuOpen" 
          class="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 md:hidden"
          @click="isMenuOpen = false"
          aria-hidden="true"
        ></div>
      </transition>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24">
      <div class="max-w-7xl mx-auto w-full relative z-10">
        <div class="text-center scroll-animate">
          <!-- Accent Badge -->
          <div
            class="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/5 backdrop-blur-xl rounded-full border border-white/20">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fea3fe] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-[#fea3fe]"></span>
            </span>
            <span class="text-sm font-bold tracking-wider text-white/90">ANIKURA, J-POP COMMUNITY</span>
          </div>

          <!-- Main Title -->
          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-none">
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

          <p class="text-xl sm:text-2xl lg:text-3xl text-white/70 mb-4 font-bold tracking-wide">
            J-Pop • Anison • Vocaloid • Idol • Odottemita • Utattemita
          </p>

          <p class="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            J-Pop & Anikura Community yang aktif menghadirkan skena Random Play Dance, Odottemita, dan Utattemita di
            berbagai event Jejepangan.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <!-- RPD Collection -->
            <a 
              href="#activities" 
              class="group relative px-10 py-5 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe]
                rounded-2xl font-black text-lg tracking-wide overflow-hidden
                transform hover:scale-105 transition-all duration-300 will-change-transform
                focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50
                ripple-button"
              aria-label="View RPD Collection"
            >
              <span class="relative z-10 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-black group-hover:scale-110 transition-transform will-change-transform" viewBox="0 0 24 24"
                  fill="currentColor" aria-hidden="true">
                  <path d="M4 4h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  <path d="M16 10l6-4v12l-6-4z" />
                </svg>
                <span>RPD Collection</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-[#61fdfe] to-[#fea3fe]
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <!-- Book Us -->
            <a 
              href="#contact" 
              class="px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/20
                rounded-2xl font-black text-lg tracking-wide text-white
                hover:bg-white/10 hover:border-[#61fdfe]
                transform hover:scale-105 transition-all duration-300 will-change-transform
                focus:outline-none focus-visible:ring-4 focus-visible:ring-[#61fdfe]/50"
              aria-label="Book RPD for your event"
            >
              BOOK RPD FOR YOUR EVENT
            </a>
          </div>

          <!-- Scroll Indicator -->
          <div class="flex justify-center">
            <div class="animate-bounce">
              <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="relative py-32 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left Content -->
          <div class="scroll-animate">
            <div
              class="inline-block px-4 py-2 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-full text-xs font-black tracking-widest mb-6">
              ABOUT US
            </div>
            <h2 class="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              Membawa Skena
              <span class="block bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">
                J-Pop ke Event Anda
              </span>
            </h2>

            <div class="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                <strong class="text-white">Shounen Shoujo</strong> adalah komunitas yang berfokus pada budaya J-Pop,
                <strong class="text-[#61fdfe]">Anikura</strong> (Anime Club Culture: Anisong, Game, dan Vocaloid),
                serta berbagai bentuk budaya pop Jepang lainnya.
                Kami menjadi wadah bagi penggemar J-Pop, Vocaloid, dan Idol
                untuk berkumpul, berkreasi, dan bersenang-senang bersama.
              </p>

              <p>
                Dengan <strong class="text-[#fea3fe]">Random Play Dance Team</strong> yang solid,
                kami aktif tampil di berbagai event lokal,
                menghadirkan energi dan vibes J-Pop yang autentik.
                Mulai dari Utattemita hingga Odottemita,
                kami siap menghibur dan membuat event Anda semakin meriah.
              </p>

              <p>
                Kami terbuka untuk kolaborasi dengan
                <strong class="text-[#61fdfe]">Event Organizer</strong>
                yang ingin menghadirkan konten J-Pop dan Anikura di event mereka.
                Mari ciptakan pengalaman event yang berkesan bersama.
              </p>
            </div>
          </div>

          <!-- Right Visual -->
          <div class="relative scroll-animate">
            <!-- Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#fea3fe] to-[#61fdfe] rounded-3xl blur-3xl opacity-30 will-change-opacity">
            </div>

            <!-- Glass Card -->
            <div class="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-12
              transform hover:scale-105 transition-all duration-500 will-change-transform">

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <!-- RPD -->
                <div class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-[#61fdfe]" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <circle cx="8" cy="5" r="2" />
                      <circle cx="16" cy="5" r="2" />
                      <path d="M4 21v-6l4-3 4 3v6" />
                      <path d="M12 21v-6l4-3 4 3v6" />
                    </svg>
                  </div>
                  <div
                    class="text-3xl font-black bg-gradient-to-r from-[#61fdfe] to-blue-400 bg-clip-text text-transparent mb-2">
                    RPD
                  </div>
                  <div class="text-sm text-white/60 font-semibold">
                    Random Play Dance
                  </div>
                </div>

                <!-- Utattemita -->
                <div class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-[#fea3fe]" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <rect x="9" y="2" width="6" height="12" rx="2" />
                      <path d="M5 10v2a7 7 0 0014 0v-2" />
                      <path d="M12 22v-4" />
                    </svg>
                  </div>
                  <div
                    class="text-3xl font-black bg-gradient-to-r from-[#fea3fe] to-purple-400 bg-clip-text text-transparent mb-2">
                    Utattemita
                  </div>
                  <div class="text-sm text-white/60 font-semibold">
                    Karaoke / Song Cover
                  </div>
                </div>

                <!-- Anikura -->
                <div class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-purple-400" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <circle cx="9" cy="13" r="4" />
                      <path d="M13 13h7" />
                      <path d="M20 9v8" />
                    </svg>
                  </div>
                  <div
                    class="text-3xl font-black bg-gradient-to-r from-purple-400 to-[#fea3fe] bg-clip-text text-transparent mb-2">
                    Anikura
                  </div>
                  <div class="text-sm text-white/60 font-semibold">
                    Anisong Club
                  </div>
                </div>

                <!-- Media -->
                <div class="text-center transform hover:scale-110 transition-transform duration-300 will-change-transform">
                  <div class="mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-pink-400" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div
                    class="text-3xl font-black bg-gradient-to-r from-pink-400 to-[#61fdfe] bg-clip-text text-transparent mb-2">
                    Media
                  </div>
                  <div class="text-sm text-white/60 font-semibold">
                    Documentation & Jpop Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="activities"
      class="relative py-32 px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#fea3fe]/5 to-transparent">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-20 scroll-animate">
          <div
            class="inline-block px-4 py-2 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-full text-xs font-black tracking-widest mb-6">
            OUR ACTIVITIES
          </div>
          <h2 class="text-5xl lg:text-6xl font-black mb-6">
            RPD & Karaoke Session
          </h2>
          <p class="text-xl text-white/60 max-w-2xl mx-auto">
            Saksikan aksi kami di berbagai event melalui video dokumentasi kami.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(video, idx) in videos" 
            :key="idx" 
            class="group relative scroll-animate video-card"
            :style="{ animationDelay: `${idx * 100}ms` }"
          >
            <div
              class="absolute -inset-1 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 will-change-opacity">
            </div>
            <div
              class="relative block bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 transform group-hover:scale-105 transition-all duration-500 will-change-transform"
            >
              <a 
                :href="video.link" 
                target="_blank" 
                rel="noopener noreferrer"
                :aria-label="`Watch ${video.title} on YouTube`"
                class="block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50 rounded-3xl"
              >
                <div class="aspect-video relative overflow-hidden">
                  <img 
                    :src="video.thumbnail" 
                    :alt="`Thumbnail for ${video.title}`"
                    loading="lazy"
                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform" 
                  />
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      class="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/50 transform group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
              <div class="p-6">
                <h3
                  class="text-xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#fea3fe] group-hover:to-[#61fdfe] group-hover:bg-clip-text transition-all duration-300 mb-3">
                  {{ video.title }}
                </h3>
                
                <!-- Share Button -->
                <button
                  @click="shareVideo(video)"
                  class="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fea3fe] rounded px-2 py-1"
                  :aria-label="`Share ${video.title}`"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  <span class="font-semibold">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-16 scroll-animate">
          <a 
            href="https://www.youtube.com/@ShounenShoujou" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-black tracking-wide hover:bg-white/10 hover:border-[#fea3fe] transform hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50"
            aria-label="View all videos on YouTube"
          >
            <span>LIHAT SEMUA VIDEO</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact/CTA Section -->
    <section id="contact" class="relative py-32 px-6 lg:px-8">
      <div class="max-w-5xl mx-auto relative z-10 scroll-animate">
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#fea3fe] via-purple-500 to-[#61fdfe] rounded-[3rem] blur-3xl opacity-50">
          </div>
          <div
            class="relative bg-gradient-to-br from-[#fea3fe] via-purple-500 to-[#61fdfe] rounded-[3rem] p-16 text-center overflow-hidden border-4 border-white/20">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-20 rounded-full blur-3xl"></div>

            <div class="relative z-10">
              <!-- Collaboration Icon -->
              <div class="mb-6 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                  <path d="M4 12l4-4 4 4 4-4 4 4" />
                  <path d="M2 10l6-6" />
                  <path d="M22 10l-6-6" />
                </svg>
              </div>

              <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl">
                Ready to Collaborate?
              </h2>

              <p class="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Sedang mencari talent untuk event Anda?
                Kami siap membawa energi J-Pop ke acara Anda.
                <span class="font-semibold">Mari berkolaborasi.</span>
              </p>

              <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <!-- Instagram -->
                <a 
                  href="https://instagram.com/shounenshoujo_" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="group px-10 py-5 bg-white text-black rounded-2xl font-black text-lg tracking-wide
                    transform hover:scale-105 transition-all duration-300 will-change-transform
                    flex items-center justify-center gap-4
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                  aria-label="Follow us on Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-black group-hover:scale-110 transition-transform will-change-transform" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true">
                    <path
                      d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
                  </svg>
                  <span>INSTAGRAM</span>
                </a>

                <!-- Email with Copy Function -->
                <button
                  @click="copyEmail"
                  class="group px-10 py-5 bg-black/30 backdrop-blur-xl border-4 border-white
                    rounded-2xl font-black text-lg tracking-wide text-white
                    hover:bg-black/50 transform hover:scale-105 transition-all duration-300 will-change-transform
                    flex items-center justify-center gap-4
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                  aria-label="Copy email address"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-white group-hover:scale-110 transition-transform will-change-transform" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span>COPY EMAIL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative py-16 px-6 lg:px-8 border-t border-white/10" role="contentinfo">
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <!-- Brand -->
        <div class="inline-flex items-center gap-4 mb-6">
          <img 
            src="/image/ss-pink.png" 
            alt="Shounen Shoujo Logo"
            loading="lazy"
            class="w-20 transition-all duration-500 hover:opacity-80 hover:scale-105 will-change-transform" 
          />
          <div class="text-left">
            <div class="text-2xl font-black bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] bg-clip-text text-transparent">
              SHOUNEN SHOUJO
            </div>
            <div class="text-xs font-bold text-white/50 tracking-widest">
              COMMUNITY
            </div>
          </div>
        </div>

        <!-- Tagline -->
        <p class="text-white/60 mb-10 text-lg font-semibold">
          Bringing J-Pop Culture to Life
        </p>

        <!-- Social Media -->
        <div class="flex justify-center gap-6 mb-10" role="list" aria-label="Social media links">
          <!-- Instagram -->
          <a 
            href="https://instagram.com/shounenshoujo_" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="group w-14 h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
              flex items-center justify-center transition-all duration-300
              hover:scale-110 border border-white/20 will-change-transform
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50"
            aria-label="Follow us on Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white group-hover:scale-125 transition-transform will-change-transform" viewBox="0 0 24 24"
              fill="currentColor" aria-hidden="true">
              <path
                d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
            </svg>
          </a>

          <!-- YouTube -->
          <a 
            href="https://www.youtube.com/@ShounenShoujou" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="group w-14 h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
              flex items-center justify-center transition-all duration-300
              hover:scale-110 border border-white/20 will-change-transform
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fea3fe]/50"
            aria-label="Subscribe to our YouTube channel"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 text-white group-hover:scale-125 transition-transform will-change-transform" viewBox="0 0 24 24"
              fill="currentColor" aria-hidden="true">
              <path
                d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z" />
            </svg>
          </a>
        </div>

        <!-- Copyright -->
        <div class="text-white/40 text-sm font-semibold">
          © 2025 Shounen Shoujo. Made with 💖 by Akahara
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scroll Animation */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Video Cards Stagger Animation */
.video-card {
  animation-fill-mode: both;
}

/* Ripple Effect for Buttons */
.ripple-button {
  position: relative;
  overflow: hidden;
}

.ripple-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple-button:active::after {
  width: 300px;
  height: 300px;
}

/* Focus Visible Styles */
:focus-visible {
  outline: none;
}

/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}

/* Reduce Motion */
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

/* Loading Animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Card Tilt Effect on Hover (3D) */
.video-card {
  perspective: 1000px;
}

.video-card:hover {
  transform: rotateY(2deg) rotateX(-2deg);
}

/* Performance Optimizations */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

.will-change-auto {
  will-change: auto;
}
</style>