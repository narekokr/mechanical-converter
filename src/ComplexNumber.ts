export default class ComplexNumber {
  re: number;
  im: number;

  /**
   * creates a new complex number
   * @param re - the real part of the number
   * @param im - the imaginary part of the number
   */
  constructor(re: number, im = 0) {
    this.re = re;
    this.im = im;
  }

  add(num: ComplexNumber, dest: ComplexNumber): ComplexNumber {
    dest.re = this.re + num.re;
    dest.im = this.im + num.im;
    return dest;
  }

  sub(num: ComplexNumber, dest: ComplexNumber): ComplexNumber {
    dest.re = this.re - num.re;
    dest.im = this.im - num.im;
    return dest;
  }

  mul(num: ComplexNumber, dest): ComplexNumber {
    const r = this.re * num.re - this.im * num.im;
    dest.im = this.re * num.im + this.im * num.re;
    dest.re = r;
    return dest;
  }

  cexp(dest: ComplexNumber): ComplexNumber {
    const er = Math.exp(this.re);
    dest.re = er * Math.cos(this.im);
    dest.im = er * Math.sin(this.im);
    return dest;
  }

  toString() {
    return this.re + ' ' + this.im;
  }
}
