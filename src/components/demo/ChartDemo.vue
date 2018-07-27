<template>
  <div>
    <hr>
    <h2>Chart.js HeatMap Demo</h2>
    <chart :datasets="points" :chart-opt="chartOpts" :type="'scatter'"></chart>
    <label for="searchRad">HeatMap Search Radius:</label>
    <input type="number" v-model="radius" name="searchRad" id="searchRad" @change='updateDensity'>
    <span v-show="calculating"> calculating...</span>
    <!-- <chart :datasets="heatData" :chart-opt="chartOpts" :type="'scatter'"></chart> -->
  </div>
</template>
<style scoped>
  .colorMap {
    background: rgb(255, 73, 73);
    background-color: rgb(199, 120, 1);
    color: rgb(97, 199, 1);
  }
  h2 {
    color: #999;
  }
</style>
<script>
import { default as Util } from '../util';
import { default as Chart } from '../base-components/achart.vue';
import { HeatMap } from './heatmap';
// import * as Noise from '../noise';

export default {
  components: {
    Chart,
  },
  props: {

  },
  data() {
    console.warn(`generate internal data..`);
    return {
      points: [],
      pointsClone: null,
      heatData: [],
      radius: 5,
      calculating: false,
      chartOpts: {
        legend: {
            display: true,
        },
        animation: {
            duration: 0, // general animation time
        },
      },
      colorMap: ['#']
    };
  },
  beforeMount() {
    console.warn(`beforeMount. prepare data..`);
    var randPoints = this.randPoints(2000);
    // backup points data before passing into chart..
    this.pointsClone = Util.deepClone(randPoints);
    console.warn(`computing Density data...`);
    var heatMapDataset = this.getDensityData();

    var pointDataset = {
      label: 'random points',
      data: randPoints,
      pointBackgroundColor: 'rgba(255, 73, 73, .4)',
    };

    this.points.push(pointDataset);
    this.heatData.push(heatMapDataset);
  },
  mounted() {
    console.warn(`mounted..`);
  },
  computed: {

  },
  methods: {
    updateDensity() {
      this.calculating = true;
      var heatMapDataset = this.getDensityData();
      console.warn(`calculating updated heatMap data..`);
      this.heatData = [ heatMapDataset ];
      this.calculating = false;
    },
    randPoints(n) {
      let arr = [];
      for (let i = 0; i < n; i++) {
        arr[i] = {
          x: this.randInt(0, 100),
          y: this.randInt(0, 60),
        };
      }
      console.warn(`generate ${n} points.`);
      return arr;
    },
    randInt(min = 0, max = 100) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getDensityData() {
      const densitySet = HeatMap.computeDensity(this.pointsClone,  this.radius);
      const densityColor = HeatMap.getColors(densitySet);
      return {
        label: 'Heat Map',
        data: densitySet.densityData,
        pointRadius: 6,
        pointStyle: 'rect',
        borderWidth: 0,
        pointBackgroundColor: densityColor,
      };
    },
    adjustWidth() {

    },
  },

}
</script>
