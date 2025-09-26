<template>
  <div class="flex-grow px-4 sm:px-8 py-6 space-y-6">
    <!-- Header -->
    <div class="p-6 sm:p-8">
      <Header />
    </div>

   

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-6">
      <!-- Podium Graphic -->
      <div class="flex justify-center">
        <img
          src="@/assets/leaderboard.png"
          alt="Leaderboard Podium"
          class="w-full max-w-[220px]"
        />
      </div>
       <!-- Streak Counter (Mobile Only) -->
<div class="sm:hidden flex flex-col items-center space-y-2 text-center mt-2">
  <div class="w-72 h-3 bg-orange-100 rounded-full overflow-hidden border border-orange-300">
    <div class="h-full bg-orange-500 transition-all duration-300" :style="{ width: xpFill + '%' }"></div>
  </div>
  <div class="text-sm text-gray-700 font-medium">
    <p>Streak Counter: <span class="font-semibold">0</span></p>
    <p>XP Level: <span class="font-semibold">0</span></p>
  </div>
</div>
      <!-- Leaderboard Title -->
      <h1 class="text-2xl font-bold text-center text-gray-800">Leaderboard</h1>

      <!-- Ranked List -->
        <div class="max-w-md mx-auto space-y-2">
        <!-- 1st Place -->
        <div class="flex justify-between items-center bg-yellow-100 rounded px-4 py-2 shadow-sm">
            <span class="font-medium text-gray-700">1. HoneyBanana123</span>
            <span class="text-sm text-gray-600">4,000 pts</span>
        </div>

        <!-- 2nd Place -->
        <div class="flex justify-between items-center bg-gray-100 rounded px-4 py-2 shadow-sm">
            <span class="font-medium text-gray-700">2. julienpop10</span>
            <span class="text-sm text-gray-600">3,899 pts</span>
        </div>

        <!-- 3rd Place -->
        <div class="flex justify-between items-center bg-orange-100 rounded px-4 py-2 shadow-sm">
            <span class="font-medium text-gray-700">3. honeyLovs</span>
            <span class="text-sm text-gray-600">3,000 pts</span>
        </div>

        <!-- Remaining -->
        <div class="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm">
            <span class="font-medium text-gray-700">4. shanpascul</span>
            <span class="text-sm text-gray-500">2,500 pts</span>
        </div>
        <div class="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm">
            <span class="font-medium text-gray-700">5. LavenderHaze</span>
            <span class="text-sm text-gray-500">2,000 pts</span>
        </div>
        <div class="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm">
            <span class="font-medium text-gray-700">6. AppleandBanana50</span>
            <span class="text-sm text-gray-500">1,000 pts</span>
        </div>
        </div>
      <!-- Current User Rank -->
        <div class="max-w-md mx-auto bg-white rounded px-4 py-3 shadow-sm text-center space-y-1">
        <p class="text-base font-semibold text-gray-700">
            Your Current Rank: <span class="text-sky-600">0</span>
        </p>
        <p class="text-sm text-gray-500">0 points</p>
        </div>
    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>
  </div>
</template>

<script>

// please nagmamakaawa ako, composition api na gamitin pleaseee

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Leaderboard',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      showBudgetPopup: false,
      showExpensePopup: false,
      xpFill: 0
    };
  }
};
</script>