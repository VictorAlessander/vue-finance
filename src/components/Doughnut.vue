<script>
  import { Doughnut } from 'vue-chartjs'
  export default Doughnut.extend({
    name: 'DoughnutChart',
    data () {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                var value = data.datasets[0].data[tooltipItem.index]
                var moneyValue = '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                return ' ' + moneyValue
              }
            }
          }
        }
      }
    },
    props: ['data'],
    mounted () {
      this.renderChart(this.data, this.options)
    },
    watch: {
      data: function () {
        this._chart.destroy()
        this.renderChart(this.data, this.options)
      }
    }
  })
</script>
