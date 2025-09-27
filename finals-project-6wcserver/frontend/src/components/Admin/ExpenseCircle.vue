<template>
  <div class="flex flex-col items-center">
      <svg class="h-24 w-24" viewBox="0 0 100 100">
    <!-- Background Circle -->
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="currentColor"
      stroke-width="10"
      fill="none"
      class="text-gray-200"
    />

    <!-- Rotated Progress Circle -->
    <g transform="rotate(-90 50 50)">
      <circle
        cx="50"
        cy="50"
        r="40"
        :stroke="color"
        stroke-width="10"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
      />
    </g>

    <!-- Centered Text -->
    <text
      x="50"
      y="55"
      text-anchor="middle"
      dominant-baseline="middle"
      class="text-sm font-bold fill-current text-gray-800"
    >
      {{ percent }}%
    </text>
  </svg>
    <p class="mt-2 text-sm text-gray-600">{{ label }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  percent: Number,
  color: String
})

const radius = 40
const circumference = 2 * Math.PI * radius
const offset = computed(() => circumference * (1 - props.percent / 100))
</script>