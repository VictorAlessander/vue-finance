<script>
  import { Bar, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins
  export default Bar.extend({
    mixins: [reactiveProp],
    // props: ['chartData'],
    mounted () {
      // this.chartData is created in the mixin
      this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
    }
  })
</script>
