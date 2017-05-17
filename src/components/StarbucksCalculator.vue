<template>
  <div>
    <h1>Starbucks Calculator</h1>
    <ul>
      <li>Starbucks Coffee Price: $4</li>
      <li>Number of times a week: 5</li>
    </ul>
    <div>
      <h2>Stats:</h2>
      <ul>
        <li>Weekly Cost: $20</li>
        <li>Annual Cost: $1040</li>
        <li>ROR: 5%</li>
        <li>test: <counter :number="2000"></counter></li>
      </ul>
    </div>
    <div>
      <h2>Chart:</h2>
      <ul class="nav nav-tabs">
        <li role="presentation" :class="{active: isActive(0)}"><a v-on:click="generateReport(0, 5)">5 Years</a></li>
        <li role="presentation" :class="{active: isActive(1)}"><a v-on:click="generateReport(1, 10)">10 Years</a></li>
        <li role="presentation" :class="{active: isActive(2)}"><a v-on:click="generateReport(2, 20)">20 Years</a></li>
        <li role="presentation" :class="{active: isActive(3)}"><a v-on:click="generateReport(3, 30)">30 Years</a></li>
        <li role="presentation" :class="{active: isActive(4)}"><a v-on:click="generateReport(4, 40)">40 Years</a></li>
      </ul>
      <div class="row">
        <div class="col-md-8">
          <line-chart :data="stackbucksData" :options="options" :height="500"></line-chart>         
        </div>
        <div class="col-md-4">
          <h2>Stats:</h2>
          <ul>
            <li>In {{finances[this.reportYearRange].year}} years...</li> 
            <li>You will have spent {{finances[this.reportYearRange].totalCost | currency}} on coffee</li>
            <li>Or you could have saved that {{finances[this.reportYearRange].totalCost | currency}} every year...</li>
            <li>which invested would result in {{finances[this.reportYearRange].totalInvestment | currency}}</li>
            <li>By saving instead of buying that cup of coffee everyday in 20 years you can save up enough money to drink a cup of starbucks coffee soley on your investment interest</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import lineChart from './lineChart'

  export default {
    components: {
      'line-chart': lineChart
    },
    data () {
      return {
        activeTab: 0,
        reportYearRange: 5,
        stackbucksData: {},
        finances: [],
        reportFinances: [],
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: (label) => {
                    return this.currency(label)
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                var value = data.datasets[0].data[tooltipItem.index]
                // var label = data.labels[tooltipItem.index]
                var moneyValue = this.currency(value)
                return ' ' + moneyValue
              }
            }
          }
        }
      }
    },
    filters: {
      currency: function (value) {
        return '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
    mounted () {
      this.calcFinances()
      this.generateReport(0, 5)
    },
    methods: {
      calcFinances () {
        var totalCost = 0
        var totalInvestment = 0
        var finances = []

        for (var i = 0; i <= 40; i++) {
          finances.push({
            'year': i,
            'totalCost': totalCost,
            'totalInvestment': totalInvestment
          })
          totalCost += 1040
          totalInvestment = (totalInvestment + 1040) * 1.05
        }
        this.reportFinances = this.finances = finances
      },
      fillData () {
        this.stackbucksData = {
          labels: this.getKeyArr(this.reportFinances, 'year'),
          datasets: [
            {
              label: 'Costs',
              borderColor: 'red',
              data: this.getKeyArr(this.reportFinances, 'totalCost')
            },
            {
              label: 'Investments',
              borderColor: 'green',
              data: this.getKeyArr(this.reportFinances, 'totalInvestment')
            }
          ]
        }
      },
      getKeyArr (arr, key) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
          newArr.push(arr[i][key])
        }
        return newArr
      },
      generateReport (tabIndex, years) {
        console.log('report')
        this.activeTab = tabIndex
        this.reportYearRange = years
        this.reportFinances = this.finances.filter((val) => {
          return val.year <= years
        })
        this.fillData()
        console.log(this.reportFinances)
      },
      isActive (tab) {
        return this.activeTab === tab
      }
    }
  }
</script>

<style scoped>
  
</style>
