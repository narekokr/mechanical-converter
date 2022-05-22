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

### Converter

A class which can be used to convert an input of 8 bits (passed as a string) to its decimal value by using Fourier Transform

# How it works

To convert a sequence of bits to its decimal form, the following spring system can be used. First, make 8 springs, each having 2<sup>n</sup> unit springs connected in parallel, where n ranges from 0 to 7.
For example if n = 4, connect 16 springs in parallel. 

Then, after having the 8 springs, make a new system connecting all of them in parallel. This new system can be used for converting the inputs
Based on the input sequence replace 0s with a simple rod and keep 1s with their respective springs made above by their index. 
For example, if the input is 01001001, let the 1st, 4th and 7th springs stay connected, and replace the rest with rods.

Essentially, the stiffness of the spring system is going to be equal to the decimal value of the input byte. Using this information we can make measurements by connecting a body to the system and apply Fourier Transform to compute the frequency of the oscillations.
Because FFT requires an input size of a power of 2, we can do 1024 measurements in the period [0, 2π]. The resulting frequency is equal to ω / 2π, where ω = square root of k / m. So k = (2πf)<sup>2</sup>.
In order to get accurate results, the frequencies need to be large enough, which can be done by decreasing the value of m


# References

1. [Fast Fourier Transform](https://rosettacode.org/wiki/Fast_Fourier_transform#)
2. [fftfreq](https://numpy.org/doc/stable/reference/generated/numpy.fft.fftfreq.html)