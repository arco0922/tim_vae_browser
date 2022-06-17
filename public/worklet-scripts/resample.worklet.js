/**
 * Send Newest 1024 Samples (resampled to 44100)
 */

class ResampleProcessor extends AudioWorkletProcessor {
  _buffer = null;
  _sampleRate = 44100;

  static get parameterDescriptors() {
    return [
      {
        name: 'bufferSize',
        defaultValue: 1024,
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
    this.port.postMessage(this._buffer);

    return true;
  }

  /**
   *
   * @param {Float32Array} channelData
   * @returns {Float32Array}
   */
  updateBuffer(channelData, parameters) {
    if (channelData === undefined) return;
    const isNeedInterpolate =
      sampleRate % this._sampleRate !== 0;
    const ratio = sampleRate / this._sampleRate;
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
  }
}

registerProcessor('resample.worklet', ResampleProcessor);
