<template>
  <aside class="fixed top-0 left-0 h-screen w-64 bg-indigo-950 text-white shadow-lg z-40 flex flex-col justify-between">
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