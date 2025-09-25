<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden relative">
    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-6 pb-24">
      <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>

      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6 space-y-4">
        <!-- Profile Icon -->
        <div class="flex justify-center">
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
          <div class="flex items-center space-x-2">
            <input
              type="text"
              v-model="username"
              class="flex-grow px-3 py-2 border rounded-md text-sm text-gray-800"
            />
            <button
              @click="updateUsername"
              class="text-gray-500 hover:text-gray-700"
              title="Edit Username"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value="ahanmeli16@gmail.com"
            class="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            readonly
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="flex items-center space-x-2">
            <input
              type="password"
              value="********"
              class="flex-grow px-3 py-2 border rounded-md text-sm text-gray-800"
              readonly
            />
            <router-link
              to="/password"
              class="px-3 py-2 bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 transition"
            >
              Change
            </router-link>
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
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">Remain Anonymous</label>
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

        <!-- Log Out Button -->
        <div class="pt-4">
          <button
            class="w-full py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
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
      <p class="text-center text-gray-800 font-medium">Username is already taken.</p>
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
  name: 'Profile',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isAnonymous: false,
      generatedUsername: '',
      username: 'danielakatsaye',
      showSuccess: false,
      showError: false
    };
  },
  methods: {
    handleAnonymousToggle() {
      this.isAnonymous = !this.isAnonymous;
      if (this.isAnonymous) {
        const adjectives = ['Sunny', 'Brave', 'Gentle', 'Swift', 'Clever', 'Bold'];
        const nouns = ['Tiger', 'Falcon', 'Pine', 'River', 'Moon', 'Echo'];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomNumber = Math.floor(Math.random() * 1000);
        this.generatedUsername = `${randomAdjective}${randomNoun}${randomNumber}`;
      } else {
        this.generatedUsername = '';
      }
    },
    updateUsername() {
      // Simulate taken username
      if (this.username.toLowerCase() === 'takenuser') {
        this.showError = true;
        this.showSuccess = false;
      } else {
        this.showSuccess = true;
        this.showError = false;
      }
    }
  }
};
</script>