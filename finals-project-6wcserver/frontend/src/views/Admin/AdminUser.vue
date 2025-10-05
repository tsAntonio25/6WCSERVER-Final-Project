<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Navigation -->
    <AdminNav />

    <!-- Main Content -->
    <main class="flex-1 ml-64 px-6 py-8 space-y-8">
      <!-- Header with Search -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">User Access Control</h1>
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Search username..."
          class="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <!-- Divider Line -->
      <div class="border-t border-gray-300 my-4"></div>

      <!-- User Table -->
      <section class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 text-left">ID</th>
              <th class="px-4 py-3 text-left">Username</th>
              <th class="px-4 py-3 text-left">Created At</th>
              <th class="px-4 py-3 text-left">Permissions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user._id">
              <td class="px-4 py-3 text-gray-500">{{ user._id }}</td>
              <td class="px-4 py-3 text-gray-600">{{ user.username }}</td>
              <td class="px-4 py-3 text-gray-600">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              <td class="px-4 py-3">
                <div
                  v-if="user.username === currentUsername" class="text-blue-400 italic">
                  (You)
                </div>
                <label
                  v-else
                  class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="user.is_admin"
                    @change="() => toggleAdmin(user)"
                  />
                  <div class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-sky-600 transition"></div>
                  <div class="w-4 h-4 bg-white rounded-full shadow -ml-9 peer-checked:translate-x-5 transform transition"></div>
                </label>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="4" class="px-4 py-3 text-gray-600 text-center">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Pagination Footer -->
      <div class="flex items-center justify-between text-sm text-gray-600 mt-4">
        <p>Showing {{ (page - 1) * limit + 1 }}–{{ Math.min(page * limit, total) }} of {{ total }}</p>
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
const users = ref([])
const searchQuery = ref('')
const page = ref(1)
const limit = 10
const total = ref(0)
const totalPages = ref(1)
const currentUsername = ref(localStorage.getItem('username') || '');

// methods
const fetchUsers = async () => {
  try {
    const res = await api.get(`/admin/users?page=${page.value}&limit=${limit}&search=${encodeURIComponent(searchQuery.value)}`);
    
    users.value = res.data.users || []
    total.value = res.data.total || 0
    totalPages.value = res.data.totalPages || 1

  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

const handleSearch = () => {
  page.value = 1
  fetchUsers()
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
    fetchUsers()
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchUsers()
  }
}

const toggleAdmin = async (user) => {
  if (user.username === currentUsername.value) {
    alert("You cannot change your own admin status.")
    return
  }

  try {
    await api.patch(`/admin/users/${user._id}/toggle-admin`)

  } catch (err) {
    console.error('Failed to toggle admin:', err)
  }
}

onMounted(() => {
  currentUsername.value = localStorage.getItem('username') || ''
  fetchUsers()
})
</script>