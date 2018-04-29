<template>
  <div id="app">
    <h2> Loan Calculator </h2>
    <loan-invest></loan-invest>
  </div>
</template>

<script>
import LoanInvest from './components/LoanInvest';

export default {
  name: 'App',
  components: {
    LoanInvest
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
