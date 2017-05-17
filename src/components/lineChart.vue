<script>
  import { Line } from 'vue-chartjs'
  export default Line.extend({
    name: 'LineChart',
    props: ['data', 'options'],
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
