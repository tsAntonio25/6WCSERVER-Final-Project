<template>
  <div class="rounded-3xl p-4 sm:p-8 bg-sky-50 flex flex-col justify-center items-center">
    <h2 class="text-xl sm:text-3xl font-extrabold text-sky-900 mb-4 text-center">
      Weekly Expenses
    </h2>
    <div class="w-full h-[250px] sm:h-[360px]">
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  labels: { type: Array, required: true },
  data: { type: Array, required: true }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Expenses',
      data: props.data,
      backgroundColor: 'rgba(37, 99, 235, 0.8)',
      borderRadius: 12,
      barThickness: 'flex',
      borderSkipped: false
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#0c4a6e',
        font: {
          size: window.innerWidth < 640 ? 10 : 12,
          weight: 'bold'
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(59, 130, 246, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(59, 130, 246, 0.7)',
        font: {
          size: window.innerWidth < 640 ? 10 : 12
        },
        callback: (value) => (value >= 1000 ? value / 1000 + 'k' : value)
      }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e40af',
      titleColor: '#fff',
      bodyColor: '#fff',
      callbacks: {
        label: (context) => `₱${context.formattedValue}`
      }
    }
  }
}
</script>

<style scoped>
div {
  transition: all 0.3s ease;
}
</style>
