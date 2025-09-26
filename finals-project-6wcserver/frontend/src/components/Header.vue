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
          <p>Streak Counter: 0</p>
          <p>XP Level: 0</p>
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
        class="rounded-full border border-white"
        :class="$route.path === '/profile' ? 'bg-sky-400 p-1' : 'hover:bg-sky-500 p-1 transition'"
        >
        <img
            src="@/assets/user.png"
            alt="User Icon"
            class="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full"
        />
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      username: "",
    };
  },
  created() {
    // get the username
    this.username = localStorage.getItem("username");
  },
};
</script>