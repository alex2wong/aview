export class HeatMap {
// complex.. O(??) depend on points Number, points: {x,y}[]
  static computeDensity(points, radius=5) {
    let densityData = [];
    let minDens = 99999;
    let maxDens = 0;
    let dataStats = this.statsData(points);
    let sortedXpoints = this.sortX(points);
    // this.sortY(points);
    console.warn(`starting to calcDensity , pntsNumber: ${sortedXpoints.length}`);
    console.time();
    let radiusPow = radius ** 2;
    for (let i = dataStats.xMin + 1; i < dataStats.xMax; i++) {
      for (let j = dataStats.yMin + 1; j < dataStats.yMax; j++) {
        // for each cell, compute points density/valDensity in radius.
        let pntsInRad = [], pntsCount = 0;
        for (let k in sortedXpoints) {
          if (sortedXpoints[k].x - i > radius) break;
          if (sortedXpoints[k].x < i - radius) continue;
          const dist = this.calcDist(sortedXpoints[k], i, j);
          if (dist < radiusPow) pntsCount += 1; // if valDensity, pntsCount += point.value..
          maxDens = pntsCount > maxDens ? pntsCount: maxDens;
          minDens = pntsCount < minDens ? pntsCount: minDens;
        }
        if (pntsCount > 0) densityData.push({ x: i, y: j, value: pntsCount});
      }
    }
    console.timeEnd();
    return {
      densityData,
      minDens,
      maxDens,
    };
  }

  static getColors(densitySet) {
    let colorArr = [], index = 0;
    const { densityData } = densitySet;
    const minDens = densitySet.minDens;
    const maxDens = densitySet.maxDens; 
    densityData.forEach((ele) => {
      // set Color by its density.
      index += 1;
      // console.warn(`x:${ele.x}, ${ele.y},
      //   val:${ele.value}`);
      const ratio = (ele.value - minDens) / (maxDens - minDens);
      colorArr.push(`rgba(${Math.round(20 + ratio * (255 - 20))}, 30,${Math.round(1 + ratio * (250))})`);
      // colorArr.push(`rgba(${Math.round(20 + ratio * (250 - 20))}, 60,${Math.round(200 - ratio * (200))})`);
    });
    return colorArr;
  }

  static calcDist(pnt, centX, centY) {
    return (centX - pnt.x) ** 2 + (centY - pnt.y) ** 2;
  }

  static sortX(arr) {
    if (Array.isArray(arr)) {
      return arr.sort(function(a, b) {
        return a.x - b.x;
      });
    }
    console.warn(`input not Array..`);
    return [];
  }

  static sortY(arr) {
    if (Array.isArray(arr)) {
      return arr.sort(function(a, b) {
        return a.y - b.y;
      });
    }
    console.warn(`input not Array..`);
    return [];
  }

  static statsData(points) {
    var xMax = Math.max(...points.map((p) => { return p.x }));
    var xMin = Math.min(...points.map((p) => { return p.x }));
    var yMax = Math.max(...points.map((p) => { return p.y }));
    var yMin = Math.min(...points.map((p) => { return p.y }));
    return {
      xMax, xMin, yMax, yMin
    };
  }
}