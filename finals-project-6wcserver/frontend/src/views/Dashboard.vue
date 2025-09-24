<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="p-8">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 sm:px-8 py-6 space-y-8">
      <!-- Total Savings -->
      <section class="bg-indigo-950 text-white rounded-lg p-4 sm:p-6 shadow-md">
        <h2 class="text-lg sm:text-xl font-semibold">Total Savings:</h2>
      </section>

      <!-- Graph Placeholder with Background Card -->
        <section class="bg-gray-100 rounded-lg p-6 shadow-inner w-full sm:max-w-lg mx-auto">
            <div class="flex justify-center">
                <div class="h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border border-gray-300">
                Graph Coming Soon
                </div>
            </div>
        </section>

      <!-- Expenses Section -->
      <section class="text-center space-y-4">
        <h3 class="text-lg font-semibold">Expenses</h3>
        <p class="text-sm text-gray-600">
          No records yet.<br />
          Start tracking your first budget or expense today!
        </p>
        
        
        <router-link
            to="/finance"
            class="hidden sm:inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md shadow-sm transition"
            >
            Take me there!
        </router-link>
        
      </section>
    </div>

    <!-- Mobile-only footer fixed at bottom -->
    <div class="sm:hidden fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </div>

    <!-- Piggy Bank Image: centered on mobile, bottom-left on desktop -->
    <div class="fixed bottom-16 sm:bottom-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-0">
    <img
        src="@/assets/dashboardbg.png"
        alt="Piggy Bank"
        class="h-45 w-auto sm:h-32 lg:h-100 lg:w-100"
    />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer
  }
};
</script>