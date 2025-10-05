<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Landing Header -->
    <LandingHeader />



    <!-- Hero Section -->
    <section class="text-center px-4 sm:px-8 py-10 space-y-4 relative z-10">
    <h1 class="text-3xl sm:text-4xl font-bold text-blue-700">Save Smart, Level Up</h1>
    <p class="text-base sm:text-lg text-gray-700 max-w-xl mx-auto">
        Make budgeting fun and rewarding. Record your spending, grow your funds, and see how you rank against friends.
    </p>
    <router-link
    to="/home"
    class="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
    Ready, Set, Save!
    </router-link>

    </section>
<!-- Layered Tail + How It Works Section -->
<div class="w-full relative min-h-[48em] pb-32">
  <!-- Tail Image -->
  <img
    src="@/assets/landing1.png"
    alt="Top Tail"
    class="ml-0 w-[85%] max-w-[1000px] object-contain"
  />

  <!-- Layered How It Works Content -->
  <section class="absolute top-50 left-0 w-full px-4 sm:px-8 z-10">

    <h2 class="text-5xl font-bold text-violet-950 text-center mb-6">
      How it works
    </h2>

    <div class="flex flex-col-reverse lg:flex-row items-center gap-8 max-w-6xl mx-auto">
      <!-- Illustration -->
      <div class="flex-shrink-0">
        <img
          src="@/assets/landing2.png"
          alt="Person Illustration"
          class="h-72 w-auto sm:h-80 lg:h-[22rem]"
        />
      </div>

      <!-- Text Content -->
      <div class="flex flex-col justify-center items-center text-center space-y-4 max-w-xl">
        <p class="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Ponly turns saving into a game. Add your budget and expenses, build streaks, and earn XP as you stay consistent.
          Climb the leaderboard and watch your savings grow with every level.
        </p>
      </div>
    </div>
  </section>
</div>


<!-- Layered Bottom Tail + Gamified Features Section -->
<div class="w-full relative lg:min-h-[55rem] pb-32">
  <!-- Gamified Features Section -->
  <section class="w-full px-4 sm:px-8 pt-28 lg:pt-32 z-10">
    <h2 class="text-4xl sm:text-5xl font-bold text-center text-violet-950 mb-12">
      Gamified budgeting for students
    </h2>

    <div class="flex flex-wrap justify-center gap-12 sm:gap-16">
      <!-- Feature 1 -->
      <div class="flex flex-col items-center space-y-5 text-center max-w-[300px] sm:max-w-[360px]">
        <img
          src="@/assets/landing3.png"
          alt="Track with ease"
          class="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full object-contain border-4 border-sky-600"
        />
        <p class="text-2xl sm:text-3xl font-bold text-sky-400 tracking-wide">Track with ease</p>
      </div>

      <!-- Feature 2 -->
      <div class="flex flex-col items-center space-y-5 text-center max-w-[300px] sm:max-w-[360px]">
        <img
          src="@/assets/landing4.png"
          alt="Save & grow"
          class="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full object-contain border-4 border-sky-600"
        />
        <p class="text-2xl sm:text-3xl font-bold text-sky-400 tracking-wide">Save & grow</p>
      </div>

      <!-- Feature 3 -->
      <div class="flex flex-col items-center space-y-5 text-center max-w-[300px] sm:max-w-[360px]">
        <img
          src="@/assets/landing5.png"
          alt="Compete & win"
          class="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full object-contain border-4 border-sky-600"
        />
        <p class="text-2xl sm:text-3xl font-bold text-sky-400 tracking-wide">Compete & win</p>
      </div>
    </div>
  </section>

  <!-- Tail Image Container -->
  <div class="mt-20 lg:mt-0">
    <img
      src="@/assets/landing6.png"
      alt="Bottom Tail"
      class="w-[85%] max-w-[1000px] object-contain ml-auto lg:absolute lg:right-0 lg:bottom-0"
    />
  </div>
</div>









<!-- Call to Action -->
<section class="text-center px-4 sm:px-8 py-16 space-y-6">
  <h2 class="text-5xl font-bold text-violet-950">Get Started Now</h2>

  <router-link
    to="/register"
    class="inline-block px-8 py-4 bg-blue-500 text-white text-xl rounded-lg hover:bg-blue-600 transition"
  >
    Sign Up
  </router-link>

  <p class="text-lg text-gray-600 mt-4">Budget tracking app also available on:</p>
  
</section>




    <!-- Landing Footer -->
    <LandingFooter />
  </div>
</template>

<script setup>
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'
</script>
