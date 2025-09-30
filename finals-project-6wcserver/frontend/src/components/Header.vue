<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-sky-600 text-white px-6 py-4 shadow-md">
    <div class="flex items-center justify-between">
      <!-- Left: Logo + Greeting -->
      <div class="flex items-center space-x-4 w-1/3">
        <router-link to="/dashboard">
            <img src="@/assets/logo.png" alt="Logo" class="h-8 w-auto hidden sm:block cursor-pointer" />
        </router-link>
        <span class="text-lg sm:text-xl font-semibold">Hi, {{ username || 'User' }}!</span>
      </div>

      <!-- Center: Streak + XP -->
      <div class="w-1/3 flex justify-end sm:justify-center text-sm text-right sm:text-center">
        <div>
          <p>Streak Counter: {{ streak }}</p>
          <p>XP Level: {{ xpLevel }}</p>
        </div>
      </div>

      <!-- Right: Navigation -->
      <nav class="hidden sm:flex items-center justify-end w-1/3 space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6">
        <!-- Dashboard -->
        <router-link
          to="/dashboard"
          class="px-2 py-1 sm:px-3 md:px-4 lg:px-4 rounded-md shadow-sm"
          :class="$route.path === '/dashboard' ? 'bg-sky-400 text-white font-semibold' : 'text-white opacity-70 hover:bg-sky-500 transition'"
        >
          <span class="text-xs sm:text-sm">Dashboard</span>
        </router-link>

        <!-- Finances -->
        <router-link
          to="/finance"
          class="px-2 py-1 sm:px-3 md:px-4 lg:px-4 rounded-md shadow-sm"
          :class="$route.path === '/finance' ? 'bg-sky-400 text-white font-semibold' : 'text-white opacity-70 hover:bg-sky-500 transition'"
        >
          <span class="text-xs sm:text-sm">Finances</span>
        </router-link>

        <!-- Leaderboard -->
        <router-link
          to="/leaderboard"
          class="px-2 py-1 sm:px-3 md:px-4 lg:px-4 rounded-md shadow-sm"
          :class="$route.path === '/leaderboard' ? 'bg-sky-400 text-white font-semibold' : 'text-white opacity-70 hover:bg-sky-500 transition'"
        >
          <span class="text-xs sm:text-sm">Leaderboard</span>
        </router-link>

        <!-- Profile -->
        <router-link
        to="/profile"
        class="rounded-full border border-white flex-shrink-0 min-w-0"
        :class="$route.path === '/profile' ? 'bg-sky-400 p-1' : 'hover:bg-sky-500 p-1 transition'"
        >
        <img
            src="@/assets/user.png"
            alt="User Icon"
            class="rounded-full object-cover h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
        />
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
// imports
import { ref, onMounted } from 'vue';
import api from '@/api/axios.js'

// state
const username = ref(localStorage.getItem("username") || "");
const xpLevel = ref(0);
const streak = ref(0);

const getProgress = async () => {
  try {
    // get userid
    const userId = localStorage.getItem('userId')

    const res = await api.get(`/user/${userId}/progress`)
    xpLevel.value = res.data.level
  } catch (err){
    console.error('Get progress error:', err.response?.data || err.message)
  }
};

onMounted(() => {
  getProgress();
})
</script>