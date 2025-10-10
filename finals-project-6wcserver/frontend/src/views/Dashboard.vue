<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-white to-gray-50 relative overflow-hidden">

    <!-- Header -->
    <div class="p-6 sm:p-8">
      <Header />
    </div>

    <!-- Main Content -->
    <div class="flex-grow mt-4 sm:mt-0 px-4 sm:px-8 py-8 pb-24 sm:pb-8 space-y-10 relative z-10">

      <!-- Total Savings -->
      <section class="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 shadow-lg text-center">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-wide mb-2">Total Savings</h2>
        <p class="text-4xl sm:text-5xl font-extrabold">
          {{ totalSavings ? '₱' + totalSavings : '₱ 0.00' }}
        </p>
      </section>

      <!-- 🧭 XP BAR -->
      <section
        class="bg-white border border-orange-200 rounded-2xl shadow-md p-6 sm:p-8 mx-auto max-w-lg text-center 
        transition-all duration-300 hover:shadow-lg"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">Progress Tracker</h3>
        <div class="w-full h-4 bg-orange-100 rounded-full overflow-hidden border border-orange-300 mb-3">
          <div
            class="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500 ease-out"
            :style="{ width: xpFill + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-sm text-gray-700 font-medium">
          <p>Streak: <span class="font-semibold">{{ streak }}</span></p>
          <p>Level: <span class="font-semibold">{{ xpLevel }}</span></p>
          <p>XP: <span class="font-semibold">{{ xpFill }}%</span></p>
        </div>
      </section>

      <!-- 💰 Expenses Section -->
      <div
        v-if="hasExpenses"
        class="flex flex-col sm:flex-row justify-center items-stretch gap-6 
               mx-4 sm:mx-auto max-w-6xl"
      >
        <!-- Left: Pie Chart Card -->
        <div
          class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex-1
                 border-2 border-indigo-100 transition-all duration-300 
                 hover:shadow-2xl hover:border-indigo-200"
        >
          <!-- Pie Chart -->
          <div class="flex justify-center items-center min-h-[360px] sm:min-h-[420px]">
            <div class="flex flex-col items-center justify-center w-full">
              <PieChart
                :food="food"
                :transportation="transportation"
                :leisure="leisure"
                :others="others"
                class="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
              />
            </div>
          </div>

          <!-- Expense Breakdown -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div class="flex justify-between items-center bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200">
              <span class="font-semibold">Food</span>
              <span class="font-bold">₱ {{ food }}</span>
            </div>

            <div class="flex justify-between items-center bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200">
              <span class="font-semibold">Transportation</span>
              <span class="font-bold">₱ {{ transportation }}</span>
            </div>

            <div class="flex justify-between items-center bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200">
              <span class="font-semibold">Leisure</span>
              <span class="font-bold">₱ {{ leisure }}</span>
            </div>

            <div class="flex justify-between items-center bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200">
              <span class="font-semibold">Others</span>
              <span class="font-bold">₱ {{ others }}</span>
            </div>
          </div>
        </div>

        <!-- Weekly Expenses Bar Graph -->
        <div
          class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex-1
                 border-2 border-indigo-100 transition-all duration-300 
                 hover:shadow-2xl hover:border-indigo-200
                 h-[520px] sm:h-[520px] mt-4 sm:mt-0 flex flex-col justify-center"
        >
        <BarGraph
        v-if="weeklyExpenses"
        :labels="weeklyExpenses.labels"
        :data="weeklyExpenses.data"
        />
        </div>
      </div>

      <!-- Recent Budgets Section -->
      <section class="w-full flex justify-center mt-6" v-if="recentBudgets">
        <div class="w-full max-w-3xl mx-auto space-y-3">
          <h3 class="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2"> Recent Budgets </h3>
          <div
            v-for="(budget, index) in recentBudgets"
            :key="budget._id"
            class="flex justify-between items-center rounded-2xl px-6 py-3 shadow-sm border border-gray-300 transform hover:scale-105 transition-all duration-300 bg-white"
          >
            <div>
              <p class="font-medium text-gray-700 capitalize">
                {{ index + 1 }}. {{ budget.allowance_type }} Budget
              </p>
              <p class="text-xs text-gray-500">
                {{ new Date(budget.createdAt).toLocaleString() }}
              </p>
            </div>
            <div class="text-right font-bold text-green-600">
              ₱{{ budget.amount.toLocaleString() }}
            </div>
          </div>
        </div>
      </section>

      <!-- 📉 No Data Section -->
      <div v-else class="flex flex-col items-center space-y-10 text-center">
        <section class="bg-gray-100 rounded-2xl p-8 shadow-inner w-full sm:max-w-lg mx-auto border border-gray-200">
          <div class="flex justify-center">
            <div
              class="h-44 w-44 sm:h-52 sm:w-52 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 
              flex items-center justify-center text-gray-500 text-base border border-gray-300 font-medium"
            >
              No data yet
            </div>
          </div>
        </section>

        <section class="space-y-5">
          <h3 class="text-2xl font-bold text-gray-800">Expenses</h3>
          <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
            No records yet.<br />
            Start tracking your first budget or expense today!
          </p>

          <router-link
            to="/finance"
            class="inline-block bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 
            text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg 
            transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Take me there!
          </router-link>
        </section>
      </div>
    </div>

    <!-- Mobile Footer -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-20 bg-white shadow-inner">
      <Footer />
    </div>
  </div>
</template>



<script setup>

// imports
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import PieChart from '../components/PieChart.vue';
import BarGraph from '@/components/BarGraph.vue';
import api from '@/api/axios.js';
import { ref, computed, onMounted } from 'vue'

// states
const totalSavings = ref(null)
const totalBudget = ref(null)
const totalExpenses = ref(null)
const food = ref(null)
const leisure = ref(null)
const transportation = ref(null)
const others = ref(null)
const xpFill = ref(0)
const xpLevel = ref(0)
const streak = ref(0)
const weeklyExpenses = ref(null)
const recentBudgets = ref(null)

// methods
// fetch total savings
const fetchTotalSavings = async () => {
  const userId = localStorage.getItem('userId')

  try {
    const res = await api.get(`/compute/${userId}`)
    totalBudget.value = res.data.totalBudgetAmount
    totalExpenses.value = res.data.totalExpenseAmount
    totalSavings.value = res.data.totalSavings
  } catch (err) {
    console.error('Error fetching total savings:', err) 
  }
}

// fetch expenses
const fetchExpenses = async () => {
  const userId = localStorage.getItem('userId')

  try {
    const res = await api.get(`/compute/${userId}`)
    food.value = res.data.food
    leisure.value = res.data.leisure
    transportation.value = res.data.transportation
    others.value = res.data.others
  } catch (err) {
    console.error('Error fetching expenses:', err)
  }
}

// fetch recent budgets
const fetchRecentBudget = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const res = await api.get(`/user/recent/${userId}`)
    recentBudgets.value = res.data;

  } catch (err) {
    console.error('Error recent budgets:', err);
  }
}

// fetch weekly expenses
const fetchWeeklyExpenses = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const res = await api.get(`/user/weekly/${userId}`);
    weeklyExpenses.value = res.data.weeklyExpenses || res.data;
  } catch (err) {
    console.error('Error fetching weekly expenses:', err);
  }
}


// get progress
const getProgress = async () => {
  try {
    const userId = localStorage.getItem('userId')
    const res = await api.get(`/user/${userId}/progress`);
    xpFill.value = res.data.progress || 0
    xpLevel.value = res.data.level || 0
    streak.value = res.data.streak || 0
  } catch (err) {
    console.error('Get progress error:', err)
  }
}

// computed
const hasExpenses = computed(() => {
  return (
    (food.value ?? 0) > 0 ||
    (leisure.value ?? 0) > 0 ||
    (transportation.value ?? 0) > 0 ||
    (others.value ?? 0) > 0
  ) 
})

// call methods
onMounted(() => {
  fetchTotalSavings()
  fetchExpenses()
  getProgress()
  fetchRecentBudget()
  fetchWeeklyExpenses()
})

</script>

<style scoped>
section,
div[v-if],
div[v-else] {
  transition: all 0.3s ease;
}

h2,
h3,
h1 {
  letter-spacing: 0.03em;
}

.bg-gradient-to-b {
  background-attachment: fixed;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>
