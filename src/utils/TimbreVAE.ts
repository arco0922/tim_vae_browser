import * as tf from '@tensorflow/tfjs';

const THRESHOLD = 0.01;

export interface EncodeResult {
  coord: number[];
}

export class TimbreVAE {
  mode: 'SHORT' | 'LONG';
  encoder: tf.GraphModel;
  isEncoding = false;
  preprocessor: (buffer: Float32Array) => tf.Tensor;
  result: EncodeResult | null = null;
  callback: ((res: EncodeResult) => void) | undefined =
    undefined;

  constructor(
    mode: 'SHORT' | 'LONG',
    encoder: tf.GraphModel,
    preprocessor: (buffer: Float32Array) => tf.Tensor,
    callback?: (res: EncodeResult) => void,
  ) {
    this.mode = mode;
    this.encoder = encoder;
    this.preprocessor = preprocessor;
    if (callback) this.callback = callback;
  }

  async encodeAudio(buffer: Float32Array) {
    if (this.isEncoding || buffer === null) return;

    this.isEncoding = true;
    await tf.nextFrame();

    const buffer_arr = Array.from(buffer);
    const maxAmp = Math.max(
      Math.max(...buffer_arr),
      -Math.min(...buffer_arr),
    );
    if (maxAmp < THRESHOLD) {
      this.isEncoding = false;
      return;
    }

    tf.tidy(() => {
      const input = this.preprocessor(buffer);
      const encoded = this.encoder.predict([
        input,
      ]) as tf.Tensor[];
      const idx = this.mode === 'LONG' ? 0 : 1;
      const zMean = tf.reshape(encoded[idx], [2]);
      const coord = Array.from(zMean.dataSync());
      this.result = { coord };
      if (this.callback) this.callback({ coord });
    });

    this.isEncoding = false;
    await tf.nextFrame();
  }
}
