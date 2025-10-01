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
          <p>Streak Counter: <span class="font-semibold">{{ streak }}</span></p>
          <p>XP Level: <span class="font-semibold">{{ xpLevel }}</span></p>
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
    <!-- Educational Tip Section (Below Action Cards) -->
    <section class="w-full flex justify-center mt-6">
      <div class="bg-white rounded-lg shadow px-6 py-6 max-w-xl w-full text-center space-y-4">
        <h2 class="text-lg font-semibold text-gray-800">Financial Tip</h2>
        <p class="text-sm text-gray-700 leading-relaxed">{{ currentTip }}</p>
      </div>
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
          <p>XP Level: <span class="font-semibold"> {{ xpLevel }}</span></p>
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

        <!-- error -->
        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

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

        <!-- error -->
        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

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
    if (nextAllowed) {
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

// load progress immediately
onMounted(() => {
  getProgress();
})
// tips
const tips = [
  "Building an emergency fund is important. Ideally, it should cover at least 6 months of your living expenses so you're ready for unexpected events like medical costs or tuition fees.",
  "Track your spending weekly to spot patterns and cut unnecessary costs.",
  "Set a savings goal and automate deposits to make progress without thinking.",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Avoid impulse purchases by waiting 24 hours before buying non-essentials.",
  "Review subscriptions monthly — cancel what you don’t use.",
  "Invest early. Even small amounts grow significantly over time."
]

const currentTip = ref("")

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * tips.length)
  currentTip.value = tips[randomIndex]
})


</script>