<template>
  <header class="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-sky-600 text-white px-8 py-4 shadow-md">
    <!-- Left: Logo and Greeting -->
    <div class="flex items-center space-x-4 w-1/3">
      <img src="@/assets/logo.png" alt="Logo" class="h-10 w-auto" />
      <span class="text-xl font-semibold">Hi, User!</span>
    </div>

    <!-- Center: Stats -->
    <div class="flex flex-col items-center w-1/3">
      <p class="text-sm">Streak Counter: 0</p>
      <p class="text-sm">XP Level: 0</p>
    </div>

    <!-- Right: Navigation -->
    <nav class="flex items-center space-x-8 w-1/3 justify-end">
      <!-- Active: Dashboard -->
      <div class="bg-sky-400 text-white px-4 py-1 rounded-md shadow-sm">
        <span class="text-sm font-semibold cursor-default">Dashboard</span>
      </div>

      <!-- Inactive: Finances -->
      <div class="group relative">
        <span class="text-sm font-medium cursor-pointer group-hover:text-white transition">Finances</span>
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </div>

      <!-- Inactive: Leaderboard -->
      <div class="group relative">
        <span class="text-sm font-medium cursor-pointer group-hover:text-white transition">Leaderboard</span>
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </div>

      <img src="@/assets/user.png" alt="User Icon" class="h-8 w-8 rounded-full border border-white" />
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>