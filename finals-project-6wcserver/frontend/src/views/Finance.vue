<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-sky-100 transition-colors duration-700 relative">

    <!-- Header -->
    <div class="p-6 sm:p-8 bg-white shadow-lg rounded-b-3xl relative z-10">
      <Header />
    </div>

    <!-- Main content -->
      <div class="flex-grow px-4 sm:px-8 py-6 space-y-8 relative z-0 pb-28">

      <!-- Title -->
      <h1 class="text-2xl sm:text-3xl font-bold text-sky-800 text-center sm:text-left mt-6 mb-4">Finances</h1>

      <!-- Streak + XP Top Right (Desktop Only) -->
      <div class="hidden sm:block absolute top-32 right-8 z-10 text-right space-y-2">
        <div class="w-72 h-3 rounded-full overflow-hidden border border-orange-300 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 shadow-inner">
          <div class="h-full bg-orange-500 transition-all duration-700 ease-in-out" :style="{ width: xpFill + '%' }"></div>
        </div>
        <div class="text-sm text-orange-700 font-semibold mt-1 animate-pulse">
          Streak: {{ streak }} | XP: {{ xpLevel }}
        </div>
      </div>

      <!-- Action Cards -->
      <div class="flex flex-row flex-wrap justify-center items-start gap-4 sm:gap-6">
<!-- Add Budget -->
<div
  class="relative cursor-pointer bg-white/30 backdrop-blur-md hover:bg-sky-200/50 hover:scale-105 transform transition-all duration-300 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center text-center space-y-3 w-[45%] sm:w-[40%] md:w-[30%] max-w-[200px] overflow-visible"
  @click="showBudgetPopup = true"
>
  <!-- ℹ️ Info Icon -->
  <div
    class="absolute top-3 right-3 text-sky-600 hover:text-sky-800 cursor-pointer"
    @mouseenter="showInfo = !isMobile ? true : showInfo"
    @mouseleave="showInfo = !isMobile ? false : showInfo"
    @click.stop="toggleInfo()"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  </div>
<!-- 💬 Tooltip Bubble -->
<transition name="fade">
  <div
    v-if="showInfo"
    class="fixed inset-x-4 top-11 sm:inset-x-auto sm:left-1/2 sm:top-1/2 
           sm:-translate-x-1/2 sm:-translate-y-1/2 bg-sky-50 border border-sky-300 
           text-sky-800 text-xs sm:text-sm rounded-2xl px-4 py-3 shadow-lg 
           w-auto sm:w-80 max-w-[90%] text-left z-[99999]"
  >
    💡 <b>Add Budget</b><br />
    Set how much money you want to allocate daily, weekly, or monthly to manage your spending.
  </div>
</transition>





  <img src="@/assets/budget.png" alt="Add Budget"
    class="h-20 w-20 md:h-28 md:w-28 animate-bounce-slow" />
  <h2 class="text-sm md:text-base font-semibold text-sky-800">Add Budget</h2>
  <p class="text-xs md:text-sm text-sky-600 leading-tight">Increase your savings.</p>
</div>


<!-- Add Expense -->
<div
  class="relative cursor-pointer bg-white/30 backdrop-blur-md hover:bg-sky-200/50 hover:scale-105 transform transition-all duration-300 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center text-center space-y-3 w-[45%] sm:w-[40%] md:w-[30%] max-w-[200px] overflow-visible"
  @click="showExpensePopup = true"
>
  <!-- ℹ️ Info Icon (moved to top-left) -->
  <div
    class="absolute top-3 right-3 text-sky-600 hover:text-sky-800 cursor-pointer"
    @mouseenter="showExpenseInfo = !isMobile ? true : showExpenseInfo"
    @mouseleave="showExpenseInfo = !isMobile ? false : showExpenseInfo"
    @click.stop="toggleExpenseInfo()"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  </div>

  <!-- 💬 Tooltip Bubble -->
  <transition name="fade">
    <div
      v-if="showExpenseInfo"
      class="fixed inset-x-4 top-11 sm:inset-x-auto sm:left-1/2 sm:top-1/2 
             sm:-translate-x-1/2 sm:-translate-y-1/2 bg-sky-50 border border-sky-300 
             text-sky-800 text-xs sm:text-sm rounded-2xl px-4 py-3 shadow-lg 
             w-auto sm:w-80 max-w-[90%] text-left z-[99999]"
    >
      💡 <b>Add Expense</b><br />
      Track and record your expenses to monitor your spending habits effectively.
    </div>
  </transition>

  <img src="@/assets/expense.png" alt="Add Expense"
    class="h-20 w-20 md:h-28 md:w-28 animate-bounce-slow" />
  <h2 class="text-sm md:text-base font-semibold text-sky-800">Add Expense</h2>
  <p class="text-xs md:text-sm text-sky-600 leading-tight">Track your expenses.</p>
</div>


      </div>

      <!-- Educational Tip Section -->
      <section class="w-full flex justify-center mt-6">
        <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl px-6 py-6 max-w-xl w-full text-center space-y-4 transform hover:-translate-y-1 transition-all duration-300">
          <h2 class="text-lg font-bold text-sky-700">💡 Financial Tip</h2>
          <p class="text-sm text-gray-700 leading-relaxed">{{ currentTip }}</p>
        </div>
      </section>
<!-- Placeholder Ranked List Container -->
<section class="w-full flex justify-center mt-8 relative">
  <div
    class="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl px-6 py-8 max-w-3xl w-full space-y-4 relative"
  >
    <!-- Header Row -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg sm:text-xl font-bold text-sky-800">Recent Transaction (Last 1 Hour)</h2>

      <!-- 🗑️ Delete Button (Top Right) -->
      <button
        @click="showDeletePopup = true"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md transition-all duration-300"
      >
        Delete
      </button>
    </div>

    <!-- Transactions List -->
    <div v-if="transactions.length > 0">
      <div
        v-for="(txn, index) in transactions"
        :key="txn._id"
        class="flex justify-between items-center rounded-2xl px-6 py-3 shadow-sm border border-gray-300 transform hover:scale-105 transition-all duration-300 bg-white"
      >
        <div>
          <span class="font-medium text-gray-700">
            {{ index + 1 }}.
            {{ txn.finance_type === 'budget' ? 'Budget' : 'Expense' }}
          </span>
          <p class="text-xs text-gray-500">
            {{new Date(txn.timestamp).toLocaleString()}}
          </p>
        </div>
        <div class="text-right">
          <span
            v-if="txn.finance_type === 'budget'"
            class="text-green-600 font-bold"    
          >
            +₱{{ txn.amount?.toLocaleString() }}
          </span>
          <span 
            v-else
            class="text-red-600 font-bold"
          >
            -₱ {{ txn.expense?.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>

    <!-- No Transactions -->
    <div v-else class="text-center text-gray-500 text-sm py-6">
      No recent transactions.
    </div>
  </div>

  <!-- 🧾 Delete Popup -->
  <div
    v-if="showDeletePopup"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div
      class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 w-80 max-w-full space-y-4 animate-popup"
    >
      <h2 class="text-lg font-semibold text-center text-red-600">
        Delete Transactions
      </h2>
      <p class="text-sm text-gray-600 text-center">
        Select which placeholders to delete:
      </p>

      <!-- ✅ Checkboxes -->
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label
          v-for="(txn, index) in transactions"
          :key="txn._id"
          class="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-all"
        >
          <input
            type="checkbox"
            v-model="selectedToDelete"
            :value="txn._id"
            class="accent-red-500 w-4 h-4"
          />
          <div class="flex flex-col w-full">
            <div class="flex justify-between">
              <span class="font-medium">
                {{ index + 1 }}.
                {{ txn.finance_type === 'budget' ? 'Budget' : 'Expense' }}
              </span>
              <span v-if="txn.finance_type === 'budget'" class="text-green-600 font-semibold">
                +₱{{ txn.amount?.toLocaleString() }}
              </span>
              <span v-else class="text-red-600 font-semibold">
                -₱{{ txn.expense?.toLocaleString() }}
              </span>
            </div>
            <div class="text-xs text-gray-500 flex justify-between mt-0.5">
              <span v-if="txn.finance_type === 'budget'">
                {{ txn.allowance_type }} allowance
              </span>
              <span v-else>
                {{ txn.type }}
              </span>
              <span>
                {{ new Date(txn.timestamp).toLocaleString() }}
              </span>
            </div>
          </div>       
        </label>
      </div>

      <div class="flex justify-between pt-4">
        <button
          @click="showDeletePopup = false; selectedToDelete = []"
          class="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          @click="deleteSelected"
          class="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300"
        >
          Delete Selected
        </button>
      </div>
    </div>
  </div>
</section>




<!-- Mobile Streak + XP (below table) -->
<div class="sm:hidden mt-6 px-4 flex flex-col items-center space-y-2">
  <div class="w-full max-w-3xl h-3 rounded-full overflow-hidden border border-orange-300 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 shadow-inner">
    <div class="h-full bg-orange-500 transition-all duration-700 ease-in-out" :style="{ width: xpFill + '%' }"></div>
  </div>
  <div class="text-xs text-orange-700 font-semibold text-center animate-pulse mt-1">
    Streak: {{ streak }} | XP: {{ xpLevel }}
  </div>
</div>



    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>




    <!-- Budget Popup Modal -->
    <div v-if="showBudgetPopup" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-500">
      <div class="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 w-80 max-w-full space-y-4 transform scale-95 animate-popup">
        <button
          @click="showBudgetPopup = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 class="text-lg font-semibold text-center text-sky-800">Add Budget</h2>

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

        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

        <div class="flex justify-between pt-4">
          <button @click="resetBudget" class="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-300">
            Reset
          </button>
          <button @click="addBudget" class="px-5 py-2 bg-gradient-to-r from-sky-400 to-cyan-400 text-white rounded-full shadow-lg hover:from-sky-500 hover:to-cyan-500 transition-all duration-300">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Expense Popup Modal -->
    <div v-if="showExpensePopup" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-500">
      <div class="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 w-80 max-w-full space-y-4 transform scale-95 animate-popup">
        <button
          @click="showExpensePopup = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 class="text-lg font-semibold text-center text-sky-800">Add Expense</h2>


        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Amount</label>
          <input
            v-model.number="expenseAmount"
            type="number"
            placeholder="₱ 0.00"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <select v-model="expenseType" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="leisure">Leisure</option>
            <option value="others">Others</option>
          </select>
        </div>

        

        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

        <div class="flex justify-between pt-4">
          <button @click="resetExpense" class="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-300">
            Reset
          </button>
          <button @click="addExpense" class="px-5 py-2 bg-gradient-to-r from-sky-400 to-cyan-400 text-white rounded-full shadow-lg hover:from-sky-500 hover:to-cyan-500 transition-all duration-300">
            Confirm
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
@keyframes bounce-slow { 0%, 100% { transform: translateY(-5%) } 50% { transform: translateY(0) } }
.animate-bounce-slow { animation: bounce-slow 2s infinite; }

@keyframes popup { 0% { transform: scale(0.95); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
.animate-popup { animation: popup 0.3s ease-out forwards; }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}


</style>


<script setup>

// imports
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import api from '@/api/axios';
import { ref, watch, onMounted } from 'vue';


// states
const showBudgetPopup = ref(false)
const showExpensePopup = ref(false)
const xpFill = ref(0)
const xpLevel = ref(0)
const streak = ref(0)
const transactions = ref([])

// error
const error = ref("")
const nextAllowed = ref("")
const existing_allowance = ref("")

// form data
const budgetAmount = ref(null)
const budgetTimeline = ref('daily')
const expenseType = ref('food')
const expenseAmount = ref(null)

// methods
const getProgress = async () => {
  try {
    // get userid
    const userId = localStorage.getItem('userId')

    const res = await api.get(`/user/${userId}/progress`)
    xpFill.value = res.data.progress
    xpLevel.value = res.data.level
    streak.value = res.data.streak
  } catch (err){
    console.error('Get progress error:', err.response?.data || err.message)
  }
}

const resetBudget = () => { // reset budget
  budgetAmount.value = null
  budgetTimeline.value = 'monthly'
}

const resetExpense = () => { // reset expense
  expenseAmount.value = null
  expenseType.value = 'food'
}

const addBudget = async () => { // add budget
  try {
    // check amount first
    if (budgetAmount.value >= 15000) {
      error.value = 'Amount cannot exceed ₱15,000.'
      return
    }

    // get userid
    const userId = localStorage.getItem('userId')
  
    // response
    const res = await api.post('/budget', {
      userId,
      allowance_type: budgetTimeline.value,
      amount: budgetAmount.value
    })

    // get error
    nextAllowed.value = res.data.nextAllowed
    if (nextAllowed.value) {
      existing_allowance.value = res.data.existing_allowance
      error.value = `You already set a ${existing_allowance.value} budget. You may add on ${nextAllowed.value}`
      return 
    }

    // close pop up
    resetBudget()
    showBudgetPopup.value = false

    // refresh progress
    await getProgress()
    // error
  } catch (err) {
    console.error('Add budget error:', err.response?.data || err.message)
  }
}

const addExpense = async () => { // add expense
  try {
// check amount first
    if (expenseAmount.value < 10) {
      error.value = 'Expense must be atleast ₱10.'
      return
    }
    // get userid
    const userId = localStorage.getItem('userId')

    // get total savings
    const savingsRes = await api.get(`/compute/${userId}`)
    const totalSavings = savingsRes.data.totalSavings

    // validate expense
    if (expenseAmount.value > totalSavings) {
      error.value = 'Expense cannot exceed current savings.'
      return 
    }

    // add expense
    const res = await api.post('/expense', {
      userId,
      type: expenseType.value,
      expense: expenseAmount.value
    })

    // close pop up
    resetExpense()
    showExpensePopup.value = false

    // refresh progress
    await getProgress()

    // error
  } catch (err) {
    console.error('Add expense error:', err.response?.data || err.message)
  }
}

const fetchRecentTransactions = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const res = await api.get(`/transactions/recent/${userId}`);
    transactions.value = res.data
  } catch(err){
    console.error('Fetch recent transactions error:', err.response?.data || err.message)
  }
}


// check expense pop up
watch(showExpensePopup, (newVal) => {
  if (!newVal) {
    error.value = ""
    resetExpense()
  }
})

// check budget pop up
watch(showBudgetPopup, (newVal) => {
  if (!newVal) {
    error.value = ""
    resetBudget()
  }
})

// 💡 Financial Tips
const tips = [
  "Building an emergency fund is important. Ideally, it should cover at least 6 months of your living expenses so you're ready for unexpected events like medical costs or tuition fees.",
  "Track your spending weekly to spot patterns and cut unnecessary costs.",
  "Set a savings goal and automate deposits to make progress without thinking.",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Avoid impulse purchases by waiting 24 hours before buying non-essentials.",
  "Review subscriptions monthly — cancel what you don’t use.",
  "Invest early. Even small amounts grow significantly over time."
]

const currentTip = ref('')

const showDeletePopup = ref(false);
const selectedToDelete = ref([]);

const deleteSelected = async () => {
  try {
    if (selectedToDelete.value.length === 0) return;

    const userId = localStorage.getItem('userId');

    await api.delete('/transactions/delete', {
      data: {
        userId,
        transactionIds: selectedToDelete.value
      }
    });

    // refresh transactions and exp
    await fetchRecentTransactions();
    await getProgress();

    // reset
    selectedToDelete.value = [];
    showDeletePopup.value = false;
  } catch (err){
    console.error('Delete transactions error:', err.response?.data || err.message)
  }
}


// TOOLTIP!
// ADD BUDGET
const showInfo = ref(false)
const isMobile = ref(false)

function toggleInfo() {
  // only toggle tooltip for mobile users
  if (isMobile.value) showInfo.value = !showInfo.value
}

const showExpenseInfo = ref(false)

function toggleExpenseInfo() {
  if (isMobile.value) showExpenseInfo.value = !showExpenseInfo.value
}

onMounted(() => {
  getProgress();
  fetchRecentTransactions();

  // show a random tip each time the page loads or remounts
  const randomIndex = Math.floor(Math.random() * tips.length)
  currentTip.value = tips[randomIndex]

  // detect if user is on mobile based on screen width
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768
  })
});


</script>