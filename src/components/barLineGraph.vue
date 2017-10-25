<script>
  import { Bar } from 'vue-chartjs'
  export default Bar.extend({
    name: 'Bar-Line Graph',
    props: ['data'],
    mounted () {
      this.renderChart(this.data {responsive: false, maintainAspectRatio: false})
    },
    watch: {
      data: function () {
        this._chart.destroy()
        this.renderChart(this.data, {responsive: false, maintainAspectRatio: false})
      }
    }
  })
</script>
