// 順列を吐き出す関数。(引数は、nPrに対応。)
const permutation = (n: number, r: number) => {
  // nを隔離
  let result = n;

  for (let i = 1; i < r; i++) {
    result *= n - i;
  }
  return result;
};

const factorial = (n: number) => permutation(n, n);

// 組み合わせを吐き出す関数
const combination = (n: number, r: number) => permutation(n, r) / factorial(r);

// 反復試行の確率を吐き出す関数
const repeatTry = (piece: number, hit: number, probability: number) => {
  // 反復試行の確率の公式 ⇒ P = nCr(p^n*(1-p)^(n-r))
  //p^n
  const remainder = 1 - probability;
  const power_probability = probability ** hit;

  //(1-p)^(n-r)
  const remainder_power_probability = remainder ** (piece - hit);

  return (
    combination(piece, hit) * power_probability * remainder_power_probability
  );
};

// 期待値を吐き出す関数。
const expected = (probability_variables: number[], probabilities: number[]) => {
  // probability_variablesと、probabilitiesの要素数が正常かの判定。
  if (probability_variables.length !== probabilities.length) {
    console.error(
      `probability_variables.length is ${probability_variables.length},
      but probabilities.length = ${probabilities.length}
      Their length must be same value.`
    );
  }

  // probability_variables[any] * probabilities[any]の合計
  let result = 0;
  for (let probability in probabilities) {
    result += probabilities[probability] * probability_variables[probability];
  }

  return result;
};

export { permutation, factorial, combination, repeatTry, expected };
