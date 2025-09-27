<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Navigation -->
    <AdminNav />

    <!-- Main Content -->
    <main class="flex-1 ml-64 px-6 py-8 space-y-8">
      <!-- Header -->
        <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Leaderboard</h1>
        <button class="px-4 py-2 bg-sky-900 text-white text-sm rounded-md hover:bg-red-600 transition">
            Reset Leaderboard
        </button>
        </div>

        <!-- Divider Line -->
        <div class="border-t border-gray-300 my-4"></div>

      <!-- Leaderboard Table -->
      <section class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 text-left">Rank</th>
              <th class="px-4 py-3 text-left">Username</th>
              <th class="px-4 py-3 text-left">Level</th>
              <th class="px-4 py-3 text-left">EXP</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- Placeholder rows -->
            <tr v-for="i in 10" :key="i">
              <td class="px-4 py-3 text-gray-500">#{{ i }}</td>
              <td class="px-4 py-3 text-gray-600">[Username]</td>
              <td class="px-4 py-3 text-gray-600">[Level]</td>
              <td class="px-4 py-3 text-gray-600">[EXP]</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- Pagination Footer -->
    <div class="flex items-center justify-between text-sm text-gray-600 mt-4">
    <!-- Left: Showing count -->
    <p>Showing 1–10 of 778</p>

    <!-- Right: Navigation arrows -->
    <div class="flex items-center space-x-2">
        <button class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        </button>
        <button class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        </button>
    </div>
    </div>
    </main>
  </div>
</template>

<script setup>
import AdminNav from '@/components/Admin/AdminNav.vue'
</script>