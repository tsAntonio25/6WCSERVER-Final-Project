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
      <form class="mt-6 space-y-4">
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

      <!-- Go back to login -->
      <div class="text-center mt-4">
        <a href="/login" class="text-sm text-gray-700 hover:underline">Already have an account</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async submit(){
      if (this.password !== this.confirm){
        // sabi mo wag alert ikaw nlng magpalit tnx
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post('http://localhost:300/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });

        console.log('Signup successful:', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : error);
        alert(error.response?.data?.message || "An error occurred");
      }
    }
  }
};
</script>