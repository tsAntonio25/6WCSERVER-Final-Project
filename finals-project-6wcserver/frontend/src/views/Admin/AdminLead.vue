<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Navigation -->
    <AdminNav />

    <!-- Main Content -->
    <main class="flex-1 ml-64 px-6 py-8 space-y-8">
      <!-- Header -->
        <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Leaderboard</h1>
        <button 
          @click = "resetLeaderboard"
          class="px-4 py-2 bg-sky-900 text-white text-sm rounded-md hover:bg-red-600 transition">
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
            <tr v-for="(user, index) in leaderboard" :key="user._id">
              <td class="px-4 py-3 text-gray-500">#{{ (page - 1) * limit + index + 1 }}</td>
              <td class="px-4 py-3 text-gray-600">{{user.username}}</td>
              <td class="px-4 py-3 text-gray-600">{{ user.level }}</td>
              <td class="px-4 py-3 text-gray-600">{{ user.exp }}</td>
            </tr>
            <tr v-if="leaderboard.length === 0">
              <td colspan="4" class="px-4 py-3 text-gray-600">No user found.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- Pagination Footer -->
    <div class="flex items-center justify-between text-sm text-gray-600 mt-4">
    <!-- Left: Showing count -->
    <p>Showing {{ (page - 1) * 10 + 1 }}–{{ Math.min(page * 10, total) }} of {{ total }}</p>

    <!-- Right: Navigation arrows -->
    <div class="flex items-center space-x-2">
        <button 
          @click="prevPage" :disabled="page === 1"
          class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        </button>
        <button
          @click="nextPage" :disabled="page===totalPages"
          class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
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
// imports
import { ref, onMounted } from 'vue'
import AdminNav from '@/components/Admin/AdminNav.vue'
import api from '@/api/axios.js'

// states
const leaderboard = ref([])
const total = ref(0)
const totalPages = ref(1)
const page = ref(1)
const limit = 10

// methods
const fetchLeaderboard = async () => {
  try {
    const res = await api.get(`/leaderboard?page=${page.value}&limit=${limit}`); 
    leaderboard.value = res.data.users;
    total.value = res.data.total
    totalPages.value = res.data.totalPages

  } catch (err) {
    console.error('Error fetching leaderboard:', err);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value){
    page.value ++
    fetchLeaderboard()
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchLeaderboard()
  }
}

const resetLeaderboard = async () => {
  if(!confirm('Are you sure you want to reset the leaderboard?')) return
  try {
    await api.post('/admin/leaderboard/reset')
    await fetchLeaderboard()
  } catch (err){
    console.error('Failed to reset leaderboard:', err);
  }
}

onMounted(fetchLeaderboard)
</script>