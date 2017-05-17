<template>
  <div>
    <h1>Compound Calculator</h1>
    <line-chart :data="compoundData"></line-chart>
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
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      calcData () {
        for (var i = 0; i <= 10; i++) {
          this.finances.push({
            'year': i * 5,
            '0%': 1000,
            '5%': 1000 * (1.05 ** i),
            '10%': 1000 * (1.1 ** i)
          })
        }
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
