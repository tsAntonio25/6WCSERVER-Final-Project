<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
<!-- Top Background -->
<img
  src="@/assets/bg3login.png"
  alt="Top Background"
  class="absolute top-0 left-0 
         w-2/3 sm:w-1/5 md:w-1/5 lg:w-1/9 object-contain"
/>

<!-- Bottom Background -->
<img
  src="@/assets/bg2login.png"
  alt="Bottom Background"
  class="absolute bottom-0 left-0 
         w-full sm:w-3/5 md:w-2/5 lg:w-1/5 object-cover"
/>


    <!-- Login content -->
    <div class="relative z-10 w-full max-w-md px-8 py-10">
      <h1 class="text-center text-2xl font-bold text-indigo-950">
        Log In
      </h1>
      <p class="text-center text-gray-700 mt-2">
        Your wallet’s waiting — let’s turn today into another win.
      </p>

      <!--FORM -->
      <form class="mt-6 space-y-4" @submit.prevent="checkLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="block w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="block w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <!-- Dapat pag nasubmit machecheck sa database then once na andun account then it would proceed to next page which is dashboard -->
        <button type="submit" class="block w-full text-center bg-sky-900 text-white py-2 rounded hover:bg-blue-800 transition">Sign In</button>
      </form>

      <!-- error -->
      <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>


      <!-- route to register  -->
      <div class="text-center mt-4">
        <router-link to="/register" class="text-sm text-gray-700 hover:underline">Create new account</router-link>

      </div>
    </div>
  </div>
</template>

<script setup>
// wait
import { ref } from "vue";
import { useRouter } from "vue-router";

// initialize vars
const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

// check login
const checkLogin = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/login", { // modify pa url
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }), // modify
    });

    const data = await res.json();

    // modify to
    if (!res.ok) {
      error.value = data.message || "Login failed";
      return;
    }

    // save token
    localStorage.setItem("token", data.token);

    // go to dashboard if okay
    router.push("/dashboard");

    // catch error
  } catch (err) {
    error.value = "Something went wrong. Please try again.";
    console.error(err);
  }
};
</script>