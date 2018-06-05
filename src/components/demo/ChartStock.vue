<template>
  <div>
    <h3>定投计算器v0.1</h3>
    <chart
    :labels="labels" 
    :datasets="dataSets" 
    :chart-opt="chartOpts"></chart>
    <label for="">定投间隔 {{intervalDate}}（天）</label>
    <base-slider :min="7" :max="28" v-model="intervalDate" @change="calcInvest"></base-slider>
    <br>
    <label for="">定投总期数 {{intervalCnt}} 期</label>
    <base-slider :min="1" :max="200" v-model="intervalCnt" @change="calcInvest"></base-slider> 
    <br>
    <div class="result">
      startDate: {{ startDate }} , input <b>￥{{ investVal }}</b> each {{ intervalDate }} days, 
      totalInvet: <span>{{ res.totalInvest }}</span> CNY, <br>
      totalMoney at end: <span>{{ res.totalMoney.toFixed(2) }}</span> CNY, 
      totalEarnRate: <span>{{ res.totalEarnRate.toFixed(4)*100 }}</span>%
    </div>
   </div>
</template>
<style>
  .result span {
    color: #296;
    font-size: 1.1rem;
  }
</style>
<script >
import { default as Chart } from '../base-components/chart.vue';
import { default as BaseSlider } from '../BaseSlider';
import { stockData } from './stockData';
import { dingInvest, getPrice, getFloatRate } from './dingInvest.service';

export default {
  components: {
    Chart,
    BaseSlider,
  },
  props: {
    
  },
  data () {
    return {
      // labels for line Chart should be number[] ??!!!
      labels: [],
      stockData: stockData,
      dataSets: [],
      res: {
        totalInvest: 0,
        totalMoney: 0,
        totalEarnRate: 0,
        investDateArr: [],
      },
      intervalDate: 7,
      investVal: 1000,
      intervalCnt: 52,
      stepSize: 10,  // simplify stepSize of stockData for chart visual.
      startDate: '2012-4-30',
    };
  },
  beforeMount () { 
    const { data, stockCode } = this.stock2line();
    this.dataSets.push(
      {
        data,
        type: 'line',
        label: stockCode,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
        borderColor: 'rgba(203, 47, 130, 0.7)',
        // backgroundColor: 'rgba(203, 47, 130, 0.7)',
      });
    this.chartOpts = {
      title: {
        display: true,
        text: `Day K lines of Stock ${stockCode}`,
      },
      tooltips: {
        intersect: false,
        mode: 'index',
      },
      onHover: (evt, msg) => {
        if (msg.length > 0) {
          // console.warn(`debug: hover index ${msg[0]._index}`);
        }
      },
      onClick: (ctx, msg) => {
        if (msg.length > 0) {
          console.warn(`debug: clicked index ${msg[0]._index}`);
        }
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
            labelString: 'Price (CNY)',
          },
        }]
      },
    };
  },
  mounted() {
    // start test dingInvest.
    this.res = dingInvest(this.stockData, this.intervalDate, this.intervalCnt, this.investVal, 0, this.startDate);
  },

  methods: {
    genInvestChart(investDateArr) {
      let dataSet = { 
        data: [],
        type: 'scatter',
        label: 'invest dates',
        pointRadius: 2,
        pointBackgroundColor: 'rgb(250, 47, 0)',
        borderColor: 'rgba(203, 47, 130, 0.7)',
      };
      for (let i = 0; i < investDateArr.length; i++) {
        const date = investDateArr[i];
        const { index,val } = this.getIndexbyDate(date);
        dataSet.data.push({
          x: index, y: val,
        });
      }
      this.dataSets[1] = dataSet;
      return dataSet;
    },
    calcInvest () {
      this.res = dingInvest(this.stockData, this.intervalDate, this.intervalCnt, this.investVal, 0, this.startDate);
      // const investDateArr = this.res.investDateArr.concat();
      // this.genInvestChart(investDateArr);
    },
    // stockData to chart.js lineDataset
    stock2line () {
      let dayPrices = [];
      let xLabels = [];
      let index = 0;
      for (var code in this.stockData) {
        const dayKs = this.stockData[code];
        console.warn(`got len: ${dayKs.length} data.`);
        dayKs.forEach(info => {
          if (index % this.stepSize === 0) {
            dayPrices.push(Number(info[1]));
            xLabels.push((info[0].split('-')
              .join('-')));
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

    /**
     * date: string.
     * return { index, val: price }
     */
    getIndexbyDate(date) {
      for (var code in this.stockData) {
        const dayKs = this.stockData[code];
        for (let index = 0; index < dayKs.length; index += 1) {
          const pickIndex = index * this.stepSize;
          const element = dayKs[pickIndex];
          if (element[0] === date) {
            return {
              index,
              val: element[1],
            };
          }
        }
      }
      return { index: -1, val: -1 };
    }
  }
}

</script>
