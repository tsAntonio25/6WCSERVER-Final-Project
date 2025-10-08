<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-sky-100 transition-colors duration-700 relative">

    <!-- Header -->
    <div class="p-6 sm:p-8 bg-white shadow-lg rounded-b-3xl relative z-10 flex-shrink-0">
      <Header />
    </div>

    <!-- Main Content -->
    <div class="flex-1 px-4 sm:px-8 py-6 space-y-6 overflow-y-auto pb-28"> <!-- Added overflow-y-auto & bottom padding -->

      <!-- Podium Graphic -->
      <div class="flex justify-center mt-4">
        <img
          src="@/assets/leaderboard.png"
          alt="Leaderboard Podium"
          class="w-full max-w-[220px] animate-bounce-slow"
        />
      </div>

      <!-- XP & Streak Bar (Mobile & Desktop) -->
      <div class="flex flex-col items-center mt-4 space-y-2">
        <div class="w-full max-w-[280px] h-4 bg-orange-100 rounded-full overflow-hidden border border-orange-300 shadow-inner">
          <div class="h-full bg-orange-500 transition-all duration-700 ease-in-out" :style="{ width: xpFill + '%' }"></div>
        </div>
        <div class="text-sm text-orange-700 font-semibold text-center animate-pulse mt-1">
          Streak: {{streak}} | XP: {{xpLevel}}
        </div>
      </div>

      <!-- Leaderboard Title -->
      <h1 class="text-2xl sm:text-3xl font-bold text-center text-sky-800 mt-6 mb-4">Leaderboard</h1>

      <!-- Ranked List -->
      <div class="max-w-md mx-auto space-y-3">
        <div v-for="(rank, index) in leaderboard" :key="rank.username">
          <!-- 1st Place -->
          <div v-if="index === 0" class="flex justify-between items-center bg-yellow-200 rounded-2xl px-4 py-3 shadow-xl border border-yellow-300 transform hover:scale-105 transition-all duration-300">
            <span class="font-semibold text-gray-800 text-lg">{{index + 1}}. {{ rank.anon_username }}</span>
            <span class="text-sm text-gray-700 font-medium">{{ rank.exp }} points</span>
          </div>

          <!-- 2nd Place -->
          <div v-else-if="index === 1" class="flex justify-between items-center bg-gray-200 rounded-2xl px-4 py-3 shadow-md border border-gray-300 transform hover:scale-105 transition-all duration-300">
            <span class="font-semibold text-gray-800">{{ index + 1 }}. {{ rank.anon_username }}</span>
            <span class="text-sm text-gray-700 font-medium">{{ rank.exp }} points</span>
          </div>

          <!-- 3rd Place -->
          <div v-else-if="index === 2" class="flex justify-between items-center bg-orange-100 rounded-2xl px-4 py-3 shadow-md border border-orange-300 transform hover:scale-105 transition-all duration-300">
            <span class="font-semibold text-gray-800">{{index + 1}}. {{ rank.anon_username }}</span>
            <span class="text-sm text-gray-700 font-medium">{{ rank.exp }} points</span>
          </div>

          <!-- the rest -->
          <div v-else class="flex justify-between items-center bg-white rounded-2xl px-4 py-3 shadow-sm transform hover:scale-105 transition-all duration-300">
            <span class="font-medium text-gray-700">{{index + 1}}. {{ rank.anon_username }}</span>
            <span class="text-sm text-gray-500">{{ rank.exp }} points</span>
          </div>
        </div>
      </div>

      <!-- Current User Rank -->
      <div class="max-w-md mx-auto mt-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl px-4 py-4 text-center space-y-1 transform hover:-translate-y-1 transition-all duration-300">
        <template v-if="userRank?.is_admin">
          <p class="text-base font-semibold text-blue-400 italic">(Admins are not ranked.)</p>
        </template>

        <template v-else-if="userRank">
          <p class="text-base font-semibold text-gray-800">
              Your Current Rank: <span class="text-sky-600">{{ userRank?.rank }}</span>
          </p>
          <p class="text-sm text-gray-600 font-medium">{{ userRank?.user.exp }} points</p>
        </template>
      </div>

    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>

  </div>
</template>

<style>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(0); }
}
.animate-bounce-slow { animation: bounce-slow 2s infinite; }
</style>


<script setup>
// imports
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import api from '@/api/axios.js';

// states
const leaderboard = ref([]); // array
const userRank = ref(null);
const xpFill = ref(0)
const xpLevel = ref(0)
const streak = ref(0)

// methods
const getProgress = async () => {
  try {
    // get userid
    const userId = localStorage.getItem('userId')

    const res = await api.get(`/user/${userId}/progress`)
    xpFill.value = res.data.progress
    xpLevel.value = res.data.level
    streak.value = res.data.streak
  } catch (err){
    console.error('Get progress error:', err.response?.data || err.message)
  }
}

const fetchLeaderboard = async () => {
  try {
    // get leaderboard (top 10, no admin)
    const res = await api.get("/leaderboard"); 
    leaderboard.value = res.data.users;

  } catch (err) {
    console.error('Error fetching leaderboard:', err);
  }
};

const fetchUserRank = async () => {
  try {
    // get specific user rank (Current User Rank)
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const res = await api.get(`/leaderboard/rank/${userId}`);
    userRank.value = res.data;

  } catch (err) {
    console.error('Error fetching user rank:', err);
  }
};

onMounted(() => {
  getProgress();
  fetchLeaderboard();
  fetchUserRank();
});

</script>