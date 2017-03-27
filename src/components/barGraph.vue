<script>
  import { Bar } from 'vue-chartjs'

  export default Bar.extend({
    props: ['tester'],
    data () {
      return {
        msg: this.tester,
        dataCollection: {
          labels: [this.msg, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          datasets: [
            {
              label: 'TFSA contributions',
              backgroundColor: 'red',
              data: [5000, 5000, 5000, 5000, 5500, 5500, 10000, 5500, 5500]
            }
          ]
        }
      }
    },
    mounted () {
      // this.chartData is created in the mixin
      // console.log(this.tester)
      this.renderChart(this.dataCollection, {responsive: true, maintainAspectRatio: false})
    }
    // watch: {
    //   msg: function (val) {
    //     console.log('destroy: ' + val)
    //     this._chart.destroy()
    //     this.renderChart(this.dataCollection, {responsive: true, maintainAspectRatio: false})
    //   }
    // }
  })
</script>
