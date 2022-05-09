import ComplexNumber from './ComplexNumber';

export default class FT {
  /**
   * an implementation of the Cooley–Tukey FFT algorithm
   * @param amplitudes - an array of the amplitudes. Its length must be a factor of 2
   */
  static fft(
    amplitudes: number[] | ComplexNumber[],
  ): number[] | ComplexNumber[] {
    const N = amplitudes.length;
    if (N <= 1) return amplitudes;

    const hN = N / 2;
    let even = [];
    let odd = [];
    even.length = hN;
    odd.length = hN;
    for (let i = 0; i < hN; ++i) {
      even[i] = amplitudes[i * 2];
      odd[i] = amplitudes[i * 2 + 1];
    }
    even = this.fft(even);
    odd = this.fft(odd);

    const a = -2 * Math.PI;
    for (let k = 0; k < hN; ++k) {
      if (!(even[k] instanceof ComplexNumber)) {
        even[k] = new ComplexNumber(even[k], 0);
      }
      if (!(odd[k] instanceof ComplexNumber)) {
        odd[k] = new ComplexNumber(odd[k], 0);
      }
      const p = k / N;
      const t = new ComplexNumber(0, a * p);
      t.cexp(t).mul(odd[k], t);
      amplitudes[k] = even[k].add(t, odd[k]);
      amplitudes[k + hN] = even[k].sub(t, even[k]);
    }
    return amplitudes;
  }

  /**
   * TS implementation of numpy's {@link https://numpy.org/doc/stable/reference/generated/numpy.fft.fftfreq.html|fftfreq} function
   */
  static fftfreq(n: number, d = 1): number[] {
    const val = 1 / (n * d);
    const N = Math.floor((n - 1) / 2) + 1;
    const p1 = this.arange(0, N);
    const p2 = this.arange(-Math.floor(n / 2), 0);
    return p1.concat(p2).map((num) => num * val);
  }

  /**
   * TS implementation of numpy's {@link https://numpy.org/doc/stable/reference/generated/numpy.arange.html|arange} function
   */
  static arange(start: number, stop: number, step = 1): number[] {
    const array = [];
    for (let i = start; i < stop; i += step) {
      array.push(i);
    }
    return array;
  }
}
