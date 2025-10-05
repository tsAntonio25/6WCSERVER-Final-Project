<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="p-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow mt-6 sm:mt-0 px-4 sm:px-8 py-6 space-y-8">

      <!-- Total Savings -->
      <section class="bg-indigo-950 text-white rounded-lg p-4 sm:p-6 pt-6 shadow-md">
        <h2 class="text-lg sm:text-xl font-semibold">
          Total Savings: {{ totalSavings ? ' ₱' + totalSavings : '₱ 0.00' }}
        </h2>
      </section>

      
<!-- Expenses Section -->
<div v-if="hasExpenses" class="bg-white rounded-lg shadow-md p-4 sm:p-6 mx-4 sm:mx-auto max-w-md">
  <!-- Pie Chart -->
  <PieChart
    :food="food"
    :transportation="transportation"
    :leisure="leisure"
    :others="others"
  />

  <!-- Expense Breakdown -->
  <div class="flex flex-col items-center text-center">
    <h1 class="text-xl sm:text-2xl font-bold mb-6">Expenses</h1>

    <div class="space-y-3 w-full">
      <div class="flex justify-between text-base sm:text-lg">
        <span class="text-green-500 font-semibold">Food</span>
        <span class="text-green-500">₱ {{ food }}</span>
      </div>

      <div class="flex justify-between text-base sm:text-lg">
        <span class="text-blue-500 font-semibold">Transportation</span>
        <span class="text-blue-500">₱ {{ transportation }}</span>
      </div>

      <div class="flex justify-between text-base sm:text-lg">
        <span class="text-yellow-500 font-semibold">Leisure</span>
        <span class="text-yellow-500">₱ {{ leisure }}</span>
      </div>

      <div class="flex justify-between text-base sm:text-lg">
        <span class="text-red-500 font-semibold">Others</span>
        <span class="text-red-500">₱ {{ others }}</span>
      </div>
    </div>
  </div>
</div>




      <!-- show this if no expense data yet -->
      <div v-else>
        <section class="bg-gray-100 rounded-lg p-6 shadow-inner w-full sm:max-w-lg mx-auto">
          <div class="flex justify-center">
              <div class="h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border border-gray-300">
                No data yet
                </div>
            </div>
        </section>

        <section class="text-center space-y-4">
          <h3 class="text-lg font-semibold">Expenses</h3>
          <p class="text-sm text-gray-600">
            No records yet.<br />
            Start tracking your first budget or expense today!
          </p>
    
          <router-link
              to="/finance"
              class="hidden sm:inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md shadow-sm transition"
              >
              Take me there!
          </router-link>
      </section>
      </div>
    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>

    <!-- Piggy Bank Image: centered on mobile, bottom-left on desktop -->
    <div class="fixed bottom-16 sm:bottom-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-0">
    <img
        src="@/assets/dashboardbg.png"
        alt="Piggy Bank"
        class="h-25 w-auto sm:h-32 lg:h-100 lg:w-100"
    />
    </div>
  </div>
</template>

<script>
// NOTE: rewrite to composition api syntax

// imports
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import PieChart from '../components/PieChart.vue'
import api from '@/api/axios.js';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
    PieChart
  },
  data() {
    return {
      // totals
      totalSavings: null,
      totalBudget: null,
      totalExpenses: null,

      // expenses
      food: null,
      leisure: null,
      transportation: null,
      others: null
    };
  },
  created() {
    // call methods
    this.fetchTotalSavings();
    this.fetchExpenses()
  },
  methods: {
    async fetchTotalSavings() {
      const userId = localStorage.getItem('userId');
      try {
        const response = await api.get(`/compute/${userId}`);
        this.totalBudget = response.data.totalBudgetAmount;
        this.totalExpenses = response.data.totalExpenseAmount;
        this.totalSavings = response.data.totalSavings;
      } catch (error) {
        console.error('Error fetching total savings:', error.response?.data || error.message);
      }
    },
    async fetchExpenses() {
      const userId = localStorage.getItem('userId');
      try {
        const response = await api.get(`/compute/${userId}`);
        this.food = response.data.food
        this.leisure = response.data.leisure
        this.transportation = response.data.transportation
        this.others = response.data.others
      } catch (error ){
        console.error('Error fetching total savings:', error.response?.data || error.message);
      }
    }
  },

  computed: {
  hasExpenses() {
    return (
      (this.food ?? 0) > 0 ||
      (this.leisure ?? 0) > 0 ||
      (this.transportation ?? 0) > 0 ||
      (this.others ?? 0) > 0
    )
  }
}
};
</script>