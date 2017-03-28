<script>
  import { Doughnut } from 'vue-chartjs'
  export default Doughnut.extend({
    name: 'DoughnutChart',
    props: ['data'],
    mounted () {
      this.renderChart(this.data, {responsive: true, maintainAspectRatio: false})
    },
    watch: {
      data: function () {
        this._chart.destroy()
        this.renderChart(this.data, {responsive: true, maintainAspectRatio: false})
      }
    }
  })
</script>
