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
      <!-- added axios (v-model)-->
      <form class="mt-6 space-y-4" @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="block w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="block w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <!-- ito na bago pacheck po  -->
        <button 
        type="submit" 
        class="block w-full text-center bg-sky-900 text-white py-2 rounded hover:bg-blue-800 transition"
        > Sign In 
        </button>
      </form>

      <!-- error -->
      <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

      <!-- pinalitan kong router link??  -->
      <div class="text-center mt-4">
          <router-link to="/register" class="text-sm text-gray-700 hover:underline"> Create new account </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// wala pa to di pa gumagana??
// joke bat gumana bigla

/*
import axios from 'axios';

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
   async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        });
        console.log('Login successful:', response.data);

        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error);
        alert(error.response?.data?.error || 'An error occurred. Please try again.');
      }
    },
  }
};
*/

// imports
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// initializes
const email = ref("")
const password = ref("")
const error = ref("")
const router = useRouter()

// method
const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/login', {
          email: email.value,
          password: password.value,
    });

    // testing
    console.log('Login successful:', res.data);

    // store token
    localStorage.setItem('token', res.data.token);

    // route to dashboard
    router.push('/dashboard');
    
  } catch (err) {
    if (err.res) {
      error.value = err.response.data.message || "Login Failed."
    } else {
      error.value = "Something went wrong. Please try again."
    }
  }
}


</script>