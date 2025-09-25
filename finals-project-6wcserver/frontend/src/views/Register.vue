<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
    <!-- Top Background -->
    <img
      src="@/assets/registerbg2.png"
      alt="Top Background"
      class="absolute top-0 right-0 w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5 object-contain"
    />

    <!-- Bottom Background -->
    <img
      src="@/assets/registerbg.png"
      alt="Bottom Background"
      class="absolute bottom-0 left-0 w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/5 object-contain"
    />

    <!-- Register content -->
    <div class="relative z-10 w-full max-w-md px-6 py-10">
      <h1 class="text-center text-2xl font-bold text-indigo-950">
        Create Account
      </h1>
      <p class="text-center text-gray-700 mt-2">
        Be part of the community where saving is a game and progress is the prize.
      </p>

      <!-- FORM HERE -->
      <form @submit.prevent="submit" class="mt-6 space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <!-- SUBMIT -->
        <button
          type="submit"
          class="w-full bg-sky-800 text-white py-2 rounded hover:bg-sky-900 transition"
        >
          Sign Up
        </button>
      </form>

      <!-- error -->
      <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

      <!-- Go back to login -->
      <div class="text-center mt-4">
        <a href="/login" class="text-sm text-gray-700 hover:underline">Already have an account</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// initializes
const email = ref("")
const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref("")
const router = useRouter()

// method
const submit = async () => {

  // check if password match with confirm password
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match."
    return
  }

  // add credentials to db
  try {
    const response = await axios.post('http://localhost:3000/signup', {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    // testing
    console.log('Signup successful:', response.data)

    // route to login
    router.push('/login')

    // if error
  } catch (err) {
    console.error('Signup failed:', err.response ? err.response.data : error);
    error.value = err.response.data.message || "An error occured."
    
  }
}
</script>