<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-sky-100 overflow-x-hidden relative">

    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-6">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-6 py-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-center text-sky-800 mb-6">Edit Profile</h1>

      <!-- Card Container -->
      <div class="max-w-md w-full mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col justify-between min-h-[32rem] space-y-6">

        <!-- Form Section -->
        <div class="space-y-5">
          <!-- Current Password -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              v-model="currentPassword"
              placeholder="Enter current password"
              class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-gray-800"
            />
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <div class="relative">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
                placeholder="Enter new password"
                class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-gray-800"
              />
              <button
                type="button"
                @click="toggleNewPassword"
                class="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-gray-700"
              >
                {{ showNewPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Generated Username -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Generated Username</label>
            <input
              type="text"
              :value="generatedUsername"
              class="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-800 italic bg-gray-50 cursor-not-allowed"
              readonly
            />
          </div>
<!-- Remain Anonymous with Info Icon on Left -->
<div class="flex items-center justify-end relative">
  <!-- ℹ️ Info Icon -->
  <div
    class="text-sky-600 hover:text-sky-800 cursor-pointer mr-2"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="handleInfoClick"
  >

    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  </div>

  <!-- Label -->
  <span class="mr-2 text-sm text-gray-600">Remain Anonymous</span>

  <!-- Toggle Switch -->
  <button
    @click="handleAnonymousToggle"
    :class="[
      'relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300',
      isAnonymous ? 'bg-sky-600' : 'bg-gray-300'
    ]"
  >
    <span
      :class="[
        'inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300',
        isAnonymous ? 'translate-x-6' : 'translate-x-1'
      ]"
    ></span>
  </button>

  <!-- 💬 Tooltip Bubble -->
  <transition name="fade">
    <div
      v-if="showAnonInfo"
      class="absolute left-0 top-8 bg-sky-50 border border-sky-300 text-sky-800
             text-xs sm:text-sm rounded-xl px-3 py-2 shadow-md w-56 sm:w-64 text-left z-50"
    >
      💡 <b>Anonymous Mode</b><br />
      When enabled, your username will be hidden and replaced with a random alias to keep your identity private.
    </div>
  </transition>
</div>



        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 mt-4">
          <button
            @click="resetFields"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition shadow-sm"
          >
            Reset
          </button>

          <button
            @click="updatePassword"
            class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition shadow-md"
          >
            Confirm
          </button>
        </div>

        <!-- Back + Delete Buttons -->
        <div class="flex justify-between pt-6">
          <router-link
            to="/profile"
            class="inline-block px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition shadow-sm"
          >
            ← Back
          </router-link>

          <button
            @click="showDeleteConfirm = true"
            class="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>

    <!-- Success Popup Overlay -->
    <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/25 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-80 p-6 relative text-center animate-scale-in">
        <button @click="showSuccess = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">×</button>
        <div class="flex justify-center mb-4">
          <div class="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
        <p class="text-gray-800 font-semibold">{{ successMessage }}</p>

      </div>
    </div>

    <!-- Error Popup Overlay -->
    <div v-if="showError" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/25 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-80 p-6 relative text-center animate-scale-in">
        <button @click="showError = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">×</button>
        <div class="flex justify-center mb-4">
          <div class="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>
        <p class="text-gray-800 font-semibold">Something went wrong. Please try again.</p>
      </div>
    </div>

    <!-- Delete Confirmation Overlay -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/25 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-96 p-6 relative text-center animate-scale-in">
        <button @click="showDeleteConfirm = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">×</button>
        <img src="@/assets/warningsign.png" class="h-16 w-16 mx-auto mb-4"/>
        <h2 class="text-lg font-bold text-gray-800 mb-2">Delete Account?</h2>
        <p class="text-sm text-gray-600 mb-6">
          Are you sure? This action is permanent, and all your data will be lost.
        </p>
        <div class="flex justify-between">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Cancel</button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Yes, Delete</button>
        </div>
      </div>
    </div>

    <!-- Account Deleted Overlay -->
    <div v-if="showAccountDeleted" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/25 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-80 p-6 relative text-center animate-scale-in">
        <button @click="showAccountDeleted = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">×</button>
        <div class="flex justify-center mb-4">
          <div class="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
        <p class="text-gray-800 font-semibold">Account has been deleted.</p>
      </div>
    </div>

    <!-- Mobile Footer -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>

  </div>
</template>

<style>
/* Subtle popup animation */
@keyframes scaleIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scale-in {
  animation: scaleIn 0.25s ease-out forwards;
}
</style>


<script setup>
//  Imports
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import api from '@/api/axios.js'

//  Router
const router = useRouter()

//  State variables
const currentPassword = ref('')
const newPassword = ref('')
const showNewPassword = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const isAnonymous = ref(false)
const generatedUsername = ref('')
const showDeleteConfirm = ref(false)
const showAccountDeleted = ref(false)
const successMessage = ref('')
const showAnonInfo = ref(false)

//  Detect screen size (mobile vs desktop)
const isMobile = ref(window.innerWidth < 640)

const handleResize = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

//  Password visibility toggle
const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value
}

//  Reset form fields
const resetFields = () => {
  currentPassword.value = ''
  newPassword.value = ''
  showNewPassword.value = false
  isAnonymous.value = false
  generatedUsername.value = ''
}

//  Update password / profile
const updatePassword = async () => {
  try {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      showError.value = true
      return
    }

    await api.put(`/user/${userId}`, {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      anon_username: isAnonymous.value
        ? generatedUsername.value
        : localStorage.getItem('username')
    })

    successMessage.value = newPassword.value
      ? 'Password changed successfully!'
      : 'Profile updated successfully!'

    showSuccess.value = true
    showError.value = false
    resetFields()
  } catch (err) {
    console.error(err)
    showError.value = true
    showSuccess.value = false
  }
}

//  Anonymous toggle logic
const handleAnonymousToggle = () => {
  isAnonymous.value = !isAnonymous.value

  if (isAnonymous.value) {
    const adjectives = ['Sunny', 'Brave', 'Gentle', 'Swift', 'Clever', 'Bold']
    const nouns = ['Tiger', 'Falcon', 'Pine', 'River', 'Moon', 'Echo']
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomNumber = Math.floor(Math.random() * 1000)
    generatedUsername.value = `${randomAdjective}${randomNoun}${randomNumber}`

    successMessage.value = 'Anonymous mode turned ON.'
  } else {
    generatedUsername.value = localStorage.getItem('username') || ''
    successMessage.value = 'Anonymous mode turned OFF.'
  }

  showSuccess.value = true
}

//  Account deletion
const confirmDelete = async () => {
  try {
    const userId = localStorage.getItem('userId')
    if (!userId) return

    await api.delete(`/user/self/${userId}`)

    showDeleteConfirm.value = false
    showAccountDeleted.value = true
    localStorage.clear()

    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err) {
    console.error('Failed to delete account:', err)
    showError.value = true
  }
}

//  Tooltip logic
const toggleAnonInfo = () => {
  showAnonInfo.value = !showAnonInfo.value
}

const handleMouseEnter = () => {
  if (!isMobile.value) showAnonInfo.value = true
}

const handleMouseLeave = () => {
  if (!isMobile.value) showAnonInfo.value = false
}

const handleInfoClick = () => {
  if (isMobile.value) toggleAnonInfo()
}
</script>
