<template>
  <header
    class="relative bg-gradient-to-r from-sky-900 via-indigo-800 to-sky-700 text-white shadow-lg"
  >
    <!-- Glowing Accent -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(255,255,255,0.1),_transparent_70%)] animate-glow"
    ></div>

    <!-- Centered Logo -->
    <div
      class="relative z-10 flex justify-center items-center py-6"
    >
      <img
        src="@/assets/logo.png"
        alt="Iponly Logo"
        class="h-16 md:h-20 w-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 transition-transform duration-300"
      />
    </div>
  </header>
</template>

<script setup>
// Static header — no logic needed
</script>

<style scoped>
@keyframes glow {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
.animate-glow {
  animation: glow 6s ease-in-out infinite;
}
</style>
