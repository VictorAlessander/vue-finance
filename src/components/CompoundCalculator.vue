<template>
  <div>
    <h1>Compound Calculator</h1>
    <input type="number" v-model="initialAmount"/>
    <line-chart :data="compoundData" :options="options"></line-chart>
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
        compoundData: {},
        finances: [],
        initialAmount: 10000,
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
    methods: {
      calcData () {
        for (var i = 0; i <= 10; i++) {
          this.finances.push({
            'year': i * 5,
            '0%': this.initialAmount,
            '5%': this.initialAmount * (1.05 ** i),
            '10%': this.initialAmount * (1.1 ** i)
          })
        }
      },
      currency (value) {
        return '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      },
      fillData () {
        this.compoundData = {
          labels: this.getKeyArr(this.finances, 'year'),
          datasets: [
            {
              label: '0%',
              borderColor: 'red',
              data: this.getKeyArr(this.finances, '0%')
            },
            {
              label: '5%',
              borderColor: 'green',
              data: this.getKeyArr(this.finances, '5%')
            },
            {
              label: '10%',
              borderColor: 'blue',
              data: this.getKeyArr(this.finances, '10%')
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
      }
    },
    mounted () {
      this.calcData()
      this.fillData()
    }
  }
</script>

<style scoped>
  
</style>
