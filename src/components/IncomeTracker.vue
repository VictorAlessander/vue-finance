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
      <div class="col-md-2">
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
      <div class="col-md-12">
        <ul class="nav nav-tabs">
          <li role="presentation" :class="{active: isActive(0)}"><a v-on:click="generateReport(5, 0)">5 Years</a></li>
          <li role="presentation" :class="{active: isActive(1)}"><a v-on:click="generateReport(10, 1)">10 Years</a></li>
          <li role="presentation" :class="{active: isActive(2)}"><a v-on:click="generateReport(20, 2)">20 Years</a></li>
          <li role="presentation" :class="{active: isActive(3)}"><a v-on:click="generateReport(30, 3)">50 Years</a></li>
        </ul>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Year</th>
              <th>Age</th>
              <th>Income</th>
              <th>Annual Savings</th>
              <th>Investments</th>
            </tr>            
          </thead>
          <tbody>
            <tr v-for="finance in reportFinances">
              <td>{{finance.year}}</td>
              <td>{{finance.age}}</td>
              <td>{{finance.income | currency}}</td>
              <td>{{finance.savings | currency}}</td>
              <td>{{finance.investments | currency}}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button class="btn btn-lrg btn-info" v-on:click="downloadCSV()">Download as CSV</button>
        </div>
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
        ror: 7,
        currIncome: 55000,
        incomeGrowth: 5,
        savingRate: 50,
        dataCollection: {},
        finances: [],
        reportFinances: [],
        activeTab: 0
      }
    },
    filters: {
      currency: function (value) {
        return '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
    mounted () {
      this.calcFinances()
      this.generateReport(5, 0)
      this.fillData()
    },
    methods: {
      isActive (tab) {
        return this.activeTab === tab
      },
      generateReport (yearRange, tab) {
        console.log('generateReport')
        this.activeTab = tab
        this.reportFinances = this.finances.filter((val) => {
          return val.year - 2017 < yearRange
        })
      },
      calcFinances () {
        console.log('calcFinances')
        var finances = []
        var income = this.currIncome
        var investments = 0
        var year = 2017
        var age = this.age

        var workingLifeSpan = this.retirementAge - this.age
        var incomeGrowth = this.incomeGrowth
        var savingRate = this.savingRate
        var ror = this.ror

        for (var i = 0; i <= workingLifeSpan; i++) {
          // Calculate project annual saving
          var savings = income * (savingRate / 100)
          investments += savings

          finances.push({
            'year': year,
            'age': age,
            'income': income,
            'savings': savings,
            'investments': investments
          })

          // Calculate projected annual income
          income *= (1 + incomeGrowth / 100)

          // Calculate projected annual investment

          investments *= (1 + ror / 100)
           // Calculate year
          year++

          // Calculate age
          age++
        }
        // console.log(finances)
        this.finances = finances
      },
      getKeyArr (myKey) {
        var newArr = []
        for (var i = 0; i < this.finances.length; i++) {
          newArr.push(this.finances[i][myKey])
        }
        return newArr
      },
      fillData () {
        console.log('fill')
        this.dataCollection = {
          labels: this.getKeyArr('year'),
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'red',
              data: this.getKeyArr('income')
            },
            {
              label: 'Savings',
              backgroundColor: 'blue',
              data: this.getKeyArr('savings')
            },
            {
              label: 'Investments',
              backgroundColor: 'green',
              data: this.getKeyArr('investments')
            }
          ]
        }
        // console.log(this.dataCollection)
      },
      downloadCSV () {
        // var data = this.reportFinances
        // var csvContent = "data:text/csv;charset=utf-8,";
        // data.forEach((infoArray, index) => {
        //   dataString = infoArray.join(", ");
        //   csvContent += index < data.length ? dataString+ "\n" : dataString;
        // })
        // var encodedUri = encodedUri(csvContent)
        // window.open(encodedUri)
      }
    }
  }
</script>

<style scoped>
  
</style>
