<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden relative">
    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-6">
      <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>

      <!-- Profile Card -->
<div class="max-w-md mx-auto bg-white rounded-lg shadow pt-8 pb-6 px-6 space-y-6 relative">
  <!-- Top Row: Avatar + Edit -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="h-16 w-16 rounded-full overflow-hidden border-4 border-sky-600 bg-sky-600">
        <img
          src="@/assets/user.png"
          alt="User Icon"
          class="h-full w-full object-contain"
        />
      </div>
      <div class="space-y-2">
        <div>
          <p class="text-sm text-gray-600">Username:</p>
          <p class="text-base font-semibold text-gray-800">{{ username }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Email:</p>
          <p class="text-base font-semibold text-gray-800">{{ email }}</p>
        </div>
      </div>
    </div>

    <router-link
      to="/password"
      class="px-4 py-2 bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 transition"
    >
      Edit
    </router-link>
  </div>

  <!-- Admin Button -->
  <div v-if="isAdmin" class="flex justify-end">
    <router-link
      to="/admindash"
      class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
    >
      Admin
    </router-link>
  </div>

  <!-- Log Out Button -->
  <div>
    <button
      @click="logout"
      class="w-full py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
    >
      Log Out
    </button>
  </div>
</div>

      <!-- History Section -->
      <section class="max-w-md mx-auto rounded-lg p-4 text-center space-y-2">
        <h3 class="text-xl font-semibold text-left sm:text-center">History</h3>
        <p class="text-base sm:text-lg font-semibold text-gray-700">You're at Level {{level}}!</p>
        <p class="text-sm text-gray-600">
          Add your first budget or expense to start earning XP and climbing on the leaderboard.
        </p>
      </section>

      <!-- Transaction History Log -->
      <section class="max-w-md mx-auto space-y-3">
        <div class="bg-green-100 text-green-800 px-4 py-3 rounded-md shadow-sm text-sm">
          Added ₱[amount] on [category] at [date]
        </div>

        <div class="bg-red-100 text-red-800 px-4 py-3 rounded-md shadow-sm text-sm">
          Spent ₱[amount] on [category] at [date]
        </div>
      </section>
    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>
  </div>
</template>

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
      router.push('/login')
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