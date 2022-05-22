import Spring from './Spring';
import SpringArray from './SpringArray';
import FT from './FT';
import ComplexNumber from './ComplexNumber';

export default class Converter {
  /**
   * Test function which will convert every number within 8 bits
   */
  static test() {
    for (let i = 1; i < 256; i++) {
      const byte = this.byteString(i);
      console.log('Converting byte', byte);
      const k = this.convert(byte);
      console.log('Real value', i, 'Converted value', k);
    }
  }

  /**
   * Returns a number in binary, passed as a string, in its decimal form by the use of springs and Fourier Transform
   * @param bits - the number in binary as a string
   */
  static convert(bits: string): number {
    const spring = this.getSpringFromBits(bits);
    // to be able to use FFT, generate coordinates within time period [0, 2 * pi], with 1024 samples
    const t0 = 0;
    const t1 = 2 * Math.PI;
    const numberOfSamples = 1024;
    const coordinates = this.getOscillations(spring, [t0, t1], numberOfSamples);
    const [amplitudes, frequencies] = this.getFrequencies(
      coordinates,
      (t1 - t0) / numberOfSamples,
    );
    return this.getDecimalFromFrequencies(amplitudes, frequencies);
  }

  /**
   * Returns the equivalent spring from the given byte sequence
   * @param bits - the sequence of 8 bits
   */
  static getSpringFromBits(bits: string): Spring {
    let expression = '[';
    const springs = [];
    for (const [index, bit] of bits.split('').reverse().entries()) {
      if (bit === '1') {
        expression += '{}';
        springs.push(new Spring(2 ** index));
      }
    }
    expression += ']';
    return SpringArray.equivalentSpring(expression, springs);
  }

  /**
   * Returns the oscillations of the given spring
   * set the initial coordinate to 1, and the velocity to 0 (these do not really matter)
   * and use a body with mass 0.001. The smaller the mass of the body is, the more accurate the conversions are, and using a unit mass would give a lot of incorrect results
   * the reason for the small mass is to try to increase the frequencies of the oscillations, because FFT works well on integer values
   * @param spring - the spring sys tem
   * @param timePeriod
   * @param numberOfSamples
   */
  static getOscillations(
    spring: Spring,
    timePeriod: [number, number],
    numberOfSamples: number,
  ): number[] {
    const [t0, t1] = timePeriod;
    const dt = t1 / numberOfSamples;
    const x0 = 1;
    const v0 = 0;
    const m = 0.001;
    return spring.move(t0, t1, dt, x0, v0, m);
  }

  /**
   * Returns the amplitudes and the frequencies from given coordinates using FFT
   * @param coordinates - array of coordinates
   * @param samplingRate - the time period between each coordinate
   */
  static getFrequencies(
    coordinates,
    samplingRate,
  ): [ComplexNumber[], number[]] {
    const amplitudes = FT.fft(coordinates.slice(0, -1));
    const frequencies = FT.fftfreq(amplitudes.length, samplingRate);
    return [amplitudes as ComplexNumber[], frequencies];
  }

  /**
   * Returns the stiffness coefficient of th original spring
   * @param amplitudes - the result of Fourier Transform
   * @param frequencies - the frequencies for which the FFT was done
   */
  static getDecimalFromFrequencies(
    amplitudes: ComplexNumber[],
    frequencies: number[],
  ): number {
    const maxFrequency = FT.findMaxIndex(amplitudes);
    const omega = frequencies[maxFrequency] * 2 * Math.PI; // omega = f * 2 * pi
    return Math.round(omega ** 2 * 0.001); // k = omega^2 * m
  }

  /**
   * Returns a decimal value in its binary form as a string
   * @param n - integer between 0 and 255
   */
  static byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
      throw new Error(n + ' does not fit in a byte');
    }
    return ('000000000' + n.toString(2)).slice(-8);
  }
}
