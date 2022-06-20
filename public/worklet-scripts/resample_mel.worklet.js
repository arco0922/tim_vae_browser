import { melSpecVec, powerToDb } from './melSpec.js';

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
        this.sendMels(parameters);
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
      ) < 0.01;
    if (isSilence || this._lastSilenceIdx === null) {
      this._lastSilenceIdx = parameters['frameNum'][0] - 1;
    } else {
      this._lastSilenceIdx -= 1;
    }

    this._melbuffer.push(lastMelSpecVec);
    this._melbuffer.shift();
  }

  sendMels(parameters) {
    this.port.postMessage(this._melbuffer);
  }
}

registerProcessor(
  'resample-mel.worklet',
  ResampleMelProcessor,
);
