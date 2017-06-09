<template>
  <nav class="side-menu">
    <h1>Side Menu</h1>
    <ul class="nav sidebar-nav">
      <li><a href="/#/IncomeTracker">Income Tracker</a></li>
      <li><a href="/#/TFSA">TFSA</a></li>
      <li><a href="/#/savings">Savings</a></li>
      <li class="dropdown" :class="{open: dropdownOpen}">
        <a href="#" v-on:click="dropdown()">
          Works
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu" role="menu">
          <li class="dropdown-header">Dropdown Header</li>
          <li><a href="#">Test 1</a></li>
          <li><a href="#">Test 2</a></li>
          <li><a href="#">Test 3</a></li>
        </ul>
      </li>
      <li><a href="/#/starbucks">Starbucks</a></li>
      <li><a href="/#/compound">Compound Calculator</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        dropdownOpen: false
      }
    },
    methods: {
      dropdown () {
        this.dropdownOpen = !this.dropdownOpen
      }
    }
  }
</script>

<style scoped>

  .side-menu {
    position: absolute;
    height: 100%;
    width: 250px;
    background-color: black;
  }
  .sidebar-nav {
    position: absolute;
    width: 250px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .sidebar-nav li {
    background-color: black;
    border-bottom: 2px solid grey;
    position: relative;
    display: inline-block;
    width: 100%;
    line-height: 20px;
  }

  .sidebar-nav li a {
    /*color: white;*/
  }
  .sidebar-nav li a:hover {
    background-color: grey;
    color: red;
  }
  .sidebar-nav .dropdown-menu {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .open > .dropdown-menu {
    display: block;
  }
</style>
