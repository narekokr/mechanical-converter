import HarmonicMotion from './HarmonicMotion';

export default class Spring {
  private _k: number;

  /**
   * Creates a new Spring object
   * @param k - The stiffness of the spring. 1 by default
   */
  constructor(k = 1) {
    this.k = k;
  }

  /**
   * The stiffness of the spring
   */
  public get k() {
    return this._k;
  }

  /**
   * Private setter for stiffness
   * @param k - the new stiffness
   * @private
   */
  private set k(k) {
    if (k <= 0) {
      throw new Error('Spring constant needs to be positive.');
    }
    this._k = k;
  }

  // overload signatures

  /**
   * Return coordinates of the motion specified by parameters
   * @param t - the time period of the motion
   * @param dt - The time step
   * @param x0 - initial coordinate of the object
   */
  move(t: number, dt: number, x0: number): number[];

  /**
   * Return coordinates of the motion specified by parameters
   * @param t - the time period of the motion
   * @param dt - The time step
   * @param x0 - initial coordinate of the object
   * @param v0 - initial velocity of the object
   */

  move(t: number, dt: number, x0: number, v0: number): number[];
  /**
   * Return coordinates of the motion specified by parameters
   * @param t0 - starting time
   * @param t1 - finishing time
   * @param dt - The time step
   * @param x0 - initial coordinate of the object
   * @param v0 - initial velocity of the object
   */
  move(t0: number, t1: number, dt: number, x0: number, v0: number): number[];

  /**
   * Return coordinates of the motion specified by parameters
   * @param t0 - starting time
   * @param t1 - finishing time
   * @param dt - The time step
   * @param x0 - initial coordinate of the object
   * @param v0 - initial velocity of the object
   * @param m - mass of the object
   */
  move(
    t0: number,
    t1: number,
    dt: number,
    x0: number,
    v0: number,
    m: number,
  ): number[];

  //implementation
  move(
    t0: number,
    t1: number,
    dt: number,
    x0?: number,
    v0?: number,
    m?: number,
  ) {
    if (m) {
      return this._move(t0, t1, dt, x0, v0, m);
    }
    if (v0) {
      return this._move(t0, t1, dt, x0, v0, 1);
    }
    if (x0) {
      return this._move(0, t0, t1, dt, x0, 1);
    }
    return this._move(0, t0, t1, dt, 0, 1);
  }

  // helper function
  private _move(
    t0: number,
    t1: number,
    dt: number,
    x0: number,
    v0: number,
    m: number,
  ): number[] {
    const omega = Math.sqrt(this.k / m);
    const A = x0;
    const B = v0 / omega;
    const harmonicMotion = new HarmonicMotion(A, B, omega);
    const coordinates = [];
    const generator = harmonicMotion.coordinatesGenerator(t0, t1, dt);
    for (const coordinate of generator) {
      coordinates.push(coordinate);
    }
    return coordinates;
  }

  /**
   * returns a new Spring connected to the current spring in series
   * @param that
   */
  inSeries(that: Spring): Spring {
    return Spring.inSeries(this, that);
  }

  /**
   * returns a new Spring connected to the current spring in parallel
   * @param that - the spring to connect to
   */
  inParallel(that: Spring): Spring {
    return Spring.inParallel(this, that);
  }

  /**
   * returns a new Spring connected in series
   * @param springOne - the first spring
   * @param springTwo - the second spring
   */
  static inSeries(springOne: Spring, springTwo: Spring) {
    const k = (springOne.k * springTwo.k) / (springOne.k + springTwo.k);
    return new Spring(k);
  }

  /**
   * returns a new Spring connected in parallel
   * @param springOne - the first spring
   * @param springTwo - the second spring
   */
  static inParallel(springOne: Spring, springTwo: Spring) {
    const k = springOne.k + springTwo.k;
    return new Spring(k);
  }
}
