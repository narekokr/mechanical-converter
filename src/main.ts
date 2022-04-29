import Spring from './Spring';

// some randomly selected starting conditions
const t0 = 5;
const t1 = 10;
const dt = 0.5;
const x0 = 3;
const v0 = 1;
const m0 = 2;

// demonstration
const defaultSpring = new Spring();
console.log('Printing results with spring with default stiffness');
console.log(defaultSpring.move(t0, dt, x0));
console.log(defaultSpring.move(t0, dt, x0, v0));
console.log(defaultSpring.move(t0, t1, dt, x0, v0));
console.log(defaultSpring.move(t0, t1, dt, x0, v0, m0));

const k = 0.5;
const spring = new Spring(k);
console.log('Printing results with spring with stiffness 0.5');
console.log(spring.move(t0, dt, x0));
console.log(spring.move(t0, dt, x0, v0));
console.log(spring.move(t0, t1, dt, x0, v0));
console.log(spring.move(t0, t1, dt, x0, v0, m0));
