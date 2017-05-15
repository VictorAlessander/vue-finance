<script>
  import { Line } from 'vue-chartjs'
  export default Line.extend({
    name: 'LineChart',
    props: ['data'],
    data () {
      return {
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
      currency (value) {
        return '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
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
