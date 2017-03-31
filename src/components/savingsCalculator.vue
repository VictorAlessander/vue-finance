<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h1>Savings Calculator</h1>
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="Income">Annual Income</label>
              <input type="number" v-model="annualIncome" name="Income" class="form-control"/>
            </div>
            <div class="form-group">
              <label for="SavingRate">Saving Rate</label>
              <input type="number" v-model="savingRate" name="SavingRate" class="form-control"/>
            </div> 
          </form>
        </div>
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
        var saving = this.monthlySavings = (this.annualIncome / 12) * (this.savingRate / 100)
        return saving
      }
    },
    methods: {
      fillData () {
        this.lineData = {
          labels: this.months,
          datasets: [
            {
              label: 'first dataset',
              data: [10, 20, 10, 10, 20, 10, 10, 20, 10, 10, 20, 10]
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  
</style>
