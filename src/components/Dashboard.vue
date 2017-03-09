<template>
  <div>
    <h1>Dashboard</h1>
    <p>Chart.js + Vue.js dashboard</p>
    <line-graph></line-graph>
  </div>
</template>

<script>
  import LineGraph from './LineGraph'
  export default {
    data () {
      return {}
    },
    methods: {

    },
    components: {
      'line-graph': LineGraph
    }
  }
</script>

<style scoped>
  
</style>
