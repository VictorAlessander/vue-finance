<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <!-- <img alt="Brand" src="src/assets/logo.png"> -->
          </a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="#/">Dashboard</a></li>
            <li><a href="#/tfsa">TFSA</a></li>
            <li><a href="#/savings">Savings</a></li>
          </ul>
        </div>
      </div>       
    </nav>
    <side-menu></side-menu>
    <div id="view-wrapper" class="container-fluid">    
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
  import sideMenu from './components/SideMenu'

  export default {
    name: 'app',
    components: {
      'side-menu': sideMenu
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  #view-wrapper {
    position: absolute;
    left: 250px;
  }

  .navbar {
    margin-bottom: 0 !important;
  }
</style>
