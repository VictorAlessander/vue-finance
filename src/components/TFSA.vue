<template>
  <div class="container">
    <h1 style="text-align:center">TFSA</h1>
    
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Birth Year</h3>
        <input type="text" v-model="birthYear" v-on:keyup.enter="fillData()">
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
              <th>Amount Withdrawed</th>
              <th>Total Contributed</th>
              <th>Cap Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contribution in legalContributions" v-bind:class="{overLimit: contribution.capRemaining < 0}">
              <td>{{contribution.year}}</td>
              <td>{{contribution.annualLimit | currency}}</td>
              <td>{{contribution.totalLimit | currency}}</td>
              <td>$ <input type="number" v-model="contribution.amount" v-on:change="fillData()"></td>
              <td>$ <input type="number" v-model="contribution.withdrawed" v-on:change="fillData()"></td>
              <td>{{contribution.totalAmount | currency}}</td>
              <td>{{contribution.capRemaining  | currency}}</td>
            </tr>
          </tbody>       
        </table>
        <button class="btn btn-lrg btn-success" v-on:click="updateAmounts()">Update</button>
      </div>
      <div class="col-md-12">
        <bar-graph :data="dataCollection" :height="500"></bar-graph>
      </div> 
      <div class="col-md-12">
        <!-- <h3>To Max Out: {{capRoom | currency}}</h3> -->
        <h3>Contributions to Date: {{contributionsTotal | currency}}</h3> 
        <br>
        <h3>Your contribution limit is: {{contributionLimit | currency}}</h3>
        <br>
        <h3>Cap Remaining: {{capRemaining | currency}}</h3>
        <doughnut-graph :data="tfsaData"></doughnut-graph>
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
          {year: 2009, annualLimit: 5000, amount: 0, withdrawed: 0},
          {year: 2010, annualLimit: 5000, amount: 0, withdrawed: 0},
          {year: 2011, annualLimit: 5000, amount: 0, withdrawed: 0},
          {year: 2012, annualLimit: 5000, amount: 0, withdrawed: 0},
          {year: 2013, annualLimit: 5500, amount: 0, withdrawed: 0},
          {year: 2014, annualLimit: 5500, amount: 0, withdrawed: 0},
          {year: 2015, annualLimit: 10000, amount: 0, withdrawed: 0},
          {year: 2016, annualLimit: 5500, amount: 0, withdrawed: 0},
          {year: 2017, annualLimit: 5500, amount: 0, withdrawed: 0}
        ],
        legalContributions: [],
        contributionLimit: 0,
        dataCollection: {},
        contributionTotal: 0,
        monthlyContribution: 0,
        tfsaData: {}
        // donut: {}
      }
    },
    mounted () {
      this.fillData()
      // this.fillNut()
    },
    filters: {
      currency: function (value) {
        return '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
    computed: {
      contributionsTotal () {
        var total = 0
        if (this.legalContributions.length !== 0) total = this.legalContributions[this.legalContributions.length - 1].totalAmount
        return total
      },
      capRemaining () {
        var total = 0
        if (this.legalContributions.length !== 0) total = this.legalContributions[this.legalContributions.length - 1].capRemaining
        return total
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
            totalAmount += Number(this.legalContributions[i].amount)
          }
          contribution.totalLimit = totalLimit
          contribution.totalAmount = totalAmount
          contribution.capRemaining = totalLimit - totalAmount - contribution.withdrawed
        })
        // console.log(this.legalContributions)

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
              data: this.getKeyArr('totalAmount')
            },
            {
              label: 'Cap Remaining ',
              backgroundColor: 'cyan',
              data: this.getKeyArr('capRemaining')
            }
          ]
        }
        var tfsaTotal = this.legalContributions[this.legalContributions.length - 1].totalAmount
        var capRoom = this.legalContributions[this.legalContributions.length - 1].capRemaining
        this.tfsaData = {
          labels: ['Cap Remaining', 'Total Contributions'],
          datasets: [
            {
              backgroundColor: [
                'red',
                'blue'
              ],
              data: [capRoom, tfsaTotal]
            }
          ]
        }
      }
    }

  }
</script>

<style scoped>
  input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
   
  input[type="number"] {
      -moz-appearance: textfield;
  }
  .overLimit {
    background-color: red !important;
  }
</style>
