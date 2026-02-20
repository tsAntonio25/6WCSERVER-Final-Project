<template>
  <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      <!-- LEFT SIDE (Desktop only) -->
      <div
        class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-sky-700 to-sky-500 items-center justify-center relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612831662375-295c1003d3be?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20"
        ></div>
        <div class="relative z-10 text-center text-white p-10 animate-fade-in flex flex-col items-center">
          <!-- Logo -->
          <img src="@/assets/logo.png" alt="Iponly Logo" class="w-48 h-48 mb-6 object-contain drop-shadow-2xl" />

          <h1 class="text-4xl font-extrabold mb-4 drop-shadow-lg">Join Iponly</h1>
          <p class="text-lg text-indigo-100 max-w-md mx-auto leading-relaxed">
            Start your journey towards smarter savings and better control over your finances.
          </p>
        </div>
      </div>


    <!-- 🌈 MOBILE HEADER -->
    <div
      class="lg:hidden bg-gradient-to-br from-indigo-800 via-sky-800 to-indigo-600 text-white text-center py-14 px-6 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(255,255,255,0.15),_transparent_60%)] animate-glow"
      ></div>
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612831662375-295c1003d3be?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-10"
      ></div>

      <div class="relative z-10 flex flex-col items-center animate-slide-up">
        <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-float mb-4 border border-white/30">
          <img :src="userImage" alt="User Icon" class="w-10 h-10 object-cover" />
        </div>

        <h1 class="text-4xl font-extrabold tracking-wide drop-shadow-lg mb-1">Iponly</h1>
        <p class="text-indigo-100 text-sm font-light tracking-wide">
          Join. Save. Achieve.
        </p>
      </div>
    </div>

    <!-- RIGHT SIDE (Register Form) -->
    <div
      class="flex-1 flex items-center justify-center bg-white relative 
      rounded-t-[2rem] lg:rounded-none shadow-lg transition-all duration-300 
      -mt-7 lg:mt-0 overflow-visible pb-10"
    >
      <!-- Decorative Circles -->
      <div
        class="absolute w-64 h-64 lg:w-96 lg:h-96 bg-indigo-200 rounded-full blur-3xl top-[-15%] left-[-15%] opacity-40"
      ></div>
      <div
        class="absolute w-64 h-64 lg:w-96 lg:h-96 bg-sky-200 rounded-full blur-3xl bottom-[-15%] right-[-15%] opacity-40"
      ></div>

      <!-- Register Card -->
      <div
        class="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl px-6 py-8 lg:px-8 lg:py-10 mx-4 animate-fade-up"
      >
        <div class="text-center mb-6">
          <div class="hidden lg:flex mx-auto w-16 h-16 bg-indigo-900 rounded-full items-center justify-center shadow-md overflow-hidden">
            <img :src="userImage" alt="User Icon" class="w-10 h-10 object-cover" />
          </div>

          <h1 class="mt-4 text-2xl lg:text-3xl font-bold text-indigo-950">Create Account</h1>
          <p class="text-gray-600 mt-2 text-sm lg:text-base">
            Be part of the community where saving is a game and progress is the prize.
          </p>
        </div>

        <!-- FORM -->
        <form @submit.prevent="submit" class="mt-6 space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="block w-full border border-gray-300 bg-blue-50 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm lg:text-base"
            required
          />
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="block w-full border border-gray-300 bg-blue-50 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm lg:text-base"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="block w-full border border-gray-300 bg-blue-50 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm lg:text-base"
            required
          />
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="block w-full border border-gray-300 bg-blue-50 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm lg:text-base"
            required
          />

          <!-- SUBMIT -->
          <button
            type="submit"
            class="block w-full text-center bg-gradient-to-r from-indigo-900 to-sky-800 text-white py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md font-semibold text-sm lg:text-base"
          >
            Sign Up
          </button>
        </form>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>

        <!-- Go back to login -->
        <div class="text-center mt-5">
          <router-link to="/login" class="text-sm text-indigo-900 hover:underline font-medium">
            Already have an account? Log in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import userImage from "@/assets/user.png";

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();

const submit = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  try {
    const response = await api.post("/api/signup", {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    console.log("Signup successful:", response.data);
    router.push("/login");
  } catch (err) {
    console.error("Signup failed:", err.response ? err.response.data : err);
    error.value = err.response?.data?.message || "An error occurred.";
  }
};
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float { animation: float 4s ease-in-out infinite; }
.animate-glow { background-size: 200% 200%; animation: glow 6s ease infinite; }
.animate-fade-in { animation: fade-in 1.2s ease forwards; }
.animate-fade-up { animation: fade-up 0.8s ease forwards; }
.animate-slide-up { animation: fade-up 1.2s ease forwards; }
</style>
