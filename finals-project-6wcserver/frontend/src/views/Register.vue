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
      <form class="mt-6 space-y-4" @submit.prevent="submitRegForm" enctype="multipart/form-data">>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model ="username"
          type="text"
          placeholder="Username"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="pass"
          type="password"
          placeholder="Password"
          class="block w-full border bg-blue-50 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="confpass"
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

      <!-- If there is error in inputted data -->
       <p v-if="error" class="text-red-500 text-sm mt-2 text-center" >{{ error }}</p>

      <!-- route to login -->
      <div class="text-center mt-4">
        <router-link to="/login" class="text-sm text-gray-700 hover:underline">Already have an account</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

// initialize
const router = useRouter()
const username = ref("")
const email= ref("")
const pass = ref("")
const confpass = ref("")
const error = ref("")

// process in submitting registration
const submitRegForm = async () => {
  try {
    // response
    const res = await fetch('/api/signup', { // modify url
      method: "POST",
      headers: "",
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: pass.value,
        confirmPassword: confpass.value
      })
    })

    // get response from backend
    const data = await res.json()

    // if there is error from backend
    if (!res.ok) {
      error.value = data.message || 'Sign up failed. Please try again.'
      return;
    }

    // route to log in 
    router.push("/login")
  }
  catch (err) {
    // catch error
    error.value = "Something went wrong. Please try again."
    console.error(err)
  }
}

</script>