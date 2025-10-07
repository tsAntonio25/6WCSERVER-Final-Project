<template>
  <div
    class="min-h-screen relative flex items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-sky-900 via-indigo-800 to-sky-700"
  >
    <!-- 🌌 Glowing Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15),_transparent_60%)] animate-glow"
      ></div>
      <div
        class="absolute w-96 h-96 bg-sky-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse-slow"
      ></div>
      <div
        class="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl bottom-20 right-20 animate-pulse-slow delay-1000"
      ></div>
    </div>

    <!-- 🌟 Main Center Container -->
    <div
      class="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] p-10 md:p-14 flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl w-full animate-fade-in"
    >
      <!-- ✨ Left: Text Content -->
      <div class="text-center md:text-left md:w-1/2 space-y-6 text-white">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          Every <span class="text-sky-400">Peso</span> Counts,<br />
          Every <span class="text-indigo-300">Level</span> Matters.
        </h1>

        <p
          class="text-indigo-100 text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed"
        >
          Welcome to <span class="font-semibold text-white">Iponly</span> — your gamified budget tracker.
          Save smart, earn XP, and level up your financial journey while having fun!
        </p>

        <!-- 💰 Buttons -->
        <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
          <router-link
            to="/login"
            class="bg-gradient-to-r from-sky-900 to-indigo-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:opacity-90 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300"
          >
            Log In
          </router-link>

          <router-link
            to="/register"
            class="border border-indigo-300 text-indigo-100 px-8 py-3 rounded-full hover:bg-indigo-700/40 transition-all duration-300 hover:scale-105"
          >
            Register
          </router-link>
        </div>
      </div>

      <!-- 💡 Right: Hero Image -->
      <div class="md:w-1/2 flex justify-center">
        <img
          src="@/assets/logo.png"
          alt="Budget Tracker Illustration"
          class="w-64 sm:w-80 md:w-96 drop-shadow-[0_8px_20px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:scale-110 transition-all duration-500 animate-float"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Home',
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes glow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  background-size: 200% 200%;
  animation: glow 6s ease infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>
