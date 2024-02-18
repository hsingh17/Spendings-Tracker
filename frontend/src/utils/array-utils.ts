const ArrayUtils = {
  spreadEvenly(arr: Array<never>, desiredLength: number): Array<never> {
    const N = arr.length;
    const step = Math.ceil(N / desiredLength);
    const ret: Array<never> = [];

    for (let i = 0; i < N; i += step) {
      ret.push(arr[i]);
    }

    return ret;
  },
};

export default ArrayUtils;
