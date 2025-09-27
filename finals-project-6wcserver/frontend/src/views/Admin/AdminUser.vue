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
          placeholder="Search users..."
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
            <tr v-for="i in 10" :key="i">
              <td class="px-4 py-3 text-gray-500">{{ i }}</td>
              <td class="px-4 py-3 text-gray-600">[Username]</td>
              <td class="px-4 py-3 text-gray-600">[DATE CREATED]</td>
              <td class="px-4 py-3">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    v-model="permissions[i - 1]"
                  />
                  <div class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-sky-600 transition"></div>
                  <div class="w-4 h-4 bg-white rounded-full shadow -ml-9 peer-checked:translate-x-5 transform transition"></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Pagination Footer -->
      <div class="flex items-center justify-between text-sm text-gray-600 mt-4">
        <p>Showing 1–10 of 78</p>
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
import { ref } from 'vue'
import AdminNav from '@/components/Admin/AdminNav.vue'

const permissions = ref(Array(10).fill(false))
</script>