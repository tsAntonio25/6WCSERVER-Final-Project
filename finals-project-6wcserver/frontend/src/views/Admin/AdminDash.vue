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
          <p class="text-2xl font-bold text-sky-600">20</p>
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
        <ExpenseCircle label="Food" :percent="81" color="#FF5B5B" />
        <ExpenseCircle label="Transportation" :percent="22" color="#00B074" />
        <ExpenseCircle label="Leisure" :percent="62" color="#2D9CDB" />
        <ExpenseCircle label="Others" :percent="62" color="#DB2DB2" />
    </div>
    </section>
    </main>
  </div>
</template>

<script setup>
import AdminNav from '@/components/Admin/AdminNav.vue';
import ExpenseCircle from '@/components/Admin/ExpenseCircle.vue'
</script>