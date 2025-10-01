<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden relative">
    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-6">
      <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>

      <div class="max-w-md mx-auto bg-white rounded-lg shadow pt-10 pb-6 px-6 space-y-4 relative">
        <!-- Edit + Admin Dashboard Buttons -->
        <div class="flex justify-end gap-3">
          <router-link
            to="/password"
            class="px-4 py-2 bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 transition"
          >
            Edit
          </router-link>

          <router-link
            v-if="isAdmin"
            to="/admindash"
            class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
          >
            Admin
          </router-link>
        </div>

        <!-- Profile Icon -->
        <div class="flex justify-center mt-2">
          <div class="h-20 w-20 rounded-full overflow-hidden border-4 border-sky-600 bg-sky-600">
            <img
              src="@/assets/user.png"
              alt="User Icon"
              class="h-full w-full object-contain"
            />
          </div>
        </div>

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <span class="text-sm text-gray-800">{{ username }}</span>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <span class="text-sm text-gray-800">{{ email }}</span>
        </div>

        <!-- Log Out Button -->
        <div class="mt-6">
          <button
            @click="logout"
            class="w-full py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
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

const fetchUser = async () => {
  try {
    const userId = localStorage.getItem('userId')
    const adminFlag = localStorage.getItem('is_admin') === 'true'
    isAdmin.value = adminFlag

    if (!userId) {
      router.push('/login')
      return
    }

    const res = await api.get(`/user/${userId}`)
    username.value = res.data.username || res.data.anon_username
    email.value = res.data.email
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