<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] h-[320px] sm:h-[360px] md:h-[400px]">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  food: { type: Number, default: 1 },
  leisure: { type: Number, default: 2 },
  transportation: { type: Number, default: 3 },
  others: { type: Number, default: 4 },
})

const chartData = computed(() => ({
  labels: ['Food', 'Transportation', 'Leisure', 'Others'],
  datasets: [
    {
      label: 'Expenses',
      backgroundColor: [
        '#8BC34A', // Food
        '#3ABEFF', // Transportation
        '#FFCF4D', // Leisure
        '#FF3C38', // Others
      ],
      borderWidth: 2,
      borderColor: '#fff',
      hoverOffset: 10,
      data: [props.food, props.transportation, props.leisure, props.others],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 12,
        usePointStyle: true,
        color: '#374151',
        font: {
          size: 13,
          weight: '500',
        },
        padding: 15,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      titleColor: '#fff',
      bodyColor: '#e5e7eb',
      cornerRadius: 6,
      padding: 10,
    },
  },
  layout: {
    padding: { top: 10, bottom: 10, left: 10, right: 10 },
  },
}
</script>

<style scoped>
canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
