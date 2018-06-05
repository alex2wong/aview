
export function dingInvest(
  stockData,
  intervalDate = 7,
  totalCnt = 52,
  investVal = 1000,
  maxRet = .10,
  startDate = '2016-01-04') 
{
  let totalMoney = 0;
  let preDate = startDate;
  let investDateArr = [startDate];
  for (let i = 1; i <= totalCnt; i++) {
    // get floatRate of this range dates.
    const preDate = moveDate(startDate, intervalDate * (i -1));
    const curDate = moveDate(startDate, intervalDate * i);
    const floatRate = getFloatRate(stockData, preDate, curDate);
    if (floatRate < -1) {
      console.warn(`Seems date ${preDate} or ${curDate} out of real stockData`);
      // break;
    } else {
      investDateArr.push(curDate);
    }
    totalMoney += investVal;
    totalMoney *= (1 + floatRate);
  }
  const totalInvest = totalCnt * investVal; 
  const totalEarnRate = (totalMoney - totalInvest) / totalInvest;
  return {
    totalInvest,
    totalMoney,
    totalEarnRate,
    investDateArr,
  };
}

/**
 * if date out of range, return val < -1;
 * @param {*} stockData 
 * @param {*} startDate 
 * @param {*} endDate 
 */
export function getFloatRate(stockData, startDate, endDate) {
  const startPrice = getPrice(stockData, startDate);
  let endPrice = getPrice(stockData, endDate);
  // need to handle date out of stockData..
  if (startPrice === 0 || endPrice === 0) return 0;
  return (endPrice - startPrice) / startPrice;
}

function _parseDate(date) {
  if (typeof date === 'string') {
    const arr = date.split('-');
    return new Date(arr[0], arr[1], arr[2]);
  } else return date;
}

/**
 * get date after offset.
 * @param {*curDate: string format 'yyyy-mm-dd'} curDate 
 * @param {*offset date number: number} offset 
 */
function moveDate(curDate, offset = 7) {
  let d = _parseDate(curDate);
  d.setDate(d.getDate() + offset);
  const month = d.getMonth() + 1;
  const date = d.getDate();
  return `${d.getFullYear()}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date}`;
}

// return recent days Mean Stock Price. 30days, 10days or .. 360days..
export function kMean(stockData, days = 30, curDate) {
  for (let code in stockData) {
    let kdays = stockData[code];
    kdays.forEach(element => {
      
    });
  }
}

/**
 * get the stock price on specific date..
 * @param {*date string formatted: yyyy-mm-dd} date 
 */
export function getPrice(stockData, date) {
  for (let code in stockData) {
    let kdays = stockData[code];
    for (let i = 0; i < kdays.length; i++) {
      const element = kdays[i];
      if (element[0] === date) {
        return Number(element[1]);
      }
    }
  }
  // console.warn(`check input date ${date}, may not included in stockData`);
  return 0;
}


function _getNearestDate(stockData, date) {
  let temp = '';
  for (let code in stockData) {
    let kdays = stockData[code];
    for (let i = 0; i < kdays.length; i++) {
      const element = kdays[i];
      if (element[0] === date) {
        return Number(element[1]);
      }
    }
  }
}
