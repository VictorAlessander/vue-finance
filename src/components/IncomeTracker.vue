<template>
	<div class="container">
		<h1>Income Tracker</h1>
		<div class="row">
		<!-- 	<div class="col-md-12">
        <h3>Hello World</h3>   
        <form class="">
          <div class="form-group">
            <label for="incomeType">Income Type: </label>
            <br>
            <input type="radio" name="incomeType" value="Salary">Salary
            <br>
            <input type="radio" name="incomeType" value="Hourly">Hourly
          </div>
           <div class="form-group">
            <label for="hourlyWage">Hourly Wage: </label>
            <input type="text" name="hourlyWage" class="form-control">
          </div> 
          <div class="form-group">
            <label for="annualIncome">Annual Income: </label>
            <input type="text" name="annualIncome" class="form-control">
          </div> 
          <br>
          <div class="form-group">
            <label for="annualIncome"># Pay Periods per Month: </label>
            <select name="payPeriods" id="" class="form-control">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">4</option>
            </select>
          </div>         
        </form>
      </div> -->
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label for="currentIncome">Current Income:</label>
            <input type="text" name="currentIncome" v-model="currIncome" class="form-control">
          </div>
          <div class="form-group">
            <label for="incomeGrowth">Income Growth %:</label>
            <input type="text" name="incomeGrowth" v-model="incomeGrowth" class="form-control">
          </div>
          <div class="form-group">
            <label for="ROR">Rate of Return</label>
            <input type="text" name="ROR" v-model="ror" class="form-control">
          </div>
          <div class="form-group">
            <label for="savingRate">Saving Rate %</label>
            <input type="text" v-model="savingRate" class="form-control">
          </div>
          <div class="form-group">
            <label for="age">Current Age:</label>
            <input type="text" name="age" v-model="age" class="form-control">
          </div>
          <div class="form-group">
            <label for="retirementAge">Retirement Age:</label>
            <input type="text" name="retirementAge" v-model="retirementAge" class="form-control">
          </div>
          <div class="form-group"></div>
        </form>
      </div>
      <div class="col-md-12">
        <bar-graph :data="dataCollection"></bar-graph>
      </div>

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
        age: 23,
        retirementAge: 65,
        ror: 5,
        currIncome: 55000,
        incomeGrowth: 5,
        savingRate: 20,
        dataCollection: {}
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      calcIncome () {
        var incomeArr = []
        var workingLifeSpan = this.retirementAge - this.age
        var income = this.currIncome
        var incomeGrowth = this.incomeGrowth

        for (var i = 0; i <= workingLifeSpan; i++) {
          income *= (1 + incomeGrowth / 100)
          incomeArr.push(income)
        }
        return incomeArr
      },
      calcSavings () {
        var savingsArr = []
        var workingLifeSpan = this.retirementAge - this.age
        var income = this.currIncome
        var savingRate = this.savingRate

        for (var i = 0; i <= workingLifeSpan; i++) {
          var savings = income * (savingRate / 100)
          savingsArr.push(savings)
        }
        return savingsArr
      },
      fillData () {
        console.log('fill')
        this.dataCollection = {
          labels: ['a', 'b'],
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'red',
              data: [1, 2]
            },
            {
              label: 'Savings',
              backgroundColor: 'blue',
              data: [1, 2]
            },
            {
              label: 'Investments',
              backgroundColor: 'green',
              data: [1, 2]
            }
          ]
        }
        console.log(this.dataCollection)
      }
    }
  }
</script>

<style scoped>
  
</style>
