<template>
  <aside
    class="fixed top-0 left-0 h-screen w-64 text-white shadow-lg z-40 flex flex-col justify-between overflow-hidden relative"
  >
    <!-- 🌌 Ambient Glowing Background -->
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute inset-0 bg-gradient-to-br from-sky-900 via-indigo-900 to-sky-800"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15),_transparent_60%)] animate-glow"
      ></div>
      <div
        class="absolute w-60 h-60 bg-sky-400/20 rounded-full blur-3xl top-10 left-8 animate-pulse-slow"
      ></div>
      <div
        class="absolute w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-6 animate-pulse-slow delay-1000"
      ></div>
    </div>

    <!-- Top: Logo and Navigation -->
    <div class="space-y-6 px-6 py-8">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img src="@/assets/logo.png" alt="Iponly Logo" class="h-8 w-auto" />
        <div>
          <span class="block text-base sm:text-lg font-semibold leading-tight">Iponly</span>
          <span class="block text-xs sm:text-sm text-sky-300 tracking-wide">Admin Panel</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col space-y-3">
        <!-- Dashboard -->
        <div :class="$route.path === '/admindash' ? 'bg-sky-500 rounded-md' : ''">
          <router-link
            to="/admindash"
            class="block px-3 py-2 text-sm font-medium"
            :class="$route.path === '/admindash' ? 'text-white font-semibold' : 'hover:bg-sky-500 transition'"
          >
            Dashboard
          </router-link>
        </div>

        <!-- Leaderboard -->
        <div :class="$route.path === '/adminlead' ? 'bg-sky-500 rounded-md' : ''">
          <router-link
            to="/adminlead"
            class="block px-3 py-2 text-sm font-medium"
            :class="$route.path === '/adminlead' ? 'text-white font-semibold' : 'hover:bg-sky-500 transition'"
          >
            Leaderboard
          </router-link>
        </div>

        <!-- User Access Control -->
        <div :class="$route.path === '/adminuser' ? 'bg-sky-500 rounded-md' : ''">
          <router-link
            to="/adminuser"
            class="block px-3 py-2 text-sm font-medium"
            :class="$route.path === '/adminuser' ? 'text-white font-semibold' : 'hover:bg-sky-500 transition'"
          >
            User Access Control
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Bottom: Return Link -->
    <div class="px-6 pb-6">
      <router-link
        to="/profile"
        class="block w-full text-center px-4 py-2 bg-white text-sky-600 rounded-md text-sm font-medium hover:bg-gray-100 transition"
      >
        Return to Iponly
      </router-link>
    </div>
  </aside>
</template>

<script setup>
// No script logic needed unless you want to fetch dynamic nav items or user roles
</script>

<style scoped>
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

.animate-glow {
  background-size: 200% 200%;
  animation: glow 6s ease infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>
