import Spring from './Spring';
import SpringArray from './SpringArray';
import FT from './FT';

// some randomly selected starting conditions
const t0 = 5;
const t1 = 10;
const dt = 0.5;
const x0 = 3;
const v0 = 1;
const m0 = 2;

// demonstration
console.log(
  SpringArray.equivalentSpring('{[{}{}][]}', [
    new Spring(10),
    new Spring(10),
    new Spring(10),
  ]).k,
);

console.log(
  SpringArray.equivalentSpring('{[{[][{}{}]}{}][]}', [
    new Spring(1),
    new Spring(2),
    new Spring(3),
    new Spring(4),
    new Spring(5),
  ]).k,
);

const spring = SpringArray.equivalentSpring('{[[][]][{}{}{[][]}][{}{}]}');
console.log(spring.move(t0, t1, dt, x0, v0, m0));

console.log(FT.fft([0, 1, 2, 3]));
