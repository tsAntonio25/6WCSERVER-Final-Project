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

      <form class="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          class="block w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          type="password"
          placeholder="Password"
          class="block w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <!-- Dapat pag nasubmit machecheck sa database then once na andun account then it would proceed to next page which is dashboard -->
        <router-link 
          to="/dashboard"
          class="block w-full text-center bg-sky-900 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          Sign In
        </router-link>
      </form>

      <div class="text-center mt-4">
        <a href="#" class="text-sm text-gray-700 hover:underline">Create new account</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};

</script>