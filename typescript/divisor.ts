export class Divisor {
  num: number;
  constructor(num: number) {
    this.num = num;
  }

  // 整数によるnumの約数を演算
  getIntDivisors(numII: number): number[] {
    // 初期配列
    const results = [];

    const limit = numII ? numII : this.num;

    // 1 -> numまでの数
    for (let i = 1; i <= limit; i++) {
      // num / iのあまりが0の数を追加。
      if (limit % i === 0) results.push(i);
    }
    return results;
  }

  getPrimeNums(numII: number): number[] {
    let limit = numII ? numII : this.num;
    // 2 -> num までの素数を格納する配列
    const primeNums = [];

    // 2 -> num までの素数を生成。
    for (let n = 2; n <= limit; n++) {
      let divisor = this.getIntDivisors(n);
      if (divisor.length === 2) {
        primeNums.push(n);
      }
    }
    return primeNums;
  }

  // 素因数分解
  primeFactorization(numII: number): number[] {
    // 引数numの複製(後に再代入するため。)
    let usingNum = numII ? numII : this.num;
    // 素数集合
    let primeNums = this.getPrimeNums(usingNum);
    // 素因数を保管する配列。
    let factorizations = [];

    for (let prime in primeNums) {
      // 生成した素数であまりが０でなくなるまで割る。
      while (usingNum % primeNums[prime] === 0) {
        factorizations.push(primeNums[prime]);
        // ここで再代入しないと無限ループになる。
        usingNum = usingNum / primeNums[prime];
      }
    }
    return factorizations;
  }

  // a√bの形にするメソッド
  // root(48->2*3*3) = 3*root(2)
  sqrtMathNotation(numII: number): number[][] {
    const judge = numII ? numII : this.num;
    const outSqrts = [];

    console.log("This is sqrtMath");

    const squares = this.primeFactorization(judge);
    for (const square in squares) {
      const i = parseInt(square);
      if (squares[i] === squares[i + 1]) {
        outSqrts.push(squares[i]);
        squares.splice(i, 2);
      }
    }

    if (outSqrts.length !== 1) {
      // outSqrtの和を格納
      let sqrtSum = 1;
      for (const sqrt of outSqrts) {
        sqrtSum *= sqrt;
      }
      outSqrts[0] = sqrtSum;
      outSqrts.splice(1, outSqrts.length);
    }

    return [outSqrts, squares];
  }

  approx(child: number, mother: number) {
    let kid = child;
    let mom = mother;

    let primeOfMin;
    if (child === mother) {
      return [1, 1];
    } else if (child < mother) {
      primeOfMin = this.getPrimeNums(child);
    } else {
      primeOfMin = this.getPrimeNums(mother);
    }

    for (let min in primeOfMin) {
      let div = primeOfMin[min];

      if (kid % div === 0 && mom % div === 0) {
        while (kid % div === 0 && mom % div === 0) {
          kid = kid / div;
          mom = mom / div;
        }
      }
    }
    return [kid, mom];
  }

  // 互除法を行う。
  gcdByMutual(a: number, b: number): number {
    let a2 = a,
      b2 = b,
      isDecimal,
      times = 0;
    const memoA = [];
    const memoB = [];

    if (a2 % 1 !== 0 || b2 % 1 !== 0) {
      while (a2 % 1 !== 0 || b2 % 1 !== 0) {
        a2 = a2 * 10;
        b2 = b2 * 10;
        isDecimal = false;
        times++;
      }
    } else {
      isDecimal = true;
    }

    while (a2 % b2 !== 0) {
      let a2_copy = a2;
      a2 = b2;
      b2 = a2_copy % b2;
      memoA.push(a2);
      memoB.push(b2);
    }

    if (!isDecimal) {
      b2 = b2 / 10 ** times;
    }

    return b2;
  }

  // 最小公倍数。
  lcm(a = 60, b = 72) {
    const gcd = this.gcdByMutual(a, b);
    return (a * b) / gcd;
  }
}

const n_arySystemTo10 = (num: number, n_ary: number) => {
  if (n_ary <= 1) throw new Error("n_ary must be more than 2!!");
  if (num % 1 !== 0 || n_ary % 1 !== 0)
    throw new TypeError("num or n_ary must be integer!!");
  const strNum = String(num);
  let val = 0;
  for (const i in [...strNum]) {
    // 桁数は反転させる
    // "110101" -> "1*2^5 + 1*2^4 ..."
    const ni = parseInt(i);
    let digit = parseInt(strNum[strNum.length - 1 - ni]);
    val += n_ary ** ni * digit;
  }
  return val;
};

const ten_arySystemToN_ary = (num: number, n_ary: number) => {
  let limit = num;
  let val = "";
  while (limit > 0) {
    limit = Math.floor(limit / n_ary);
    val += String(limit % n_ary);
    console.log(val);
  }
  return parseInt(val);
};
