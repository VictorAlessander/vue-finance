<script>
  import { Bar } from 'vue-chartjs'
  export default Bar.extend({
    name: 'Bar-Line Graph',
    props: ['data'],
    mounted () {
      this.renderChart(this.datam {responsive: true, maintainAspectRatio: false})
    },
    watch: {
      data: function () {
        this._chart.destroy()
        this.renderChart(this.data, {responsive: true, maintainAspectRatio: false})
      }
    }
  })
</script>
