/**
 * This file is based on
 * https://github.dev/magenta/magenta-js/blob/master/music/src/transcription/audio_utils.ts
 */
import FFT from 'fft.js';

/**
 * Parameters for computing a spectrogram from audio.
 */
interface SpecParams {
  hopLength?: number;
  winLength?: number;
  nFft?: number;
  center?: boolean;
}

interface MelParams extends SpecParams {
  sampleRate: number;
  nMels?: number;
  fMin?: number;
  fMax?: number;
}

export const amplitudeSpectrogram = (
  y: Float32Array,
  params: SpecParams,
): Float32Array[] => {
  const power = 1.0;
  const stftMatrix = stft(y, params);
  const [spec, ..._] = magSpectrogram(stftMatrix, power);
  return spec;
};

export const melSpectrogram = (
  y: Float32Array,
  params: MelParams,
): Float32Array[] => {
  const power = 2.0;
  const stftMatrix = stft(y, params);
  const [spec, nFft] = magSpectrogram(stftMatrix, power);

  params.nFft = nFft;
  const melBasis = createMelFilterbank(params);
  return applyWholeFilterbank(spec, melBasis);
};

/**
 * Convert a power spectrogram (amplitude squared) to decibel (dB) units
 *
 * Intended to match {@link
 * https://librosa.github.io/librosa/generated/librosa.core.power_to_db.html
 * librosa.core.power_to_db}
 * @param spec Input power.
 * @param amin Minimum threshold for `abs(S)`.
 * @param topDb Threshold the output at `topDb` below the peak.
 */
export const powerToDb = (
  spec: Float32Array[],
  amin = 1e-10,
  topDb = 80.0,
) => {
  const width = spec.length;
  const height = spec[0].length;
  const logSpec = [];
  for (let i = 0; i < width; i++) {
    logSpec[i] = new Float32Array(height);
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const val = spec[i][j];
      logSpec[i][j] =
        10.0 * Math.log10(Math.max(amin, val));
    }
  }
  if (topDb) {
    if (topDb < 0) {
      throw new Error(`topDb must be non-negative.`);
    }
    for (let i = 0; i < width; i++) {
      const maxVal = max(logSpec[i]);
      for (let j = 0; j < height; j++) {
        logSpec[i][j] = Math.max(
          logSpec[i][j],
          maxVal - topDb,
        );
      }
    }
  }
  return logSpec;
};

export const normalizeBuffer = (buffer: Float32Array) => {
  const normalizedBuffer = new Float32Array(buffer.length);
  const minVal = min(buffer);
  const maxVal = max(buffer);
  const ampVal = (maxVal - minVal) / 2.0 + 0.00001;
  const meanVal = mean(buffer);
  for (let i = 0; i < buffer.length; i++) {
    normalizedBuffer[i] = (buffer[i] - meanVal) / ampVal;
  }
  return normalizedBuffer;
};

/**
 * Calculate magnitudeSpectrogram from stft
 *
 * @param stft
 * @param power
 * @returns [magnitudeSpectrogram, nFft]
 */
export const magSpectrogram = (
  stft: Float32Array[],
  power: number,
): [Float32Array[], number] => {
  const spec = stft.map((fft) => pow(mag(fft), power));
  const nFft = stft[0].length - 1;
  return [spec, nFft];
};

/**
 * Calculate STFT (returns Array of complexArray [[real0, imag0, real1, imag1, ...], ...])
 * Length of each complexArray = nFft + 2 #This is twice of (1 + nFft//2)
 *
 * @param y
 * @param params
 * @returns STFTMatrix
 */
const stft = (
  y: Float32Array,
  params: SpecParams,
): Float32Array[] => {
  const nFft = params.nFft || 2048;
  const winLength = params.winLength || nFft;
  const hopLength =
    params.hopLength || Math.floor(winLength / 4);

  let fftWindow = hannWindow(winLength);

  // Pad the window to be the size of nFft.
  fftWindow = padCenterToLength(fftWindow, nFft);

  if (params.center) {
    // Pad the time series so that the frames are centered.
    y = padReflect(y, Math.floor(nFft / 2));
  }

  // Window the time series.
  const yFrames = frame(y, nFft, hopLength);
  // Pre-allocate the STFT matrix.
  const stftMatrix = [];

  const width = yFrames.length;
  const height = nFft + 2;
  for (let i = 0; i < width; i++) {
    // Each column is a Float32Array of size height.
    const col = new Float32Array(height);
    stftMatrix[i] = col;
  }

  for (let i = 0; i < width; i++) {
    // Populate the STFT matrix.
    const winBuffer = applyWindow(yFrames[i], fftWindow);
    const col = fft(winBuffer);
    stftMatrix[i].set(col.slice(0, height));
  }

  return stftMatrix;
};

const applyWholeFilterbank = (
  spec: Float32Array[],
  filterbank: Float32Array[],
): Float32Array[] => {
  // Apply a point-wise dot product between the array of arrays.
  const out: Float32Array[] = [];
  for (let i = 0; i < spec.length; i++) {
    out[i] = applyFilterbank(spec[i], filterbank);
  }
  return out;
};

const applyFilterbank = (
  mags: Float32Array,
  filterbank: Float32Array[],
): Float32Array => {
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

const applyWindow = (
  buffer: Float32Array,
  win: Float32Array,
) => {
  const out = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = win[i] * buffer[i];
  }
  return out;
};

const padCenterToLength = (
  data: Float32Array,
  length: number,
) => {
  // If data is longer than length, error!
  if (data.length > length) {
    throw new Error('Data is longer than length.');
  }

  const paddingLeft = Math.floor(
    (length - data.length) / 2,
  );
  const paddingRight = length - data.length - paddingLeft;
  return padConstant(data, [paddingLeft, paddingRight]);
};

const padConstant = (
  data: Float32Array,
  padding: number | number[],
) => {
  let padLeft, padRight;
  if (typeof padding === 'object') {
    [padLeft, padRight] = padding;
  } else {
    padLeft = padRight = padding;
  }
  const out = new Float32Array(
    data.length + padLeft + padRight,
  );
  out.set(data, padLeft);
  return out;
};

const padReflect = (
  data: Float32Array,
  padding: number,
) => {
  const out = padConstant(data, padding);
  for (let i = 0; i < padding; i++) {
    // Pad the beginning with reflected values.
    out[i] = out[2 * padding - i];
    // Pad the end with reflected values.
    out[out.length - i - 1] =
      out[out.length - 2 * padding + i - 1];
  }
  return out;
};

/**
 * Given a timeseries, returns an array of timeseries that are windowed
 * according to the params specified.
 */
const frame = (
  data: Float32Array,
  frameLength: number,
  hopLength: number,
): Float32Array[] => {
  const bufferCount =
    Math.floor((data.length - frameLength) / hopLength) + 1;
  const buffers = Array.from(
    { length: bufferCount },
    (x, i) => new Float32Array(frameLength),
  );
  for (let i = 0; i < bufferCount; i++) {
    const ind = i * hopLength;
    const buffer = data.slice(ind, ind + frameLength);
    buffers[i].set(buffer);
    // In the end, we will likely have an incomplete buffer, which we should
    // just ignore.
    if (buffer.length !== frameLength) {
      continue;
    }
  }
  return buffers;
};

const createMelFilterbank = (
  params: MelParams,
): Float32Array[] => {
  const fMin = params.fMin || 0;
  const fMax = params.fMax || params.sampleRate / 2;
  const nMels = params.nMels || 128;
  const nFft = params.nFft || 2048;

  // Center freqs of each FFT band.
  const fftFreqs = calculateFftFreqs(
    params.sampleRate,
    nFft,
  );
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

const fft = (y: Float32Array) => {
  const fft = new FFT(y.length);
  const out = fft.createComplexArray();
  const data = fft.toComplexArray(y, null);
  fft.transform(out, data);
  return out;
};

const hannWindow = (length: number) => {
  const win = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    win[i] =
      0.5 *
      (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
  }
  return win;
};

const linearSpace = (
  start: number,
  end: number,
  count: number,
) => {
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
const mag = (y: Float32Array) => {
  const out = new Float32Array(y.length / 2);
  for (let i = 0; i < y.length / 2; i++) {
    out[i] = Math.sqrt(
      y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1],
    );
  }
  return out;
};

const hzToMel = (
  hz: number,
  htk: boolean = false,
): number => {
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

const melToHz = (
  mel: number,
  htk: boolean = false,
): number => {
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

const calculateFftFreqs = (
  sampleRate: number,
  nFft: number,
) => {
  return linearSpace(
    0,
    sampleRate / 2,
    Math.floor(1 + nFft / 2),
  );
};

const calculateMelFreqs = (
  nMels: number,
  fMin: number,
  fMax: number,
): Float32Array => {
  const melMin = hzToMel(fMin);
  const melMax = hzToMel(fMax);

  // Construct linearly spaced array of nMel intervals, between melMin and
  // melMax.
  const mels = linearSpace(melMin, melMax, nMels);
  const hzs = mels.map((mel) => melToHz(mel));
  return hzs;
};

const internalDiff = (arr: Float32Array): Float32Array => {
  const out = new Float32Array(arr.length - 1);
  for (let i = 0; i < arr.length; i++) {
    out[i] = arr[i + 1] - arr[i];
  }
  return out;
};

const outerSubtract = (
  arr: Float32Array,
  arr2: Float32Array,
): Float32Array[] => {
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

const pow = (arr: Float32Array, power: number) => {
  return arr.map((v) => Math.pow(v, power));
};

const max = (arr: Float32Array) => {
  return arr.reduce((a, b) => Math.max(a, b));
};

const min = (arr: Float32Array) => {
  return arr.reduce((a, b) => Math.min(a, b));
};

const mean = (arr: Float32Array) => {
  return arr.reduce((a, b) => a + b) / arr.length;
};
