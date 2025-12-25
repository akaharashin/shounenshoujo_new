<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Smooth scroll untuk semua anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
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
})

// Video Portfolio (ganti dengan link YouTube kalian)
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
  }
]


</script>

<template>
  <div class="min-h-screen bg-black text-white overflow-x-hidden">
    <!-- Japanese Pattern Background -->
    <div class="fixed inset-0 opacity-5 pointer-events-none z-0">
      <div class="absolute inset-0"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px);">
      </div>
    </div>

    <!-- Animated Gradient Blobs -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#fea3fe] opacity-20 rounded-full blur-[120px] animate-pulse">
      </div>
      <div
        class="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#61fdfe] opacity-20 rounded-full blur-[120px] animate-pulse"
        style="animation-delay: 1.5s;"></div>
      <div
        class="absolute -bottom-40 right-1/3 w-[450px] h-[450px] bg-purple-500 opacity-15 rounded-full blur-[120px] animate-pulse"
        style="animation-delay: 3s;"></div>
    </div>

    <!-- Navigation -->
    <nav :class="[
      'fixed w-full z-50 transition-all duration-500',
      scrolled
        ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10'
        : 'bg-transparent'
    ]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">
          <!-- Logo -->
          <a href="#home" class="relative cursor-pointer">
            <div class="relative flex items-center gap-3 px-0 md:px-6 py-3 rounded-2xl">

              <span class="text-3xl">
                <img src="../../public/image/ss-pink.png" alt=""
                  class="w-32 transition-all duration-500 hover:opacity-80 hover:scale-105" />
              </span>
            </div>
          </a>


          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-2">
            <a v-for="item in ['Home', 'About', 'Activities', 'Contact']" :key="item" :href="`#${item.toLowerCase()}`"
              class="relative px-6 py-3 font-bold text-sm tracking-wide text-white/80 hover:text-white transition-all duration-300 group">
              <span class="relative z-10">{{ item.toUpperCase() }}</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              </div>
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] group-hover:w-full transition-all duration-300">
              </div>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="isMenuOpen = !isMenuOpen"
            class="md:hidden p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
          <div v-if="isMenuOpen" class="md:hidden pb-6 space-y-2">
            <a v-for="item in ['Home', 'About', 'Activities', 'Contact']" :key="item" :href="`#${item.toLowerCase()}`"
              @click="isMenuOpen = false"
              class="block px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-sm tracking-wide hover:bg-white/10 transition-all">
              {{ item.toUpperCase() }}
            </a>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24">
      <div class="max-w-7xl mx-auto w-full relative z-10">
        <div class="text-center">
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
              class="inline-block bg-gradient-to-r from-[#fea3fe] via-purple-400 to-[#61fdfe] bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
              SHOUNEN
            </span>
            <br />
            <span
              class="inline-block bg-gradient-to-r from-[#61fdfe] via-blue-400 to-[#fea3fe] bg-clip-text text-transparent drop-shadow-2xl"
              style="animation-delay: 0.5s;">
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
            <a href="#activities" class="group relative px-10 py-5 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe]
            rounded-2xl font-black text-lg tracking-wide overflow-hidden
            transform hover:scale-105 transition-all duration-300">

              <span class="relative z-10 flex items-center gap-3">

                <!-- Video / Collection Icon -->
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-black group-hover:scale-110 transition-transform" viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M4 4h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  <path d="M16 10l6-4v12l-6-4z" />
                </svg>

                <span>RPD Collection</span>
              </span>

              <!-- Hover Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#61fdfe] to-[#fea3fe]
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <!-- Book Us -->
            <a href="#contact" class="px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/20
            rounded-2xl font-black text-lg tracking-wide text-white
            hover:bg-white/10 hover:border-[#61fdfe]
            transform hover:scale-105 transition-all duration-300">
              BOOK US FOR EVENT
            </a>

          </div>


          <!-- Scroll Indicator -->
          <div class="flex justify-center">
            <div class="animate-bounce">
              <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div>
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
          <div class="relative">
            <!-- Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#fea3fe] to-[#61fdfe] rounded-3xl blur-3xl opacity-30">
            </div>

            <!-- Glass Card -->
            <div class="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-12
              transform hover:scale-105 transition-all duration-500">

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">


                <!-- RPD -->
                <div class="text-center">
                  <div class="mb-4 flex justify-center">
                    <!-- Group Dance Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-[#61fdfe]" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6">
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
                <div class="text-center">
                  <div class="mb-4 flex justify-center">
                    <!-- Singing Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-[#fea3fe]" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6">
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
                <div class="text-center">
                  <div class="mb-4 flex justify-center">
                    <!-- DJ / Turntable Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-purple-400" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6">
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
                <div class="text-center">
                  <div class="mb-4 flex justify-center">
                    <!-- Media / Documentation Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-pink-400" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="1.6">
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
        <div class="text-center mb-20">
          <div
            class="inline-block px-4 py-2 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-full text-xs font-black tracking-widest mb-6">
            OUR WORKS
          </div>
          <h2 class="text-5xl lg:text-6xl font-black mb-6">
            Random Play Dance Session
          </h2>
          <p class="text-xl text-white/60 max-w-2xl mx-auto">
            Saksikan aksi kami di berbagai event melalui video dokumentasi RPD kami.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(video, idx) in videos" :key="idx" class="group relative">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-[#fea3fe] to-[#61fdfe] rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500">
            </div>
            <a :href="video.link" target="_blank" rel="noopener noreferrer"
              class="relative block bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 transform group-hover:scale-105 transition-all duration-500">
              <div class="aspect-video relative overflow-hidden">
                <img :src="video.thumbnail" :alt="video.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div class=""></div>
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    class="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/50">
                    <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3
                  class="text-xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#fea3fe] group-hover:to-[#61fdfe] group-hover:bg-clip-text transition-all duration-300">
                  {{ video.title }}
                </h3>
              </div>
            </a>
          </div>
        </div>

        <div class="text-center mt-16">
          <a href="https://www.youtube.com/@ShounenShoujou" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-black tracking-wide hover:bg-white/10 hover:border-[#fea3fe] transform hover:scale-105 transition-all duration-300">
            <span>LIHAT SEMUA VIDEO</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact/CTA Section -->
    <section id="contact" class="relative py-32 px-6 lg:px-8">
      <div class="max-w-5xl mx-auto relative z-10">
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
              <div class="text-7xl mb-6">🎪</div>
              <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl">
                Ready to Collaborate?
              </h2>
              <p class="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Sedang mencari talent untuk event Anda? Kami siap membawa energi J-Pop ke acara Anda. Book us now!
              </p>
              <div class="flex flex-col sm:flex-row gap-6 justify-center">

                <!-- Instagram -->
                <a href="https://instagram.com/shounenshoujo_" target="_blank" rel="noopener noreferrer" class="group px-10 py-5 bg-white text-black rounded-2xl font-black text-lg tracking-wide
            transform hover:scale-105 transition-all duration-300
            flex items-center justify-center gap-4">

                  <!-- Instagram Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-black group-hover:scale-110 transition-transform" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
                  </svg>

                  <span>INSTAGRAM</span>
                </a>

                <!-- Email -->
                <a href="mailto:shounenshoujo19@email.com" class="group px-10 py-5 bg-black/30 backdrop-blur-xl border-4 border-white
            rounded-2xl font-black text-lg tracking-wide text-white
            hover:bg-black/50 transform hover:scale-105 transition-all duration-300
            flex items-center justify-center gap-4">

                  <!-- Mail Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>

                  <span>EMAIL US</span>
                </a>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative py-16 px-6 lg:px-8 border-t border-white/10">
      <div class="max-w-7xl mx-auto text-center relative z-10">

        <!-- Brand -->
        <div class="inline-flex items-center gap-4 mb-6">
          <img src="../../public/image/ss-pink.png" alt="Shounen Shoujo Logo"
            class="w-20 transition-all duration-500 hover:opacity-80 hover:scale-105" />
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
        <div class="flex justify-center gap-6 mb-10">

          <!-- Instagram -->
          <a href="https://instagram.com/shounenshoujo_" target="_blank" rel="noopener noreferrer" class="group w-14 h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
               flex items-center justify-center transition-all duration-300
               hover:scale-110 border border-white/20">

            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white group-hover:scale-125 transition-transform" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 12 18a5.5 5.5 0 0 0 0-11zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
            </svg>
          </a>

          <!-- YouTube -->
          <a href="https://www.youtube.com/@ShounenShoujou" target="_blank" rel="noopener noreferrer" class="group w-14 h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
               flex items-center justify-center transition-all duration-300
               hover:scale-110 border border-white/20">

            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 text-white group-hover:scale-125 transition-transform" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z" />
            </svg>
          </a>

          <!-- TikTok -->
          <!-- <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="group w-14 h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-full
               flex items-center justify-center transition-all duration-300
               hover:scale-110 border border-white/20">

            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white group-hover:scale-125 transition-transform" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M21 8.5a7.8 7.8 0 01-4.5-1.4v6.7a6.3 6.3 0 11-6.3-6.3c.4 0 .8 0 1.2.1v3.2a3.1 3.1 0 10 2.2 3V2h3a7.8 7.8 0 004.4 3.9v2.6z" />
            </svg>
          </a> -->

        </div>

        <!-- Copyright -->
        <div class="text-white/40 text-sm font-semibold">
          © 2025 Shounen Shoujo. Made with 💖 by Akahara
        </div>

      </div>
    </footer>

  </div>
</template>
