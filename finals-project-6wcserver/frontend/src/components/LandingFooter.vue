<template>
  <footer
    class="relative bg-gradient-to-r from-sky-900 via-indigo-800 to-sky-700 text-white py-8 mt-10"
  >
    <!-- Subtle glow effect -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_rgba(255,255,255,0.1),_transparent_70%)] animate-glow"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-2">
      <p class="text-base sm:text-lg font-semibold tracking-wide">
        Join the budgeting adventure today!
      </p>
      <p class="text-sm opacity-90">
        © 2025 Iponly — Every Peso Counts, Every Level Matters.
      </p>
    </div>
  </footer>
</template>

<script setup>
// Static footer — no logic needed
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
