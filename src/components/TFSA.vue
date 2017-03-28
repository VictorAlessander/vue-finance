<template>
  <div>
    <h1>TFSA</h1>
    <table>
      <tr>
        <th>Year</th>
        <th>Amount</th>
      </tr>
      <tr v-for="contribution in contributions">
        <td>{{contribution.year}}</td>
        <td>{{contribution.amount | currency}}</td>
      </tr>
    </table>
    <div>
      <h3>Birth Year</h3>
      <input type="text" v-model="birthYear" v-on:keyup.enter="fillData()">
      <br>
      <h4>Your contribution limit is: {{contributionLimit}}</h4>
    </div>
    <div>
      <bar-graph :data="dataCollection" :height="250"></bar-graph>
    </div>
    <div>
      <input type="range" v-model="range"> 
      <h3>Range: {{range}}</h3>
      <doughnut-graph :data="donut"></doughnut-graph>
    </div>
    
  </div>
</template>

<script>
  import barGraph from './barGraph'
  import doughnutGraph from './Doughnut'
  export default {
    components: {
      'bar-graph': barGraph,
      'doughnut-graph': doughnutGraph
    },
    data () {
      return {
        test: 'hello world',
        range: 90,
        birthYear: 1993,
        contributions: [
          {year: 2009, amount: 5000},
          {year: 2010, amount: 5000},
          {year: 2011, amount: 5000},
          {year: 2012, amount: 5000},
          {year: 2013, amount: 5500},
          {year: 2014, amount: 5500},
          {year: 2015, amount: 10000},
          {year: 2016, amount: 5500},
          {year: 2017, amount: 5500}
        ],
        contributionLimit: 0,
        dataCollection: {}
        // donut: {}
      }
    },
    mounted () {
      this.fillData()
      // this.fillNut()
    },
    filters: {
      currency: function (value) {
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
    methods: {
      updateAge () {
        this.calcLimit()
        this.updateContributions()
      },
      calcLimit () {
        var total = 0
        for (var i = 0; i < this.contributions.length; i++) {
          if (this.contributions[i].year - this.birthYear >= 18) {
            total += this.contributions[i].amount
          }
        }
        this.contributionLimit = total
      },
      getKeyArr (myKey) {
        var newArr = []
        for (var i = 0; i < this.contributions.length; i++) {
          if (this.contributions[i].year - this.birthYear >= 18) newArr.push(this.contributions[i][myKey])
        }
        console.log(newArr)
        return newArr
      },
      fillData () {
        this.dataCollection = {
          labels: this.getKeyArr('year'),
          datasets: [
            {
              label: 'TFSA contributions',
              backgroundColor: 'red',
              data: this.getKeyArr('amount')
            }
          ]
        }
      }
    },
    computed: {
      donut: function () {
        return {
          labels: ['case1', 'case2', 'case3', 'case4'],
          datasets: [
            {
              backgroundColor: [
                'red',
                'blue',
                'green',
                'pink'
              ],
              data: [this.range, 20, 80, 10]
            }
          ]
        }
      }
    }

  }
</script>

<style scoped>
  
</style>
