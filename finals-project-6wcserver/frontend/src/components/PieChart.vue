<template>
  <div class="flex items-center justify-center">
    <div class="h-64 w-64">
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
  others: { type: Number, default: 4 }
})

const chartData = computed(() => ({
  labels: ['Food', 'Transportation', 'Leisure', 'Others'],
  datasets: [
    {
      label: 'Expenses',
      backgroundColor: ['#8BC34A', '#3ABEFF', '#FFCF4D', '#FF3C38'],
      data: [props.food, props.transportation, props.leisure, props.others],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>


