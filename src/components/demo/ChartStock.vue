<template>
  <chart
   :type="'line'"
   :labels="labels" 
   :datasets="dataSets" 
   :chart-opt="chartOpts"></chart>
</template>
<style>

</style>
<script >
import { default as Chart } from '../base-components/chart.vue';
import { stockData } from './stockData.js';

export default {
  components: {
    Chart,
  },
  props: {
    
  },
  data () {
    return {
      // labels for line Chart should be number[] ??!!!
      labels: [],
      stockData: stockData,
      dataSets: [],
    };
  },
  beforeMount () {
    const { data, stockCode } = this.stock2line();
    this.dataSets.push(
      {
        data,
        // type: 'line',
        label: stockCode,
        fill: true,
        pointRadius: 1,
        borderWidth: 2,
        borderColor: 'rgba(203, 47, 130, 0.7)',
        // backgroundColor: 'rgba(203, 47, 130, 0.7)',
      });
    this.chartOpts = {
      title: {
        display: true,
        text: `Day K lines of Stock ${stockCode}`,
      },
      scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Dates',
            },
          }
        ],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Price',
          },
        }]
      },
    };
  },
  methods: {
    // stockData to chart.js lineDataset
    stock2line () {
      let dayPrices = [];
      let xLabels = [];
      let index = 0;
      for (var code in this.stockData) {
        const dayKs = this.stockData[code];
        console.warn(`got len: ${dayKs.length} data.`);
        dayKs.forEach(info => {
          if (index % 10 === 0) {
            dayPrices.push(Number(info[1]));
            xLabels.push((info[0].split('-')
              .join('')));
          }
          index += 1;
        });
      }
      this.labels = xLabels;
      console.warn(`got ${dayPrices.length} days stock price for ${code} `);
      return {
        data: dayPrices,
        stockCode: code,
      };
    },
  }
}

</script>
