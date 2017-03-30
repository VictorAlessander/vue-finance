<script>
  import { Bar } from 'vue-chartjs'
  export default Bar.extend({
    name: 'MyAweseomChart',
    data () {
      return {
        options: {
          scales: {
            xAxes: [{
              // barThickness: 15
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    props: ['data'],
    mounted () {
      this.renderChart(this.data, this.options) // {responsive: true, maintainAspectRatio: false})
    },
    watch: {
      data: function () {
        this._chart.destroy()
        this.renderChart(this.data, this.options) // {responsive: true, maintainAspectRatio: false})
      }
    }
  })
</script>
