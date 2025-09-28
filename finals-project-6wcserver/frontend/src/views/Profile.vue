<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden relative">
    <!-- Header -->
    <div class="pt-20 sm:pt-24 px-4 sm:px-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-6">
      <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>

      <div class="max-w-md mx-auto bg-white rounded-lg shadow pt-10 pb-6 px-6 space-y-4 relative">
        <!-- Edit + Admin Dashboard Buttons -->
        <div class="flex justify-end gap-3">
        <router-link
            to="/password"
            class="px-4 py-2 bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 transition"
        >
            Edit
        </router-link>

        <router-link
            v-if="isAdmin"
            to="/admindash"
            class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
        >
            Admin
        </router-link>
        </div>

        <!-- Profile Icon -->
        <div class="flex justify-center mt-2">
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
          <span class="text-sm text-gray-800">{{ username }}</span>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <span class="text-sm text-gray-800">{{ email }}</span>
        </div>

        <!-- Log Out Button -->
        <div class="mt-6">
        <button
            @click="logout"
            class="w-full py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
        >
            Log Out
        </button>
        </div>
      </div>
    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>
  </div>
</template>

<script>

// rewrite into script setup 

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import api from "@/api/axios";

export default {
  name: 'Profile',
  components: { Header, Footer },
  data() {
    return {
      username: '',
      email: '',
      isAdmin: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const userId = localStorage.getItem("userId");
        const adminFlag = localStorage.getItem("is_admin") === "true";
        this.isAdmin = adminFlag;

        console.log("UserId from localStorage:", userId);

        if (!userId) {
          this.$router.push("/login");
          return;
        }

        const res = await api.get(`/user/${userId}`);
        console.log("Fetched user:", res.data);

        this.username = res.data.username || res.data.anon_username;
        this.email = res.data.email;
      } catch (err) {
        console.error("Fetch user error:", err.response ? err.response.data : err.message);
        alert("Fetch user failed: " + (err.response?.data?.message || err.message));
        this.$router.push("/login");
    }
    },
    logout() {
      // after logging out, tokens, username, userid stored will be cleared
      localStorage.clear();
      this.$router.push("/").then(() => {
        location.reload;
      });
    },
  }
};
</script>