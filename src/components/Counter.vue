<template>
  <span>{{count | currency}}</span>
</template>

<script>
  export default {
    props: ['number'],
    data () {
      return {
        count: 0,
        totTime: 0,
        interval: 0
      }
    },
    filters: {
      currency: function (value) {
        return '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
    },
    mounted () {
      var temp = 0
      this.interval = 100 / this.number

      setInterval(() => {
        this.count = temp
        if (temp === this.number) {
          clearInterval()
        } else {
          temp++
        }
      }, this.interval)
    }
  }
</script>

<style scoped>
  
</style>
