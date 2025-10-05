<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden overflow-y-auto relative">
    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-6">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-6 py-6">
      <h1 class="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h1>

      <div class="max-w-md w-full mx-auto bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col justify-between min-h-[32rem]">
        <!-- Form Section -->
        <div class="space-y-6">
          <!-- Current Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              v-model="currentPassword"
              placeholder="Enter current password"
              class="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div class="relative">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
                placeholder="Enter new password"
                class="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
              />
              <button
                type="button"
                @click="toggleNewPassword"
                class="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {{ showNewPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Generated Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Generated Username</label>
            <input
              type="text"
              :value="generatedUsername"
              class="w-full px-3 py-2 border rounded-md text-sm text-gray-800 italic"
              readonly
            />
          </div>

          <!-- Remain Anonymous Toggle -->
          <div class="flex justify-end">
            <button
              @click="handleAnonymousToggle"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300',
                isAnonymous ? 'bg-sky-600' : 'bg-gray-300'
              ]"
            >
              <span
                :class="[
                  'inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300',
                  isAnonymous ? 'translate-x-5' : 'translate-x-1'
                ]"
              ></span>
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 flex justify-end gap-3">
            <button
              @click="resetFields"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-400 transition"
            >
              Reset
            </button>

            <button
              @click="updatePassword"
              class="px-4 py-2 bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>

        <!-- Back + Delete Buttons -->
        <div class="pt-6 pb-16 sm:pb-0 flex justify-between">
          <router-link
            to="/profile"
            class="inline-block px-4 py-2 bg-sky-500 text-white text-sm rounded-md hover:bg-sky-600 transition"
          >
            ← Back
          </router-link>

        <button
          @click="showDeleteConfirm = true"
          class="inline-block px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
        >
          Delete Account
        </button>

        </div>

      </div>
    </div>

<!-- Success Popup Overlay -->
<div
  v-if="showSuccess"
  class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
>
  <!-- Popup Box -->
  <div class="relative bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-6">
    <!-- Close Button -->
    <div class="absolute top-2 right-2">
      <button @click="showSuccess = false" class="text-gray-500 hover:text-gray-700 text-lg">×</button>
    </div>

    <!-- Check Icon -->
    <div class="flex justify-center mb-4">
      <div class="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          class="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <!-- Message -->
    <p class="text-center text-gray-800 font-medium">Updated successfully!</p>
  </div>
</div>


<!-- Error Popup Overlay -->
<div
  v-if="showError"
  class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
>
  <!-- Popup Box -->
  <div class="relative bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-6">
    <!-- Close Button -->
    <div class="absolute top-2 right-2">
      <button @click="showError = false" class="text-gray-500 hover:text-gray-700 text-lg">×</button>
    </div>

    <!-- Error Icon -->
    <div class="flex justify-center mb-4">
      <div class="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center">
        <svg
          class="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <!-- Message -->
    <p class="text-center text-gray-800 font-medium">Something went wrong. Please try again.</p>
  </div>
</div>


<!-- Delete Confirmation Popup Overlay -->
<div
  v-if="showDeleteConfirm"
  class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
>
  <!-- Popup Box -->
  <div class="relative bg-white border border-yellow-300 rounded-lg shadow-lg w-96 p-6">
    <!-- Close Button -->
    <div class="absolute top-2 right-2">
      <button @click="showDeleteConfirm = false" class="text-gray-500 hover:text-gray-700 text-lg">×</button>
    </div>

    <!-- Warning Image -->
    <div class="flex justify-center mb-4">
      <img
        src="@/assets/warningsign.png"
        alt="Warning Symbol"
        class="h-16 w-16 object-contain"
      />
    </div>

    <!-- Text -->
    <h2 class="text-lg font-bold text-center text-gray-800 mb-2">Delete Account?</h2>
    <p class="text-sm text-center text-gray-600 mb-6">
      Are you sure you want to delete your account? This action is permanent, and all your data, history, and progress will be lost.
    </p>

    <!-- Buttons -->
    <div class="flex justify-between">
      <button
        @click="showDeleteConfirm = false"
        class="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
      >
        Cancel
      </button>

      <button
        @click="confirmDelete"
        class="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
      >
        Yes, Delete My Account
      </button>
    </div>
  </div>
</div>


<!-- Account Deleted Success Popup Overlay -->
<div
  v-if="showAccountDeleted"
  class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
>
  <!-- Popup Box -->
  <div class="relative bg-white border border-green-300 rounded-lg shadow-lg w-80 p-6">
    <!-- Close Button -->
    <div class="absolute top-2 right-2">
      <button @click="showAccountDeleted = false" class="text-gray-500 hover:text-gray-700 text-lg">×</button>
    </div>

    <!-- Green Checkmark Icon -->
    <div class="flex justify-center mb-4">
      <div class="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          class="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <!-- Message -->
    <p class="text-center text-gray-800 font-medium">Account has been deleted.</p>
  </div>
</div>




    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>
  </div>

  
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import api from '@/api/axios.js'

// router
const router = useRouter()

// states
const currentPassword = ref('')
const newPassword = ref('')
const showNewPassword = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const isAnonymous = ref(false)
const generatedUsername = ref('')
const showDeleteConfirm = ref(false)
const showAccountDeleted = ref(false)

// methods
const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value
}

const resetFields = () => {
  currentPassword.value = ''
  newPassword.value = ''
  showNewPassword.value = false
  isAnonymous.value = false
  generatedUsername.value = ''
}

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

    showSuccess.value = true
    showError.value = false
    resetFields()
  } catch (err) {
    console.error(err)
    showError.value = true
    showSuccess.value = false
  }
}

const handleAnonymousToggle = () => {
  isAnonymous.value = !isAnonymous.value
  if (isAnonymous.value) {
    const adjectives = ['Sunny', 'Brave', 'Gentle', 'Swift', 'Clever', 'Bold']
    const nouns = ['Tiger', 'Falcon', 'Pine', 'River', 'Moon', 'Echo']
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomNumber = Math.floor(Math.random() * 1000)
    generatedUsername.value = `${randomAdjective}${randomNoun}${randomNumber}`
  } else {
    generatedUsername.value = localStorage.getItem('username') || ''
  }
}

const confirmDelete = async () => {
  try {
    const userId = localStorage.getItem('userId')
    if (!userId) return

    await api.delete(`/user/self/${userId}`)

    showDeleteConfirm.value = false
    showAccountDeleted.value = true

    // clear local storage
    localStorage.clear()

    // redirect after 2s
    setTimeout(() => {
      router.push('/') 
    }, 2000)
  } catch (err) {
    console.error('Failed to delete account:', err)
    showError.value = true
  }
}
</script>