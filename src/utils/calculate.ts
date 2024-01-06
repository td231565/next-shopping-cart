const addDecimals = (num: number): number =>
  Number((Math.round(num * 100) / 100).toFixed(2));
