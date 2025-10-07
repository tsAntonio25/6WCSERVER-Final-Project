<template>
  <footer
    class="fixed bottom-0 left-0 w-full z-50 
           bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 
           border-t border-white/10 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] 
           text-white py-3 sm:py-4 transition-all duration-500"
  >
    <div
      class="flex justify-around items-center px-4 sm:px-6 md:px-10
             space-x-4 sm:space-x-6 md:space-x-10 lg:space-x-16"
    >
      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="relative group flex flex-col items-center"
      >
        <div
          class="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 
                 shadow-inner backdrop-blur-md 
                 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
          :class="$route.path === '/dashboard' ? 'ring-2 ring-cyan-300 scale-110 bg-white/30' : ''"
        >
          <img
            src="@/assets/footer1.png"
            alt="Performance"
            class="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <span
          class="mt-1 text-[11px] sm:text-xs text-white/80 group-hover:text-white font-medium tracking-wide"
        >
          Dashboard
        </span>
      </router-link>

      <!-- Finance -->
      <router-link
        to="/finance"
        class="relative group flex flex-col items-center"
      >
        <div
          class="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 
                 shadow-inner backdrop-blur-md 
                 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
          :class="$route.path === '/finance' ? 'ring-2 ring-emerald-300 scale-110 bg-white/30' : ''"
        >
          <img
            src="@/assets/footer2.png"
            alt="Add"
            class="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <span
          class="mt-1 text-[11px] sm:text-xs text-white/80 group-hover:text-white font-medium tracking-wide"
        >
          Finances
        </span>
      </router-link>

      <!-- Leaderboard -->
      <router-link
        to="/leaderboard"
        class="relative group flex flex-col items-center"
      >
        <div
          class="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 
                 shadow-inner backdrop-blur-md 
                 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
          :class="$route.path === '/leaderboard' ? 'ring-2 ring-amber-300 scale-110 bg-white/30' : ''"
        >
          <img
            src="@/assets/footer3.png"
            alt="Leaderboard"
            class="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <span
          class="mt-1 text-[11px] sm:text-xs text-white/80 group-hover:text-white font-medium tracking-wide"
        >
          Leaderboard
        </span>
      </router-link>

      <!-- Profile -->
      <router-link
        to="/profile"
        class="relative group flex flex-col items-center"
      >
        <div
          class="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 
                 shadow-inner backdrop-blur-md 
                 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
          :class="$route.path === '/profile' ? 'ring-2 ring-indigo-300 scale-110 bg-white/30' : ''"
        >
          <img
            src="@/assets/footer4.png"
            alt="Profile"
            class="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 group-hover:scale-110 rounded-full"
          />
        </div>
        <span
          class="mt-1 text-[11px] sm:text-xs text-white/80 group-hover:text-white font-medium tracking-wide"
        >
          Profile
        </span>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
footer {
  backdrop-filter: blur(16px);
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(255,255,255,0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255,255,255,0.5);
  }
}
.router-link-active img {
  animation: pulseGlow 2.5s infinite ease-in-out;
}
</style>
