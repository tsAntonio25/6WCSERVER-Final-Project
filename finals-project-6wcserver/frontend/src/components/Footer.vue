<template>
  <footer class="bg-sky-600 py-4 px-6">
    <div class="flex justify-around items-center space-x-4 sm:space-x-6 md:space-x-10 lg:space-x-16">
      <router-link to="/dashboard" class="block">
        <img src="@/assets/footer1.png" alt="Performance" class="h-8 w-8 sm:h-10 sm:w-10" />
      </router-link>
      <router-link to="/finance" class="block">
        <img src="@/assets/footer2.png" alt="Add" class="h-8 w-8 sm:h-10 sm:w-10" />
      </router-link>
      <router-link to="/leaderboard" class="block">
        <img src="@/assets/footer3.png" alt="Leaderboard" class="h-8 w-8 sm:h-10 sm:w-10" />
      </router-link>
      <router-link to="/profile" class="block">
        <img src="@/assets/footer4.png" alt="Profile" class="h-8 w-8 sm:h-10 sm:w-10" />
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>