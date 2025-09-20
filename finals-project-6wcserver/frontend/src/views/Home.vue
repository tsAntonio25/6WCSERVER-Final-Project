<template>
  <div class="min-h-screen bg-white px-6 pt-6 pb-10 flex items-center justify-center">
    <!-- Wrapper for image + text -->
    <div class="flex flex-col md:flex-row md:items-center md:gap-10 max-w-6xl w-full">
      
      <!-- Image -->
      <div class="flex justify-center md:w-1/2">
        <img
          src="@/assets/bg1login.png"
          alt="Saving Illustration"
          class="w-full max-w-xs md:max-w-md h-auto"
        />
      </div>

      <!-- Text & Buttons -->
      <div class="flex flex-col items-center md:items-start md:w-1/2 mt-6 md:mt-0">
        <h1 class="text-center md:text-left text-2xl sm:text-3xl font-bold text-indigo-900">
          Every Peso Counts,<br />Every Level Matters.
        </h1>

        <p class="text-center md:text-left text-gray-600 mt-4 max-w-md text-sm sm:text-base">
          Welcome to Iponly — the budget tracking app that makes saving fun. Build
          streaks, earn XP, and climb the leaderboard while turning every peso into
          progress.
        </p>

        <!-- Buttons -->
        <div class="flex gap-4 mt-8">
          <!-- router-link to login -->
          <router-link
            to="/login"
            class="bg-indigo-900 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-800 transition"
          >
            Log In
          </router-link>

          <router-link
            to="/register"
            class="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'Home',
};
</script>
