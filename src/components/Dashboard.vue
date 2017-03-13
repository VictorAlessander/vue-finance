<template>
  <div>
    <h1>Dashboard</h1>
    <p>Chart.js + Vue.js dashboard</p>
    <pie-chart></pie-chart>
  </div>
</template>

<script>
  import LineGraph from './LineGraph'
  import PieChart from './PieChart'
  export default {
    data () {
      return {}
    },
    methods: {

    },
    components: {
      'line-graph': LineGraph,
      'pie-chart': PieChart
    }
  }
</script>

<style scoped>
  
</style>
