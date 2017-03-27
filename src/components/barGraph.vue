<script>
  import { Bar } from 'vue-chartjs'
  export default Bar.extend({
    name: 'MyAweseomChart',
    props: ['data'], // , 'options'],
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
