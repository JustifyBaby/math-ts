type Analysis = {
  sum: number; //データの合計値
  average: number; //データの平均値
  distributed: number; //データの分散
  standard: number; //データの標準偏差
};

type AnalysisXY = {
  sum: {
    x: number;
    y: number;
  };
  average: {
    x: number;
    y: number;
  };
  distributed: {
    x: number;
    y: number;
  };
  standard: {
    x: number;
    y: number;
  };
  covariance: number;
  correlation: number;
};

export type { Analysis, AnalysisXY };
