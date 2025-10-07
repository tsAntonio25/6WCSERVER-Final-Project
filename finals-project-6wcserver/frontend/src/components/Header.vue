<template>
  <header
    class="fixed top-0 left-0 w-full z-50 
           bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-600 
           text-white shadow-lg backdrop-blur-md 
           border-b border-white/10 transition-all duration-300"
  >
    <div class="flex items-center justify-between px-4 sm:px-8 py-4">
      
      <!-- LEFT: Logo + Greeting -->
      <div class="flex items-center space-x-4 w-1/3">
        <router-link to="/dashboard" class="flex items-center space-x-2 group">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="h-8 w-auto hidden sm:block cursor-pointer transform group-hover:scale-110 transition-transform duration-300"
          />
          <span
            class="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent drop-shadow-md"
          >
            Hi, {{ username || 'User' }}!
          </span>
        </router-link>
      </div>

      <!-- CENTER: Streak + XP -->
      <div
        class="w-1/3 flex justify-end sm:justify-center text-[13px] sm:text-sm text-right sm:text-center"
      >
        <div
          class="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 
                 hover:bg-white/20 hover:scale-105 transition-all duration-300"
        >
          <p class="font-medium">Streak: <span class="font-bold text-amber-300">{{ streak }}</span></p>
          <p class="font-medium">XP Level: <span class="font-bold text-emerald-300">{{ xpLevel }}</span></p>
        </div>
      </div>

      <!-- RIGHT: Navigation -->
      <nav
        class="hidden sm:flex items-center justify-end w-1/3 space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6"
      >
        <!-- Dashboard -->
        <router-link
          to="/dashboard"
          class="px-3 py-1.5 rounded-md font-medium shadow-sm transition-all duration-300"
          :class="$route.path === '/dashboard'
            ? 'bg-white/20 text-white font-semibold border border-white/30 backdrop-blur-sm'
            : 'text-white/80 hover:bg-white/10 hover:text-white'"
        >
          Dashboard
        </router-link>

        <!-- Finances -->
        <router-link
          to="/finance"
          class="px-3 py-1.5 rounded-md font-medium shadow-sm transition-all duration-300"
          :class="$route.path === '/finance'
            ? 'bg-white/20 text-white font-semibold border border-white/30 backdrop-blur-sm'
            : 'text-white/80 hover:bg-white/10 hover:text-white'"
        >
          Finances
        </router-link>

        <!-- Leaderboard -->
        <router-link
          to="/leaderboard"
          class="px-3 py-1.5 rounded-md font-medium shadow-sm transition-all duration-300"
          :class="$route.path === '/leaderboard'
            ? 'bg-white/20 text-white font-semibold border border-white/30 backdrop-blur-sm'
            : 'text-white/80 hover:bg-white/10 hover:text-white'"
        >
          Leaderboard
        </router-link>

        <!-- Profile -->
        <router-link
          to="/profile"
          class="rounded-full border-2 border-white/40 overflow-hidden shadow-md 
                 hover:shadow-lg hover:border-white transition-all duration-300 transform hover:scale-110"
          :class="$route.path === '/profile' ? 'ring-2 ring-white/70' : ''"
        >
          <img
            src="@/assets/user.png"
            alt="User Icon"
            class="rounded-full object-cover h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
          />
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios.js';

const username = ref(localStorage.getItem("username") || "");
const xpLevel = ref(0);
const streak = ref(0);

const getProgress = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const res = await api.get(`/user/${userId}/progress`);
    xpLevel.value = res.data.level;
    streak.value = res.data.streak;
  } catch (err) {
    console.error('Get progress error:', err.response?.data || err.message);
  }
};

onMounted(() => {
  getProgress();
});
</script>
