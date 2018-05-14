<template>
  <div>
    <chart :datasets="points" :chart-opt="chartOpts" :type="'scatter'"></chart>
    <chart :datasets="heatData" :chart-opt="chartOpts" :type="'scatter'"></chart>
  </div>
</template>
<style>
  .colorMap {
    background: rgb(255, 73, 73);
    background-color: rgb(199, 120, 1);
    color: rgb(97, 199, 1);
  }
</style>
<script>
import { default as Util } from '../util';
import { default as Chart } from '../base-components/chart.vue';

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
      pointsClone: {},
      heatData: [],
      chartOpts: {
        animation: {
            duration: 0, // general animation time
        },
      },
      colorMap: ['#']
    };
  },
  beforeMount() {
    console.warn(`beforeMount. prepare data..`);
    var pointDataset = {
      label: 'random points',
      data: this.randPoints(2000),
      pointBackgroundColor: 'rgba(255, 73, 73, .4)',
    };
    // backup points data before passing into chart..
    this.pointsClone = Util.deepClone(pointDataset);
    
    setTimeout(() => {
      this.points.push(pointDataset);
      console.warn(`computing Density data...`);
      this.heatData.push(this.getDensityData());
    }, 0);
  },
  mounted() {
    console.warn(`mounted..`);
  },
  computed: {

  },
  methods: {
    randPoints(n) {
      let arr = [];
      for (let i = 0; i < n; i++) {
        arr[i] = {
          x: this.randInt(),
          y: this.randInt(),
        };
      }
      console.warn(`generate ${n} points.`);
      return arr;
    },
    randInt(min = 0, max = 100) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getDensityData() {
      const densityData = this.computeDensity(100, 5);
      const densityColor = this.getColors(densityData);
      return {
        label: 'Heat Map',
        data: densityData,
        pointRadius: 2,
        pointStyle: 'rect',
        pointBackgroundColor: densityColor,
      };
    },
    // complex.. O(??) depend on points Number
    computeDensity(n, radius) {
      let densitySet = [];
      let sortedXpoints = this.sortX(this.pointsClone.data);
      console.warn(`starting to calcDensity ${n}x${n}, pntsNumber: ${sortedXpoints.length}`);
      console.time();
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          // for each cell, compute points density/valDensity in radius.
          let pntsInRad = [], pntsCount = 0;
          for (let k in sortedXpoints) {
            if (Math.abs(sortedXpoints[k].x - i) > radius) break;
            const dist = this.calcDist(sortedXpoints[k], i, j);
            if (dist < radius) pntsCount += 1; // if valDensity, pntsCount += point.value..
          }
          if (pntsCount > 0) densitySet.push({ x: i, y: j, value: pntsCount});
        }
      }
      console.timeEnd();
      return densitySet;
    },
    getColors(densitySet) {
      let colorArr = [], index = 0;
      const desDensity = densitySet.sort((a, b) => { return a.value < b.value; });
      const max = desDensity[0].value, min = desDensity[desDensity.length - 1].value;
      desDensity.forEach((ele) => {
        // set Color by its density.
        index += 1;
        console.warn(`x:${ele.x}, ${ele.y},
          val:${ele.value}`);
        const ratio = (ele.value - min) / (max - min);
        colorArr.push(`rgba(${97 + ratio * (255 - 97)}, ${199 - ratio * (199 - 73)}, ${1 + ratio * (73)})`);
      });
      return colorArr;
    },
    calcDist(pnt, centX, centY) {
      return Math.sqrt((centX - pnt.x) ** 2 + (centY - pnt.y) ** 2);
    },
    sortX(arr) {
      if (Array.isArray(arr)) {
        return arr.sort(function(a, b) {
          return a.x > b.x;
        });
      }
      console.warn(`input not Array..`);
      return [];
    },
    sortY(arr) {
      if (Array.isArray(arr)) {
        return arr.sort(function(a, b) {
          return a.y > b.y;
        });
      }
      console.warn(`input not Array..`);
      return [];
    },
  },

}
</script>
