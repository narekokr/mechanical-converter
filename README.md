# Mechanical converter

## Installation

Install [NodeJS](https://nodejs.org/en/download/) and run the following command in project directory
```bash
npm ci
```

## Running the app

```bash
# building the app
npm run build

# running the build
npm run start:build

# running without build
npm start

# to run a specific file
ts-node path-to-file
```
# Features

### Spring
A class which can be used to simulate a spring by giving stiffness coefficient. It uses the class HarmonicMotion to simulate the motion

### SpringArray

A class which can be used to decipher an expression of springs connected in series or parallel and return the equivalent spring

### ComplexNumber

A basic implementation of complex numbers. Supports addition, subtraction, multiplication and complex exponential

### FT

A class for Fourier Transform. It is using the Fast Fourier Transform method

# References

1. [Fast Fourier Transform](https://rosettacode.org/wiki/Fast_Fourier_transform#)
2. [fftfreq](https://numpy.org/doc/stable/reference/generated/numpy.fft.fftfreq.html)