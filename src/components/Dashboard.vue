<template>
  <div>
    <h1>Financial Dashboard</h1>
    <income-tracker></income-tracker>
  </div>
</template>

<script>
  import IncomeTracker from './IncomeTracker'
  export default {
    components: {
      'income-tracker': IncomeTracker
    }
  }
</script>

<style scoped>

</style>

