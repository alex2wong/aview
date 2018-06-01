<template>
  <div id="app">
    <h2> Loan Calculator </h2>
    <loan-invest></loan-invest>
    <chart-stock></chart-stock>
    <!-- <chart-demo></chart-demo> -->
  </div>
</template>

<script>
import LoanInvest from './components/LoanInvest';
import ChartStock from './components/demo/ChartStock';
// import ChartDemo from './components/demo/ChartDemo.vue';

export default {
  name: 'App',
  components: {
    LoanInvest,
    ChartStock,
    // ChartDemo,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
