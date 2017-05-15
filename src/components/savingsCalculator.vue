<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h1>Savings Calculator</h1>  
        <form class="form-inline">
          <div class="form-group">
            <label for="Income">Annual Income</label>
            <input type="number" v-model="annualIncome" name="Income" class="form-control" v-on:change="fillData ()"/>
          </div>
          <div class="form-group">
            <label for="SavingRate">Saving Rate</label>
            <input type="number" v-model="savingRate" name="SavingRate" class="form-control" v-on:change="fillData ()"/>
          </div>
          <div class="form-group">
            <label for="IncomeGrowth">Income Growth %</label>
            <input type="number" v-model="incomeGrowth" name="IncomeGrowth" class="form-control" v-on:change="fillData ()"/>
          </div>
        </form>
      </div>
      <line-chart :data="lineData" :height="250"></line-chart>
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
        annualIncome: 55000,
        savingRate: 20,
        incomeGrowth: 5,
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        fullMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        lineData: {}
      }
    },
    mounted () {
      this.fillData()
    },
    computed: {
      monthlySavings () {
        var savingArr = []
        var saving = (this.annualIncome / 12) * (this.savingRate / 100)
        for (var i = 0; i < 12; i++) {
          savingArr.push(saving)
        }
        console.log(savingArr)
        return savingArr
      },
      totalIncome () {
        var incomeArr = []
        var monthlyIncome = this.annualIncome / 12
        var totIncome = 0
        for (var i = 0; i < 12; i++) {
          totIncome += monthlyIncome
          incomeArr.push(totIncome)
        }
        return incomeArr
      }
    },
    methods: {
      fillData () {
        console.log('fill')
        this.lineData = {
          labels: this.months,
          datasets: [
            {
              label: 'Savings',
              borderColor: 'red',
              backgroundColor: 'rgba(244, 67, 54, 0.5)',
              data: this.monthlySavings
            },
            {
              label: 'Income',
              borderColor: 'green',
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
              data: this.totalIncome
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  
</style>
