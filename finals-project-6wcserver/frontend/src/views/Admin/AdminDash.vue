<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Navigation -->
    <AdminNav />

    <!-- Main Content -->
    <main class="flex-1 ml-64 px-6 py-8 space-y-8">
      <!-- Header -->
      <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <!-- User Metrics -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <p class="text-sm text-gray-500">Total Users</p>
          <p class="text-2xl font-bold text-sky-600">{{ totalUsers }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <p class="text-sm text-gray-500">Total Visits</p>
          <p class="text-2xl font-bold text-sky-600">75</p>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <p class="text-sm text-gray-500">Active Users</p>
          <p class="text-2xl font-bold text-sky-600">8</p>
        </div>
      </section>

      <!-- Page Views Chart -->
      <section class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Page Views</h2>
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
          [Line Chart Placeholder]
        </div>
      </section>

      <!-- Expenses Breakdown -->
    <section class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Expenses</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ExpenseCircle label="Food" :percent="expensesPercentages.food" color="#FF5B5B" />
        <ExpenseCircle label="Transportation" :percent="expensesPercentages.transportation" color="#00B074" />
        <ExpenseCircle label="Leisure" :percent="expensesPercentages.leisure" color="#2D9CDB" />
        <ExpenseCircle label="Others" :percent="expensesPercentages.others" color="#DB2DB2" />
    </div>
    </section>
    </main>
  </div>
</template>

<script setup>
// imports
import { ref, onMounted } from 'vue'
import AdminNav from '@/components/Admin/AdminNav.vue';
import ExpenseCircle from '@/components/Admin/ExpenseCircle.vue'
import api from '@/api/axios.js';

// states
const totalUsers = ref(0)
const expensesPercentages = ref({
  food: 0,
  transportation: 0,
  leisure: 0,
  others: 0
})

// methods
const getTotalUsers = async () => {
  try {
    const res = await api.get(`admin/total`)
    totalUsers.value = res.data
  } catch(err) {
    console.error('Get total users error:', err.response?.data || err.message)
  }
}

const getExpensesPercentages = async () => {
  try {
    const res = await api.get(`admin/expenses`)
    expensesPercentages.value = res.data
  } catch(err) {
    console.error('Get expenses percent error:', err.response?.data || err.message)
  }
}

onMounted(() => {
  getTotalUsers()
  getExpensesPercentages()
})

</script>