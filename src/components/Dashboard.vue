<template>
  <div>
    <h1>Dashboard</h1>
    <p>Chart.js + Vue.js dashboard</p>
    <bar-graph :chartData="dataCollection" :width="250" :height="250"></bar-graph>
    <input type="text" v-model="testVal" v-on:keyup.enter="fillData()">
  </div>
</template>

<script>
  import barGraph from './barGraph'
  export default {
    components: {
      'bar-graph': barGraph
    },
    data () {
      return {
        dataCollection: null,
        testVal: 100
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.dataCollection = {
          labels: ['data1'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [100]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1))
      }
    }
  }
</script>

<style scoped>
  
</style>
