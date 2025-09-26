<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="p-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-8">
      <!-- Title -->
      <h1 class="text-xl font-semibold mb-4">Finances</h1>

      <!-- Streak + XP Top Right (Desktop Only) -->
      <div class="hidden sm:block absolute top-24 right-8 z-10 text-right space-y-2">
        <div class="w-72 h-3 bg-orange-100 rounded-full overflow-hidden border border-orange-300">
          <div class="h-full bg-orange-500 transition-all duration-300" :style="{ width: xpFill + '%' }"></div>
        </div>
        <div class="text-sm text-gray-700 font-medium">
          <p>Streak Counter: <span class="font-semibold">0</span></p>
          <p>XP Level: <span class="font-semibold">0</span></p>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="flex flex-row flex-wrap justify-center items-start gap-3 sm:gap-6">
        <!-- Add Budget -->
        <div
          @click="showBudgetPopup = true"
          class="cursor-pointer bg-sky-400/20 rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3 w-[45%] sm:w-[40%] md:w-[30%] max-w-[180px] md:max-w-[200px]"
        >
          <img src="@/assets/budget.png" alt="Add Budget" class="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28" />
          <h2 class="text-sm md:text-base font-semibold">Add Budget</h2>
          <p class="text-xs md:text-sm text-gray-600 leading-tight">Increase your savings.</p>
        </div>

        <!-- Add Expense -->
        <div
          @click="showExpensePopup = true"
          class="cursor-pointer bg-sky-400/20 rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3 w-[45%] sm:w-[40%] md:w-[30%] max-w-[180px] md:max-w-[200px]"
        >
          <img src="@/assets/expense.png" alt="Add Expense" class="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28" />
          <h2 class="text-sm md:text-base font-semibold">Add Expense</h2>
          <p class="text-xs md:text-sm text-gray-600 leading-tight">Track your expenses.</p>
        </div>
      </div>

      <!-- History Section -->
      <section class="rounded-lg p-4 text-center space-y-2">
        <h3 class="text-xl font-semibold text-left sm:text-center">History</h3>
        <p class="text-base sm:text-lg font-semibold text-gray-700">You're at Level 0!</p>
        <p class="text-sm text-gray-600">
          Add your first budget or expense to start earning XP and climbing on the leaderboard.
        </p>
      </section>
    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>

    <!-- Bottom Illustration + Mobile Streak Block -->
    <div class="relative px-4">
      <div class="flex justify-center mb-4 sm:absolute sm:bottom-0 sm:inset-x-0 sm:mb-0">
        <img src="@/assets/bgadd.png" alt="Savings Illustration" class="h-72 w-auto sm:h-80  lg:h-96" />
      </div>

      <div class="sm:hidden flex flex-col items-center space-y-2 mb-[88px]">
        <div class="w-72 h-3 bg-orange-100 rounded-full overflow-hidden border border-orange-300">
          <div class="h-full bg-orange-500 transition-all duration-300" :style="{ width: xpFill + '%' }"></div>
        </div>
        <div class="text-xs text-gray-700 font-medium text-center">
          <p>Streak Counter: <span class="font-semibold">0</span></p>
          <p>XP Level: <span class="font-semibold">0</span></p>
        </div>
      </div>
    </div>

    <!-- Budget Popup Modal -->
    <div v-if="showBudgetPopup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-lg p-6 w-80 space-y-4">
        <button
          @click="showBudgetPopup = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 class="text-lg font-semibold text-center">Add Budget</h2>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Amount</label>
          <input
            v-model.number="budgetAmount"
            type="number"
            placeholder="₱ 0.00"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Timeline</label>
          <select v-model="budgetTimeline" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div class="flex justify-between pt-4">
          <button @click="resetBudget" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Reset
          </button>
          <button @click="addBudget" class="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Expense Popup Modal -->
    <div v-if="showExpensePopup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-lg p-6 w-80 space-y-4">
        <button
          @click="showExpensePopup = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 class="text-lg font-semibold text-center">Add Expense</h2>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <select v-model="expenseType" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="leisure">Leisure</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Amount</label>
          <input
            v-model.number="expenseAmount"
            type="number"
            placeholder="₱ 0.00"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div class="flex justify-between pt-4">
          <button @click="resetExpense" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Reset
          </button>
          <button @click="addExpense" class="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// rewrite into script setup 

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import api from '@/api/axios.js'

export default {
  name: 'Finance',
  components: { Header, Footer },
  data() {
    return {
      showBudgetPopup: false,
      showExpensePopup: false,
      xpFill: 0,
      // form data
      budgetAmount: null,
      budgetTimeline: 'monthly',
      expenseType: 'food',
      expenseAmount: null
    };
  },
   methods: {
    async addBudget() {
      try {
        const userId = localStorage.getItem('userId');

        const res = await api.post('/budget', {
          userId,
          allowance_type: this.budgetTimeline,
          amount: this.budgetAmount
        });

        // verify budget
        console.log('Budget added:', res.data);

        this.resetBudget();
        this.showBudgetPopup = false;
      } catch (err) {
        console.error('Add budget error:', err.response?.data || err.message);
      }
    },
    async addExpense() {
      try {
        const userId = localStorage.getItem('userId');

        // fetch total savings
        const savingsRes = await api.get(`/compute/${userId}`);
        const totalSavings = savingsRes.data.totalSavings;

        // validate the expense
        if (this.expenseAmount > totalSavings) {
          // papalit nito ayaw mo alert e || TALAGA LOOK SINO BA NAMAN GUMAGAMIT NG ALERT THIS 2025?!
          alert('Expense cannot exceed current savings.');
          return;
        }

        // add expense
        const res = await api.post('/expense', {
          userId,
          type: this.expenseType,
          expense: this.expenseAmount
        });

        // verify expense
        console.log('Expense added:', res.data);

        this.resetExpense();
        this.showExpensePopup = false;
      } catch (err) {
        console.error('Add expense error:', err.response?.data || err.message);
      }
    },
    resetBudget() {
      this.budgetAmount = null;
      this.budgetTimeline = 'monthly';
    },
    resetExpense() {
      this.expenseAmount = null;
      this.expenseType = 'food';
    }
   }
};
</script>