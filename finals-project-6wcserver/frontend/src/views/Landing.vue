<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-indigo-50 overflow-hidden">
    <!-- Header -->
    <LandingHeader />

    <!-- HERO SECTION -->
    <section class="flex flex-col items-center justify-center text-center px-6 sm:px-10 py-20 relative">
      <!-- Animated Background Gradient -->
      <div
  class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(56,189,248,0.15),_transparent_70%)] animate-pulse pointer-events-none"
></div>


      <h1 class="text-5xl sm:text-6xl font-extrabold text-sky-900 drop-shadow-md relative z-10">
        Save Smart, Level Up 🚀
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed relative z-10">
        Turn your finances into a game — track, save, and compete while building smarter money habits.
      </p>

      <router-link
        to="/login"
        class="mt-10 inline-block bg-gradient-to-r from-sky-700 to-indigo-600 text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition transform hover:scale-105"
      >
        Start Saving Now
      </router-link>

      <!-- Background Glow Circles -->
      <div class="absolute w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40 top-[-10%] right-[-10%]"></div>
      <div class="absolute w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-40 bottom-[-10%] left-[-10%]"></div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-24 px-6 sm:px-10 bg-white/60 backdrop-blur-xl shadow-inner">
      <h2 class="text-4xl sm:text-5xl font-bold text-center text-sky-900 mb-12">How It Works</h2>

      <div class="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
        <!-- Illustration -->
        <img
          :src="landing2"
          alt="How it works"
          class="w-72 sm:w-96 drop-shadow-xl rounded-3xl hover:scale-105 transition-transform duration-500"
        />

        <!-- Text -->
        <div class="max-w-xl text-center lg:text-left space-y-5">
          <p class="text-lg text-gray-700 leading-relaxed">
            Iponly helps you build healthy financial habits. Add your budget, record expenses, and stay motivated with your progress tracker.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
            Each goal you hit earns XP — climb the leaderboard, celebrate milestones, and make saving feel rewarding.
          </p>
        </div>
      </div>
    </section>

    <!-- GAMIFIED FEATURES -->
    <section class="py-24 px-6 sm:px-10 bg-gradient-to-b from-sky-100 via-white to-indigo-50">
      <h2 class="text-4xl sm:text-5xl font-bold text-center text-sky-900 mb-12">Gamified Budgeting for Students</h2>

      <div class="flex flex-wrap justify-center gap-12">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="flex flex-col items-center space-y-5 text-center max-w-[300px] sm:max-w-[360px] animate-fade-in"
          :style="{ animationDelay: `${index * 0.3}s` }"
        >
          <div class="p-5 rounded-full bg-white shadow-xl border-4 border-sky-600 hover:scale-105 transition-transform duration-300">
            <img :src="feature.image" :alt="feature.title" class="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-sky-600">{{ feature.title }}</p>
          <p class="text-gray-600 text-sm sm:text-base max-w-xs">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center px-6 sm:px-10 py-24 bg-white/70 backdrop-blur-xl shadow-inner">
      <h2 class="text-5xl font-bold text-sky-900 mb-6">Get Started Today</h2>
      <p class="text-lg text-gray-700 mb-8">
        Join thousands of students making smarter financial decisions with Iponly.
      </p>
      <router-link
        to="/register"
        class="inline-block bg-gradient-to-r from-sky-700 to-indigo-600 text-white text-xl px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition transform hover:scale-105"
      >
        Create an Account
      </router-link>
      <p class="text-sm text-gray-500 mt-6">Available soon on all devices.</p>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup>
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

// ✅ Explicitly import images so Vite bundles them
import landing2 from '@/assets/landing2.png'
import landing3 from '@/assets/landing3.png'
import landing4 from '@/assets/landing4.png'
import landing5 from '@/assets/landing5.png'

const features = [
  {
    image: landing3,
    title: 'Track with Ease',
    desc: 'Quickly log your income and expenses — simple, intuitive, and visually clear.',
  },
  {
    image: landing4,
    title: 'Save & Grow',
    desc: 'Set saving goals and watch your progress grow in real time.',
  },
  {
    image: landing5,
    title: 'Compete & Win',
    desc: 'Challenge friends, climb the leaderboard, and celebrate your financial wins.',
  },
]
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease forwards;
}
</style>
