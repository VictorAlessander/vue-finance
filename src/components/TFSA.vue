<template>
  <div class="container">
    <h1 style="text-align:center">TFSA</h1>
    
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Birth Year</h3>
        <input type="text" v-model="birthYear" v-on:keyup.enter="fillData()">
        <br>
        <h3>Contribution Total:</h3>
        <input type="text" v-model="contributionTotal">
        <h4>Your contribution limit is: {{contributionLimit | currency}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Year</th>
              <th>Annual Limit</th>
              <th>Cumulative Total</th>
              <th>Your Contribution</th>
              <th>Contribution Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contribution in legalContributions">
              <td>{{contribution.year}}</td>
              <td>{{contribution.annualLimit | currency}}</td>
              <td>{{contribution.totalLimit | currency}}</td>
              <td><input type="number" v-model="contribution.amount"></td>
              <td>{{contribution.totalAmount | currency}}</td>
            </tr>
          </tbody>       
        </table>
        <button class="btn btn-lrg btn-success" v-on:click="updateAmounts()">Update</button>
      </div>
      <div class="col-md-12">
        <bar-graph :data="dataCollection" :height="250"></bar-graph>
      </div> 
    </div>

    <!-- <div>
      <input type="range" v-model="range"> 
      <h3>Range: {{range}}</h3>
      <doughnut-graph :data="donut"></doughnut-graph>
    </div> -->
    
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
          {year: 2009, annualLimit: 5000, amount: 0},
          {year: 2010, annualLimit: 5000, amount: 0},
          {year: 2011, annualLimit: 5000, amount: 0},
          {year: 2012, annualLimit: 5000, amount: 0},
          {year: 2013, annualLimit: 5500, amount: 0},
          {year: 2014, annualLimit: 5500, amount: 0},
          {year: 2015, annualLimit: 10000, amount: 0},
          {year: 2016, annualLimit: 5500, amount: 0},
          {year: 2017, annualLimit: 5500, amount: 0}
        ],
        legalContributions: [],
        contributionLimit: 0,
        dataCollection: {},
        contributionTotal: 0
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
      updateAmounts () {
        // fillData()
      },
      calcLimit () {
        var total = 0
        for (var i = 0; i < this.contributions.length; i++) {
          if (this.contributions[i].year - this.birthYear >= 18) {
            total += this.contributions[i].annualLimit
          }
        }
        this.contributionLimit = total
      },
      getKeyArr (myKey) {
        var newArr = []
        for (var i = 0; i < this.contributions.length; i++) {
          if (this.contributions[i].year - this.birthYear >= 18) newArr.push(this.contributions[i][myKey])
        }
        return newArr
      },
      fillData () {
        this.calcLimit()
        this.legalContributions = this.contributions.filter((val) => { return val.year - this.birthYear >= 18 })
        this.legalContributions.forEach((contribution) => {
          var index = this.legalContributions.indexOf(contribution)
          var totalLimit = 0
          var totalAmount = 0
          for (var i = 0; i <= index; i++) {
            totalLimit += this.legalContributions[i].annualLimit
            totalAmount += this.legalContributions[i].amount
          }
          contribution.totalLimit = totalLimit
          contribution.totalAmount = totalAmount
        })
        console.log(this.legalContributions)

        this.dataCollection = {
          labels: this.getKeyArr('year'),
          datasets: [
            {
              label: 'Annual Limit',
              backgroundColor: 'red',
              data: this.getKeyArr('annualLimit')
            },
            {
              label: 'Cumulative Total ',
              backgroundColor: 'blue',
              data: this.getKeyArr('totalLimit')
            },
            {
              label: 'Your Contribution ',
              backgroundColor: 'green',
              data: this.getKeyArr('amount')
            },
            {
              label: 'Total Contribution ',
              backgroundColor: 'pink',
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
