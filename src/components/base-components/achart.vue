<template>
  <div :ref="chartId" :id="chartId" :class="['a-chart']"></div>
</template>
<style>
  .a-chart {
    width: 100%;
    height: 400px;
  }
</style>
<script>
var amcharts = require('amcharts3/amcharts');
require('amcharts3/serial');
require('amcharts3/pie');
require('amcharts3/themes/dark');
require('amcharts3/themes/light');

const defaultConfig = {
  type: 'serial',
  accessibleTitle: 'chart denotes data.',
  labelsEnabled: false,
  // baseColor: '#00b6a3',
  // borderAlpha: .9, // rect border of chart container.
  hoverAlpha: 0.8,
  outlineAlpha: 0.6,
  startDuration: 0,
  pullOutDuration: .3,
  pullOutOnlyOne: true,
  // colors: [],
};

const defaultGraphOpts = {
  // type: 'line' | 'column',
  title: 'This is title',
  valueField: 'value',
  fillAlphas: 0.15,
  lineThickness: 2,
  // bullet: 'round',
  cornerRadiusTop: 3,
};

export default{
  props: {
    chartId: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
    },
    chartConfig: {
      type: Object,
      default () {
        return {
          type: 'line'
        };
      },
    },
  },
  data() {
    return {
      chart: null,
      theme: 'light',
      textColor: '#222',
    };
  },
  mounted() {
    console.warn(`Amcharts of window? is : ${AmCharts}`);
    this.initChart();
  },
  computed: {
    isSerialChart() {
      return this.chartConfig.type === 'line'
      || this.chartConfig.type === 'column'
      || this.chartConfig.type === 'serial';
    },
  },
  methods: {
    initChart() {
      var customOpt = {};
      console.warn(`initialing chart.. debug..`);
      if (this.isSerialChart) {
        const serialCustomOpt = {
          type: 'serial',
          chartCursor: {},
          dataProvider: this.chartData,
          categoryField: this.chartConfig.categoryField,
          graphs: [Object.assign({}, defaultGraphOpts, this.chartConfig.graphs[0])],
        };
        customOpt = Object.assign({}, defaultConfig, serialCustomOpt, { color: this.textColor });
      }
      this.chart = AmCharts.makeChart(this.chartId, customOpt);
    }
  }
}
</script>
