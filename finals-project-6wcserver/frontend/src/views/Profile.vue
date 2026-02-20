<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-sky-100 relative overflow-x-hidden">

    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-white shadow-lg rounded-b-3xl z-20">
      <div class="pt-6 sm:pt-8 px-4 sm:px-8">
        <Header />
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 mt-[100px] px-4 sm:px-8 py-6 space-y-6 overflow-y-auto pb-32"> <!-- scrollable with bottom padding -->

      <h1 class="text-2xl sm:text-3xl font-bold text-center text-sky-800 mb-4">Profile</h1>

      <!-- Profile Card -->
      <div class="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 space-y-6 relative">

        <!-- Top Row: Avatar + Edit -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="h-20 w-20 rounded-full overflow-hidden border-4 border-sky-500 bg-sky-500 shadow-lg">
              <img
                src="@/assets/user.png"
                alt="User Icon"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="space-y-1">
              <div>
                <p class="text-sm text-gray-500">Username:</p>
                <p class="text-base font-semibold text-gray-800">{{ username }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Email:</p>
                <p class="text-base font-semibold text-gray-800">{{ email }}</p>
              </div>
            </div>
          </div>

          <router-link
            to="/password"
            class="px-4 py-2 bg-sky-600 text-white text-sm rounded-lg hover:bg-sky-700 transition"
          >
            Edit
          </router-link>
        </div>

        <!-- Admin Button -->
        <div v-if="isAdmin" class="hidden sm:flex justify-end">
          <router-link
            to="/admindash"
            class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
          >
            Admin
          </router-link>
        </div>

        <!-- Log Out Button -->
        <button
          @click="logout"
          class="w-full py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>

      <!-- History Section -->
      <section class="max-w-md mx-auto rounded-3xl p-4 bg-white/70 backdrop-blur-lg shadow-xl space-y-4 overflow-y-auto">
        <h3 class="text-xl font-semibold text-sky-700 text-left sm:text-center">History</h3>

        <!-- No history -->
        <div v-if="!history.length" class="text-center text-gray-500 text-sm">
          Add your first budget or expense to start earning XP and climbing on the leaderboard.
        </div>

        <!-- Transaction History Log -->
        <div v-else class="space-y-3">
          <div v-for="val in history" :key="val.date" class="transition-transform hover:scale-105">
            <div v-if="val.finance_type === 'budget'" class="bg-green-100 text-green-800 px-4 py-3 rounded-2xl shadow-sm text-sm flex justify-between items-center">
              <span>Added ₱{{ val.amount }} ({{ val.allowance_type }})</span>
              <span class="text-gray-500 text-xs">{{ new Date(val.createdAt).toLocaleString() }}</span>
            </div>
            <div v-else class="bg-red-100 text-red-800 px-4 py-3 rounded-2xl shadow-sm text-sm flex justify-between items-center">
              <span>Spent ₱{{ val.expense }} on {{ val.type }}</span>
              <span class="text-gray-500 text-xs">{{ new Date(val.date).toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>
  </div>
</template>


<style>
/* Optional: subtle hover animation for cards */
.hover-card:hover {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.3s ease-in-out;
}
</style>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import api from '@/api/axios'

const router = useRouter()
const username = ref('')
const email = ref('')
const isAdmin = ref(false)
const level = ref(0)
const history = ref([])


const fetchUser = async () => {
  try {
    const userId = localStorage.getItem('userId')
    const adminFlag = localStorage.getItem('is_admin') === 'true'
    isAdmin.value = adminFlag

    if (!userId) {
      router.push('/api/login')
      return
    }

    // for user info
    const res = await api.get(`/user/${userId}`)
    username.value = res.data.username || res.data.anon_username
    email.value = res.data.email

    // for level
    const progressRes = await api.get(`/user/${userId}/progress`)
    level.value = progressRes.data.level

    // for history
    const historyRes = await api.get(`/user/${userId}/history`)
    history.value = historyRes.data

  } catch (err) {
    console.error('Fetch user error:', err.response ? err.response.data : err.message)
    alert('Fetch user failed: ' + (err.response?.data?.message || err.message))
    router.push('/login')
  }
}

const logout = () => {
  localStorage.clear()
  router.push('/').then(() => {
    location.reload()
  })
}

onMounted(fetchUser)
</script>