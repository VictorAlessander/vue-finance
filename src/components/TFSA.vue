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
      <bar-graph :chart-data="dataCollection" :height="250"></bar-graph>
    </div>
    
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
        test: 'hello world',
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
        // dataCollection: {
        //   labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        //   datasets: [
        //     {
        //       label: 'TFSA contributions',
        //       backgroundColor: 'red',
        //       data: [5000, 5000, 5000, 5000, 5500, 5500, 10000, 5500, 5500]
        //     }
        //   ]
        // }

      }
    },
    mounted () {
      this.fillData()
    },
    filters: {
      currency: function (value) {
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
    methods: {
      updateAge () {
        // console.log(2017 - this.birthYear)
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
        // console.log('total: ' + total)
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
        // this.dataCollection = {}
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
    }

  }
</script>

<style scoped>
  
</style>
