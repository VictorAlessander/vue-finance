<script>
  import { Line } from 'vue-chartjs'
  export default Line.extend({
    name: 'LineChart',
    props: ['data'],
    mounted () {
      this.renderChart(this.data, {responsive: false, maintainAspectRatio: false})
    },
    watch: {
      data: function () {
        this._chart.destroy()
        this.renderChart(this.data, {responsive: false, maintainAspectRatio: false})
      }
    }
  })
</script>
