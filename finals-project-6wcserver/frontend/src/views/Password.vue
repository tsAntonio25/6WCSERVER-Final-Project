<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden overflow-y-auto relative">
    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-6">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-6 py-6">
      <h1 class="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Change Password</h1>

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

            <!-- Right-Aligned Buttons -->
            <div class="mt-4 flex justify-end gap-3">
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
        </div>

        <!-- Back Button -->
        <div class="pt-6">
          <router-link
            to="/profile"
            class="inline-block px-4 py-2 bg-sky-500 text-white text-sm rounded-md hover:bg-sky-600 transition"
          >
            ← Back
          </router-link>
        </div>
      </div>
    </div>

    <!-- Success Popup -->
    <div
      v-if="showSuccess"
      class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-6"
    >
      <div class="absolute top-2 right-2">
        <button @click="showSuccess = false" class="text-gray-500 hover:text-gray-700 text-lg">×</button>
      </div>
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
      <p class="text-center text-gray-800 font-medium">Username changed successfully!</p>
    </div>
    <!-- Error Popup -->
    <div
    v-if="showError"
    class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-6"
    >
    <div class="absolute top-2 right-2">
        <button @click="showError = false" class="text-gray-500 hover:text-gray-700 text-lg">×</button>
    </div>
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
    <p class="text-center text-gray-800 font-medium">Something went wrong. Please try again.</p>
    </div>
    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Password',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      showNewPassword: false,
      showSuccess: false
    };
  },
  methods: {
    toggleNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    resetFields() {
      this.currentPassword = '';
      this.newPassword = '';
      this.showNewPassword = false;
    },
    updatePassword() {
      // Placeholder for actual update logic
      console.log('Password update triggered');
      this.showSuccess = true;
    }
  }
};
</script>