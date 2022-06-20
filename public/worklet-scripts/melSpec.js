/**
 * This file is based on
 * https://github.dev/magenta/magenta-js/blob/master/music/src/transcription/audio_utils.ts
 */
import { FFT } from './fft.js';

export const melSpecVec = (y, sr, nFft) => {
  const _stftVec = stftVec(y, nFft);
  const _powerSpecVec = powerSpecVec(_stftVec);
  const melFilterbank = createMelFilterbank(sr, nFft);
  return applyFilterbank(_powerSpecVec, melFilterbank);
};

/**
 * Convert a power spectrogram (amplitude squared) to decibel (dB) units
 */
export const powerToDb = (
  specVec,
  amin = 1e-10,
  topDb = 80.0,
) => {
  const l = specVec.length;
  const logSpecVec = new Float32Array(l);
  for (let i = 0; i < l; i++) {
    logSpecVec[i] =
      10.0 * Math.log10(Math.max(amin, specVec[i]));
  }
  if (topDb) {
    if (topDb < 0) {
      throw new Error(`topDb must be non-negative.`);
    }
    const maxVal = max(logSpecVec);
    for (let i = 0; i < l; i++) {
      logSpecVec[i] = Math.max(
        logSpecVec[i],
        maxVal - topDb,
      );
    }
  }
  return logSpecVec;
};

/**
 * Calculate magnitudeSpectrogram from stft
 */
const powerSpecVec = (stftVec) => {
  return pow(mag(stftVec), 2.0);
};

/**
 * Calculate STFT (returns 1-DcomplexArray [real0, imag0, real1, imag1, ...])
 * Length of each complexArray = nFft + 2 #This is twice of (1 + nFft//2)
 */
const stftVec = (y, nFft) => {
  let fftWindow = hannWindow(nFft);
  const freqL = nFft + 2;
  const _stftVec = new Float32Array(freqL);
  const winBuffer = applyWindow(y, fftWindow);
  const col = fft(winBuffer);
  _stftVec.set(col.slice(0, freqL));
  return _stftVec;
};

const applyFilterbank = (mags, filterbank) => {
  if (mags.length !== filterbank[0].length) {
    throw new Error(
      `Each entry in filterbank should have dimensions ` +
        `matching FFT. |mags| = ${mags.length}, ` +
        `|filterbank[0]| = ${filterbank[0].length}.`,
    );
  }

  // Apply each filter to the whole FFT signal to get one value.
  const out = new Float32Array(filterbank.length);
  for (let i = 0; i < filterbank.length; i++) {
    // To calculate filterbank energies we multiply each filterbank with the
    // power spectrum.
    const win = applyWindow(mags, filterbank[i]);
    // Then add up the coefficents.
    out[i] = win.reduce((a, b) => a + b);
  }
  return out;
};

const applyWindow = (buffer, win) => {
  const out = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = win[i] * buffer[i];
  }
  return out;
};

const createMelFilterbank = (sr, nFft) => {
  const fMin = 0;
  const fMax = sr / 2;
  const nMels = 128;

  // Center freqs of each FFT band.
  const fftFreqs = calculateFftFreqs(sr, nFft);
  // (Pseudo) center freqs of each Mel band.
  const melFreqs = calculateMelFreqs(nMels + 2, fMin, fMax);

  const melDiff = internalDiff(melFreqs);
  const ramps = outerSubtract(melFreqs, fftFreqs);
  const filterSize = ramps[0].length;

  const weights = [];
  for (let i = 0; i < nMels; i++) {
    weights[i] = new Float32Array(filterSize);
    for (let j = 0; j < ramps[i].length; j++) {
      const lower = -ramps[i][j] / melDiff[i];
      const upper = ramps[i + 2][j] / melDiff[i + 1];
      const weight = Math.max(0, Math.min(lower, upper));
      weights[i][j] = weight;
    }
  }

  // Slaney-style mel is scaled to be approx constant energy per channel.
  for (let i = 0; i < weights.length; i++) {
    // How much energy per channel.
    const enorm = 2.0 / (melFreqs[2 + i] - melFreqs[i]);
    // Normalize by that amount.
    weights[i] = weights[i].map((val) => val * enorm);
  }

  return weights;
};

const fft = (y) => {
  const fft = new FFT(y.length);
  const out = fft.createComplexArray();
  const data = fft.toComplexArray(y, null);
  fft.transform(out, data);
  return out;
};

const hannWindow = (length) => {
  const win = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    win[i] =
      0.5 *
      (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
  }
  return win;
};

const linearSpace = (start, end, count) => {
  // Include start and endpoints.
  const delta = (end - start) / (count - 1);
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = start + delta * i;
  }
  return out;
};

/**
 * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
 * calculates the energies. Output is half the size.
 */
const mag = (y) => {
  const out = new Float32Array(y.length / 2);
  for (let i = 0; i < y.length / 2; i++) {
    out[i] = Math.sqrt(
      y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1],
    );
  }
  return out;
};

const hzToMel = (hz, htk = false) => {
  if (htk) {
    return 2595.0 * Math.log10(1 + hz / 700.0);
  }

  const f_min = 0.0;
  const f_sp = 200.0 / 3;

  let mel = (hz - f_min) / f_sp;

  const min_log_hz = 1000.0;
  const min_log_mel = (min_log_hz - f_min) / f_sp;
  const logstep = Math.log(6.4) / 27.0;

  if (hz >= min_log_hz) {
    mel = min_log_mel + Math.log(hz / min_log_hz) / logstep;
  }

  return mel;
};

const melToHz = (mel, htk = false) => {
  if (htk) {
    return 700.0 * (Math.exp(mel / 1125.0) - 1);
  }

  const f_min = 0.0;
  const f_sp = 200.0 / 3;
  let freq = f_min + f_sp * mel;

  const min_log_hz = 1000.0;
  const min_log_mel = (min_log_hz - f_min) / f_sp;
  const logstep = Math.log(6.4) / 27.0;

  if (mel >= min_log_mel) {
    freq =
      min_log_hz * Math.exp(logstep * (mel - min_log_mel));
  }

  return freq;
};

const calculateFftFreqs = (sampleRate, nFft) => {
  return linearSpace(
    0,
    sampleRate / 2,
    Math.floor(1 + nFft / 2),
  );
};

const calculateMelFreqs = (nMels, fMin, fMax) => {
  const melMin = hzToMel(fMin);
  const melMax = hzToMel(fMax);

  // Construct linearly spaced array of nMel intervals, between melMin and
  // melMax.
  const mels = linearSpace(melMin, melMax, nMels);
  const hzs = mels.map((mel) => melToHz(mel));
  return hzs;
};

const internalDiff = (arr) => {
  const out = new Float32Array(arr.length - 1);
  for (let i = 0; i < arr.length; i++) {
    out[i] = arr[i + 1] - arr[i];
  }
  return out;
};

const outerSubtract = (arr, arr2) => {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out[i] = new Float32Array(arr2.length);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      out[i][j] = arr[i] - arr2[j];
    }
  }
  return out;
};

const pow = (arr, power) => {
  return arr.map((v) => Math.pow(v, power));
};

const max = (arr) => {
  return arr.reduce((a, b) => Math.max(a, b));
};
