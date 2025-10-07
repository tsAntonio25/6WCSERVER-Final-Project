<template>
  <div class="min-h-screen flex flex-col md:flex-row overflow-hidden">
    <!-- LEFT SIDE (Desktop only) -->
    <div
      class="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-800 via-indigo-700 to-sky-600 items-center justify-center relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633158829581-23ba8d80a4c9?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20"
      ></div>
      <div class="relative z-10 text-center text-white p-10 animate-fade-in flex flex-col items-center">
        <!-- Logo -->
        <img src="@/assets/logo.png" alt="Iponly Logo" class="w-48 h-48 mb-6 object-contain drop-shadow-2x1" />

        <h1 class="text-4xl font-extrabold mb-4 drop-shadow-lg">Welcome to Iponly</h1>
        <p class="text-lg text-indigo-100 max-w-md mx-auto leading-relaxed">
          Manage your finances smartly and securely. Your next win starts with a single login.
        </p>
      </div>
    </div>

    <!-- 🌈 MOBILE HEADER (App-like) -->
    <div
      class="md:hidden bg-gradient-to-br from-sky-900 via-indigo-800 to-sky-700 text-white text-center py-14 px-6 relative overflow-hidden"
    >
      <!-- Animated Gradient Glow -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15),_transparent_60%)] animate-glow"
      ></div>
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633158829581-23ba8d80a4c9?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-10"
      ></div>

      <div class="relative z-10 flex flex-col items-center animate-slide-up">
        <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-float mb-4 border border-white/30">
          <img :src="userImage" alt="User Icon" class="w-10 h-10 object-cover" />
        </div>

        <h1 class="text-4xl font-extrabold tracking-wide drop-shadow-lg mb-1">Welcome Back</h1>
        <p class="text-indigo-100 text-sm font-light tracking-wide">
          Smart. Secure. Simple.
        </p>
      </div>
    </div>

    <!-- RIGHT SIDE (Login Form) -->
<div
  class="flex-1 flex items-center justify-center bg-white relative 
  rounded-t-[2rem] md:rounded-none shadow-lg transition-all duration-300 
  -mt-7 overflow-visible"
>




      <!-- Decorative Background Circles -->
      <div
        class="absolute w-64 h-64 md:w-96 md:h-96 bg-sky-200 rounded-full blur-3xl top-[-15%] left-[-15%] opacity-40"
      ></div>
      <div
        class="absolute w-64 h-64 md:w-96 md:h-96 bg-indigo-200 rounded-full blur-3xl bottom-[-15%] right-[-15%] opacity-40"
      ></div>

      <!-- Login Card -->
      <div
        class="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl px-6 py-8 md:px-8 md:py-10 mx-4 animate-fade-up"
      >
        <div class="text-center mb-6">
        <div class="hidden md:flex mx-auto w-16 h-16 bg-sky-900 rounded-full items-center justify-center shadow-md overflow-hidden">
          <img :src="userImage" alt="User Icon" class="w-10 h-10 object-cover" />
        </div>

          <h1 class="mt-4 text-2xl md:text-3xl font-bold text-sky-900">Log In</h1>
          <p class="text-gray-600 mt-2 text-sm md:text-base">
            Your wallet’s waiting — let’s turn today into another win.
          </p>
        </div>

        <!-- FORM -->
        <form class="mt-6 space-y-4" @submit.prevent="login">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm md:text-base"
            required
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm md:text-base"
            required
          />

          <button
            type="submit"
            class="block w-full text-center bg-gradient-to-r from-sky-900 to-indigo-800 text-white py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md font-semibold text-sm md:text-base"
          >
            Sign In
          </button>
        </form>

        <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>

        <div class="text-center mt-5">
          <router-link
            to="/register"
            class="text-sm text-sky-900 hover:underline font-medium"
          >
            Create new account
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
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  try {
    const res = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("is_admin", res.data.is_admin);

    router.push("/dashboard");
  } catch (err) {
    if (err.res) {
      error.value = err.response.data.message || "Login Failed.";
    } else {
      error.value = "Something went wrong. Please try again.";
    }
  }
};
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}
@keyframes glow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
.animate-glow {
  background-size: 200% 200%;
  animation: glow 6s ease infinite;
}
.animate-fade-in {
  animation: fade-in 1.2s ease forwards;
}
.animate-fade-up {
  animation: fade-up 0.8s ease forwards;
}
.animate-slide-up {
  animation: fade-up 1.2s ease forwards;
}
</style>
