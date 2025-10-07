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

        <!-- Right: Summary Table -->
        <div
          class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex-1
                 border-2 border-indigo-100 transition-all duration-300 
                 hover:shadow-2xl hover:border-indigo-200
                 h-[520px] sm:h-[520px] mt-4 sm:mt-0 flex flex-col justify-center"
        >
        </div>
      </div>

      <!-- ✅ Placeholder Section (still inside v-if="hasExpenses") -->
      <section class="w-full flex justify-center mt-6" v-if="hasExpenses">
        <div class="w-full max-w-3xl mx-auto space-y-3">
          <div
            v-for="index in 5"
            :key="index"
            class="flex justify-between items-center rounded-2xl px-6 py-3 shadow-sm border border-gray-300 transform hover:scale-105 transition-all duration-300 bg-white"
          >
            <span class="font-medium text-gray-700">{{ index }}. Placeholder</span>
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



<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import PieChart from '../components/PieChart.vue';
import api from '@/api/axios.js';

export default {
  name: 'Dashboard',
  components: { Header, Footer, PieChart },
  data() {
    return {
      totalSavings: null,
      totalBudget: null,
      totalExpenses: null,
      food: null,
      leisure: null,
      transportation: null,
      others: null,
      xpFill: 0,
      xpLevel: 0,
      streak: 0,
    };
  },
  created() {
    this.fetchTotalSavings();
    this.fetchExpenses();
    this.getProgress();
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
        console.error('Error fetching total savings:', error);
      }
    },
    async fetchExpenses() {
      const userId = localStorage.getItem('userId');
      try {
        const response = await api.get(`/compute/${userId}`);
        this.food = response.data.food;
        this.leisure = response.data.leisure;
        this.transportation = response.data.transportation;
        this.others = response.data.others;
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    },
    async getProgress() {
      try {
        const userId = localStorage.getItem('userId');
        const res = await api.get(`/user/${userId}/progress`);
        this.xpFill = res.data.progress || 0;
        this.xpLevel = res.data.level || 0;
        this.streak = res.data.streak || 0;
      } catch (err) {
        console.error('Get progress error:', err);
      }
    },
  },
  computed: {
    hasExpenses() {
      return (
        (this.food ?? 0) > 0 ||
        (this.leisure ?? 0) > 0 ||
        (this.transportation ?? 0) > 0 ||
        (this.others ?? 0) > 0
      );
    },
  },
};
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
