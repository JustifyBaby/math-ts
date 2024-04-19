import { Analysis, AnalysisXY } from "types";

const analysis = (...datas: number[]): Analysis => {
  let sum = 0; // 初期値
  let distributedSum = 0; //初期値

  datas.map((data) => {
    sum += data; // 合計。
    distributedSum += data ** 2; // 自乗の合計
  });

  const avg = sum / datas.length; //平均

  const dist = distributedSum / datas.length - avg ** 2; //偏差の二乗の平均（分散）

  const standard = Math.sqrt(dist);

  return {
    sum: sum, //データの合計値
    average: avg, //データの平均値
    distributed: dist, //データの分散
    standard: standard, //データの標準偏差
  };
};

const analysisXY = (...datasXY: number[][]): AnalysisXY => {
  // 合計
  let sumX = 0;
  let sumY = 0;

  // 分散
  let distSumX = 0;
  let distSumY = 0;

  // 2次元から1次元に変換
  const datasX = datasXY[0];
  const datasY = datasXY[1];

  // 合計を求める
  datasX.map((dataX) => {
    sumX += dataX;
    distSumX += dataX ** 2;
  });

  datasY.map((dataY) => {
    sumY += dataY;
    distSumY += dataY ** 2;
  });

  // 平均を求める
  const avgX = sumX / datasX.length;
  const avgY = sumY / datasX.length;

  // 分散を求める
  const distX = (distSumX - avgX ** 2) / datasX.length;
  const distY = (distSumY - avgY ** 2) / datasX.length;

  // 標準偏差
  const standardX = Math.sqrt(distX);
  const standardY = Math.sqrt(distY);

  // 共分散
  let share = 0;
  for (let i in datasX) {
    const deviationX = datasX[i] - avgX;
    const deviationY = datasY[i] - avgY;
    share += deviationX * deviationY;
  }

  const covariance = share / datasX.length;

  // 相関係数
  const correlation = covariance / (standardX * standardY);

  return {
    sum: {
      x: sumX,
      y: sumY,
    },
    average: {
      x: avgX,
      y: avgY,
    },
    distributed: {
      x: distX,
      y: distY,
    },
    standard: {
      x: standardX,
      y: standardY,
    },
    covariance: covariance,
    correlation: correlation,
  };
};
