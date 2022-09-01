/** This function is copied from https://github.com/indutny/fft.js/blob/master/dist/fft.js */
const FFT = (function (t) {
  function r(e) {
    if (i[e]) return i[e].exports;
    var o = (i[e] = { i: e, l: !1, exports: {} });
    return (
      t[e].call(o.exports, o, o.exports, r),
      (o.l = !0),
      o.exports
    );
  }
  var i = {};
  return (
    (r.m = t),
    (r.c = i),
    (r.i = function (t) {
      return t;
    }),
    (r.d = function (t, i, e) {
      r.o(t, i) ||
        Object.defineProperty(t, i, {
          configurable: !1,
          enumerable: !0,
          get: e,
        });
    }),
    (r.n = function (t) {
      var i =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(i, 'a', i), i;
    }),
    (r.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (r.p = ''),
    r((r.s = 0))
  );
})([
  function (t, r, i) {
    'use strict';
    function e(t) {
      if (
        ((this.size = 0 | t),
        this.size <= 1 ||
          0 != (this.size & (this.size - 1)))
      )
        throw new Error(
          'FFT size must be a power of two and bigger than 1',
        );
      this._csize = t << 1;
      for (
        var r = new Array(2 * this.size), i = 0;
        i < r.length;
        i += 2
      ) {
        var e = (Math.PI * i) / this.size;
        (r[i] = Math.cos(e)), (r[i + 1] = -Math.sin(e));
      }
      this.table = r;
      for (var o = 0, n = 1; this.size > n; n <<= 1) o++;
      (this._width = o % 2 == 0 ? o - 1 : o),
        (this._bitrev = new Array(1 << this._width));
      for (var s = 0; s < this._bitrev.length; s++) {
        this._bitrev[s] = 0;
        for (var a = 0; a < this._width; a += 2) {
          var h = this._width - a - 2;
          this._bitrev[s] |= ((s >>> a) & 3) << h;
        }
      }
      (this._out = null),
        (this._data = null),
        (this._inv = 0);
    }
    (t.exports = e),
      (e.prototype.fromComplexArray = function (t, r) {
        for (
          var i = r || new Array(t.length >>> 1), e = 0;
          e < t.length;
          e += 2
        )
          i[e >>> 1] = t[e];
        return i;
      }),
      (e.prototype.createComplexArray = function () {
        for (
          var t = new Array(this._csize), r = 0;
          r < t.length;
          r++
        )
          t[r] = 0;
        return t;
      }),
      (e.prototype.toComplexArray = function (t, r) {
        for (
          var i = r || this.createComplexArray(), e = 0;
          e < i.length;
          e += 2
        )
          (i[e] = t[e >>> 1]), (i[e + 1] = 0);
        return i;
      }),
      (e.prototype.completeSpectrum = function (t) {
        for (
          var r = this._csize, i = r >>> 1, e = 2;
          e < i;
          e += 2
        )
          (t[r - e] = t[e]), (t[r - e + 1] = -t[e + 1]);
      }),
      (e.prototype.transform = function (t, r) {
        if (t === r)
          throw new Error(
            'Input and output buffers must be different',
          );
        (this._out = t),
          (this._data = r),
          (this._inv = 0),
          this._transform4(),
          (this._out = null),
          (this._data = null);
      }),
      (e.prototype.realTransform = function (t, r) {
        if (t === r)
          throw new Error(
            'Input and output buffers must be different',
          );
        (this._out = t),
          (this._data = r),
          (this._inv = 0),
          this._realTransform4(),
          (this._out = null),
          (this._data = null);
      }),
      (e.prototype.inverseTransform = function (t, r) {
        if (t === r)
          throw new Error(
            'Input and output buffers must be different',
          );
        (this._out = t),
          (this._data = r),
          (this._inv = 1),
          this._transform4();
        for (var i = 0; i < t.length; i++)
          t[i] /= this.size;
        (this._out = null), (this._data = null);
      }),
      (e.prototype._transform4 = function () {
        var t,
          r,
          i = this._out,
          e = this._csize,
          o = this._width,
          n = 1 << o,
          s = (e / n) << 1,
          a = this._bitrev;
        if (4 === s)
          for (t = 0, r = 0; t < e; t += s, r++) {
            var h = a[r];
            this._singleTransform2(t, h, n);
          }
        else
          for (t = 0, r = 0; t < e; t += s, r++) {
            var f = a[r];
            this._singleTransform4(t, f, n);
          }
        var u = this._inv ? -1 : 1,
          _ = this.table;
        for (n >>= 2; n >= 2; n >>= 2) {
          s = (e / n) << 1;
          var l = s >>> 2;
          for (t = 0; t < e; t += s)
            for (
              var p = t + l, v = t, c = 0;
              v < p;
              v += 2, c += n
            ) {
              var d = v,
                m = d + l,
                y = m + l,
                b = y + l,
                w = i[d],
                g = i[d + 1],
                z = i[m],
                T = i[m + 1],
                x = i[y],
                A = i[y + 1],
                C = i[b],
                E = i[b + 1],
                F = w,
                I = g,
                M = _[c],
                R = u * _[c + 1],
                O = z * M - T * R,
                P = z * R + T * M,
                j = _[2 * c],
                S = u * _[2 * c + 1],
                J = x * j - A * S,
                k = x * S + A * j,
                q = _[3 * c],
                B = u * _[3 * c + 1],
                D = C * q - E * B,
                G = C * B + E * q,
                H = F + J,
                K = I + k,
                L = F - J,
                N = I - k,
                Q = O + D,
                U = P + G,
                V = u * (O - D),
                W = u * (P - G),
                X = H + Q,
                Y = K + U,
                Z = H - Q,
                $ = K - U,
                tt = L + W,
                rt = N - V,
                it = L - W,
                et = N + V;
              (i[d] = X),
                (i[d + 1] = Y),
                (i[m] = tt),
                (i[m + 1] = rt),
                (i[y] = Z),
                (i[y + 1] = $),
                (i[b] = it),
                (i[b + 1] = et);
            }
        }
      }),
      (e.prototype._singleTransform2 = function (t, r, i) {
        var e = this._out,
          o = this._data,
          n = o[r],
          s = o[r + 1],
          a = o[r + i],
          h = o[r + i + 1],
          f = n + a,
          u = s + h,
          _ = n - a,
          l = s - h;
        (e[t] = f),
          (e[t + 1] = u),
          (e[t + 2] = _),
          (e[t + 3] = l);
      }),
      (e.prototype._singleTransform4 = function (t, r, i) {
        var e = this._out,
          o = this._data,
          n = this._inv ? -1 : 1,
          s = 2 * i,
          a = 3 * i,
          h = o[r],
          f = o[r + 1],
          u = o[r + i],
          _ = o[r + i + 1],
          l = o[r + s],
          p = o[r + s + 1],
          v = o[r + a],
          c = o[r + a + 1],
          d = h + l,
          m = f + p,
          y = h - l,
          b = f - p,
          w = u + v,
          g = _ + c,
          z = n * (u - v),
          T = n * (_ - c),
          x = d + w,
          A = m + g,
          C = y + T,
          E = b - z,
          F = d - w,
          I = m - g,
          M = y - T,
          R = b + z;
        (e[t] = x),
          (e[t + 1] = A),
          (e[t + 2] = C),
          (e[t + 3] = E),
          (e[t + 4] = F),
          (e[t + 5] = I),
          (e[t + 6] = M),
          (e[t + 7] = R);
      }),
      (e.prototype._realTransform4 = function () {
        var t,
          r,
          i = this._out,
          e = this._csize,
          o = this._width,
          n = 1 << o,
          s = (e / n) << 1,
          a = this._bitrev;
        if (4 === s)
          for (t = 0, r = 0; t < e; t += s, r++) {
            var h = a[r];
            this._singleRealTransform2(t, h >>> 1, n >>> 1);
          }
        else
          for (t = 0, r = 0; t < e; t += s, r++) {
            var f = a[r];
            this._singleRealTransform4(t, f >>> 1, n >>> 1);
          }
        var u = this._inv ? -1 : 1,
          _ = this.table;
        for (n >>= 2; n >= 2; n >>= 2) {
          s = (e / n) << 1;
          var l = s >>> 1,
            p = l >>> 1,
            v = p >>> 1;
          for (t = 0; t < e; t += s)
            for (var c = 0, d = 0; c <= v; c += 2, d += n) {
              var m = t + c,
                y = m + p,
                b = y + p,
                w = b + p,
                g = i[m],
                z = i[m + 1],
                T = i[y],
                x = i[y + 1],
                A = i[b],
                C = i[b + 1],
                E = i[w],
                F = i[w + 1],
                I = g,
                M = z,
                R = _[d],
                O = u * _[d + 1],
                P = T * R - x * O,
                j = T * O + x * R,
                S = _[2 * d],
                J = u * _[2 * d + 1],
                k = A * S - C * J,
                q = A * J + C * S,
                B = _[3 * d],
                D = u * _[3 * d + 1],
                G = E * B - F * D,
                H = E * D + F * B,
                K = I + k,
                L = M + q,
                N = I - k,
                Q = M - q,
                U = P + G,
                V = j + H,
                W = u * (P - G),
                X = u * (j - H),
                Y = K + U,
                Z = L + V,
                $ = N + X,
                tt = Q - W;
              if (
                ((i[m] = Y),
                (i[m + 1] = Z),
                (i[y] = $),
                (i[y + 1] = tt),
                0 !== c)
              ) {
                if (c !== v) {
                  var rt = N,
                    it = -Q,
                    et = K,
                    ot = -L,
                    nt = -u * X,
                    st = -u * W,
                    at = -u * V,
                    ht = -u * U,
                    ft = rt + nt,
                    ut = it + st,
                    _t = et + ht,
                    lt = ot - at,
                    pt = t + p - c,
                    vt = t + l - c;
                  (i[pt] = ft),
                    (i[pt + 1] = ut),
                    (i[vt] = _t),
                    (i[vt + 1] = lt);
                }
              } else {
                var ct = K - U,
                  dt = L - V;
                (i[b] = ct), (i[b + 1] = dt);
              }
            }
        }
      }),
      (e.prototype._singleRealTransform2 = function (
        t,
        r,
        i,
      ) {
        var e = this._out,
          o = this._data,
          n = o[r],
          s = o[r + i],
          a = n + s,
          h = n - s;
        (e[t] = a),
          (e[t + 1] = 0),
          (e[t + 2] = h),
          (e[t + 3] = 0);
      }),
      (e.prototype._singleRealTransform4 = function (
        t,
        r,
        i,
      ) {
        var e = this._out,
          o = this._data,
          n = this._inv ? -1 : 1,
          s = 2 * i,
          a = 3 * i,
          h = o[r],
          f = o[r + i],
          u = o[r + s],
          _ = o[r + a],
          l = h + u,
          p = h - u,
          v = f + _,
          c = n * (f - _),
          d = l + v,
          m = p,
          y = -c,
          b = l - v,
          w = p,
          g = c;
        (e[t] = d),
          (e[t + 1] = 0),
          (e[t + 2] = m),
          (e[t + 3] = y),
          (e[t + 4] = b),
          (e[t + 5] = 0),
          (e[t + 6] = w),
          (e[t + 7] = g);
      });
  },
]);

const melSpecVec = (y, sr, nFft) => {
  const _stftVec = stftVec(y, nFft);
  const _powerSpecVec = powerSpecVec(_stftVec);
  const melFilterbank = createMelFilterbank(sr, nFft);
  return applyFilterbank(_powerSpecVec, melFilterbank);
};

/**
 * Convert a power spectrogram (amplitude squared) to decibel (dB) units
 */
const powerToDb = (specVec, amin = 1e-10) => {
  const l = specVec.length;
  const logSpecVec = new Float32Array(l);
  for (let i = 0; i < l; i++) {
    logSpecVec[i] =
      10.0 * Math.log10(Math.max(amin, specVec[i]));
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
class ResampleMelProcessor extends AudioWorkletProcessor {
  _buffer = null;
  _melbuffer = null;
  _idx = 0;
  _lastSilenceIdx = null;

  static get parameterDescriptors() {
    return [
      {
        name: 'bufferSize',
        defaultValue: 2048,
      },
      {
        name: 'frameNum',
        defaultValue: 64,
      },
      {
        name: 'hopLength',
        defaultValue: 1024,
      },
      {
        name: 'resampleRate',
        defaultValue: 44100,
      },
    ];
  }

  constructor() {
    super();
  }

  /**
   * @param {Float32Array[][]} inputs
   * @returns {boolean}
   */
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    const numberOfChannels = output.length;

    // Traverse channels
    for (
      let channel = 0;
      channel < numberOfChannels;
      channel++
    ) {
      // `Float32Array` ?
      if (input[channel] !== undefined) {
        // Bypass
        output[channel].set(input[channel]);
      }
    }

    this.updateBuffer(input[0], parameters);
    if (this._idx % parameters['hopLength'][0] === 0) {
      this.updateMelBuffer(parameters);
      if (
        this._lastSilenceIdx !== null &&
        this._lastSilenceIdx < parameters['frameNum'][0] / 2
      ) {
        this.sendMels(parameters, false);
      } else {
        this.sendMels(parameters, true);
      }
    }
    return true;
  }

  /**
   *
   * @param {Float32Array} channelData
   * @returns {Float32Array}
   */
  updateBuffer(channelData, parameters) {
    if (channelData === undefined) return;

    const resampleRate = parameters['resampleRate'][0];
    const isNeedInterpolate =
      sampleRate % resampleRate !== 0;
    const ratio = sampleRate / resampleRate;
    const frameLength = Math.floor(
      channelData.length / ratio,
    );

    const resampled = new Float32Array(frameLength);
    for (let i = 0; i < frameLength; i += 1) {
      if (!isNeedInterpolate) {
        resampled[i] = channelData[i * ratio];
      } else {
        const left = Math.floor(i * ratio);
        const right = left + 1;
        const p = i * ratio - left;
        resampled[i] =
          (1 - p) * channelData[left] +
          p * channelData[right];
      }
    }

    const bufferSize = parameters['bufferSize'][0];

    if (this._buffer === null)
      this._buffer = new Float32Array(bufferSize);

    const updatedBuffer = new Float32Array(bufferSize);
    for (let i = 0; i < bufferSize; i += 1) {
      const old_idx = i + frameLength;
      if (old_idx < bufferSize) {
        updatedBuffer[i] = this._buffer[old_idx];
      } else {
        updatedBuffer[i] = resampled[old_idx - bufferSize];
      }
    }

    this._buffer = updatedBuffer;
    this._idx += 128;
    this._idx %= bufferSize;
  }

  updateMelBuffer(parameters) {
    if (this._buffer === null) return;
    if (this._melbuffer === null) {
      this._melbuffer = [];
      for (let i = 0; i < parameters['frameNum'][0]; i++) {
        this._melbuffer.push(
          new Float32Array(128).fill(-100),
        );
      }
    }

    const lastMelSpecVec = powerToDb(
      melSpecVec(
        this._buffer,
        parameters['resampleRate'][0],
        parameters['bufferSize'][0],
      ),
    );

    const lastBufferArr = Array.from(this._buffer);
    const isSilence =
      Math.max(
        Math.max(...lastBufferArr),
        -Math.min(...lastBufferArr),
      ) < 0.005;
    if (isSilence || this._lastSilenceIdx === null) {
      this._lastSilenceIdx = parameters['frameNum'][0] - 1;
    } else {
      this._lastSilenceIdx -= 1;
    }

    this._melbuffer.push(lastMelSpecVec);
    this._melbuffer.shift();
  }

  sendMels(parameters, isSilent) {
    if (isSilent) {
      this.port.postMessage(null);
    } else {
      this.port.postMessage(this._melbuffer);
    }
  }
}

registerProcessor(
  'resample-mel.worklet',
  ResampleMelProcessor,
);
