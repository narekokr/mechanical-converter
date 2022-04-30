export default class HarmonicMotion {
  /**
   * Creates a new Harmonic Motion simulation.
   * @param A - coefficient in front of cosine
   * @param B - coefficient in front of sine
   * @param omega - the angular frequency
   */
  constructor(
    private readonly A: number,
    private readonly B: number,
    private readonly omega: number,
  ) {
    if (omega < 0) {
      throw new Error('Omega cannot be negative');
    }
    this.A = A;
    this.B = B;
    this.omega = omega;
  }

  /**
   * Returns a generator, which can be used to obtain coordinates based on given parameters
   * @param t0 - staring time
   * @param t1 - finishing time
   * @param dt - time step
   */
  *coordinatesGenerator(t0: number, t1: number, dt: number) {
    for (let currentTime = t0; currentTime < t1; currentTime += dt) {
      yield this.getCoordinate(currentTime);
    }
  }

  /**
   * Returns the coordinate of the body at the given time. It is calculated using the formula A*cos(ω*t) + B*cos(ω * t)
   * @param t - the time
   */
  getCoordinate(t: number) {
    return (
      this.A * Math.cos(this.omega * t) + this.B * Math.sin(this.omega * t)
    );
  }
}
