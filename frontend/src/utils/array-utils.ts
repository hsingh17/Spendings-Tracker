const ArrayUtils = {
  spreadEvenly(arr: Array<any>, desiredLength: number): Array<any> {
    const N = arr.length;
    const step = Math.ceil(N / desiredLength);
    const ret: Array<any> = [];

    for (let i = 0; i < N; i += step) {
      ret.push(arr[i]);
    }

    return ret;
  }
};

export default ArrayUtils;