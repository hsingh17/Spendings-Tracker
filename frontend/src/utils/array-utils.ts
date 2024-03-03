const ArrayUtils = {
  spreadEvenly<T>(arr: T[], desiredLength: number): T[] {
    const N = arr.length;
    const step = Math.ceil(N / desiredLength);
    const ret: T[] = [];

    for (let i = 0; i < N; i += step) {
      ret.push(arr[i]);
    }

    return ret;
  },
};

export default ArrayUtils;
