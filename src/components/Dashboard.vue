<template>
  <div>
    <h1>Dashboard</h1>
    <p>Chart.js + Vue.js dashboard</p>
    <input type="text" v-model="mess" v-on:keyup.enter="repeat()">
    <test :message="mess"></test>
    <tfsa></tfsa> 
  </div>
</template>

<script>
  import barGraph from './barGraph'
  import TFSA from './TFSA'
  import Test from './Test'
  export default {
    data () {
      return {
        mess: 'hello world'
      }
    },
    components: {
      'bar-graph': barGraph,
      'tfsa': TFSA,
      'test': Test
    },
    methods: {
      repeat: function () {
        this.mess += ' test'
      }
    }
  }
</script>

<style scoped>
  
</style>

