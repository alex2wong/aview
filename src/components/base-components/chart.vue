<template>
  <canvas :ref="chartId" :id="chartId" :class="['a-chart']" :height="height"></canvas>
</template>
<style>
  .a-chart {
    width: 100%;
    height: 400px;
  }
</style>
<script>
import { Chart }  from 'chart.js';

export default{
  props: {
    type: {
      type: String,
      default: 'bar',
    },
    datasets: {
      type: Array,
    },
    chartOpt: {
      type: Object,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  data () {
    return {
      chart: null,
      chartId: `chart_${Math.round(Math.random() * 1000000)}`,
    };
  },
  watch: {
    datasets() {
      this.chart.data.datasets = this.datasets;
      this.chart.update();
      console.warn(`updating chart datasets...re-rendering.`);
    }
  },
  updateData() {

  },
  mounted() {
    const chartCont = this.$refs[this.chartId];
    this.chart = new Chart(this.chartId, {
      type: this.type,
      data: {
        datasets: this.datasets,
      },
      options: this.chartOpt,
    });
  }
}
</script>
