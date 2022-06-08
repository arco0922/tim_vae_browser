/**
 * Send Newest 1024 Samples (resampled to 44100)
 */

class ResampleProcessor extends AudioWorkletProcessor {
  bufferSize = 1024;
  _buffer = new Float32Array(this.bufferSize);
  _sampleRate = 44100;

  constructor() {
    super();
  }

  /**
   * @param {Float32Array[][]} inputs
   * @returns {boolean}
   */
  process(inputs) {
    this.updateBuffer(inputs[0][0]);
    this.port.postMessage(this._buffer);

    return true;
  }

  /**
   *
   * @param {Float32Array} channelData
   * @returns {Float32Array}
   */
  updateBuffer(channelData) {
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

    const updatedBuffer = new Float32Array(this.bufferSize);
    for (let i = 0; i < this.bufferSize; i += 1) {
      const old_idx = i + frameLength;
      if (old_idx < this.bufferSize) {
        updatedBuffer[i] = this._buffer[old_idx];
      } else {
        updatedBuffer[i] =
          resampled[old_idx - this.bufferSize];
      }
    }

    this._buffer = updatedBuffer;
  }
}

registerProcessor('resample.worklet', ResampleProcessor);
