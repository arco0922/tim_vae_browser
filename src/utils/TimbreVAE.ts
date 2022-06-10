import * as tf from '@tensorflow/tfjs';

const FRAME_LENGTH = 1024;
const THRESHOLD = 0.01;

export interface EncodeResult {
  coord: number[];
}

export class TimbreVAE {
  encoder: tf.GraphModel;
  isEncoding = false;
  result: EncodeResult | null = null;
  callback: ((res: EncodeResult) => void) | undefined =
    undefined;

  constructor(
    encoder: tf.GraphModel,
    callback?: (res: EncodeResult) => void,
  ) {
    this.encoder = encoder;
    if (callback) this.callback = callback;
  }

  async encodeAudio(buffer: Float32Array) {
    if (this.isEncoding) return;

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
      const frame = tf.tensor1d(buffer);
      const frameMean = tf.mean(frame);
      const frameMin = tf.min(frame);
      const frameMax = tf.max(frame);
      const frameAmp = tf.add(
        tf.div(tf.sub(frameMax, frameMin), tf.scalar(2.0)),
        tf.scalar(0.00001),
      );
      const frameNormalized = tf.div(
        tf.sub(frame, frameMean),
        frameAmp,
      ) as tf.Tensor1D;
      const freq = tf.signal.stft(
        frameNormalized,
        FRAME_LENGTH,
        1,
      );
      const freq1d = tf.reshape(freq, [
        1 + FRAME_LENGTH / 2,
      ]);
      const powerSpec = tf.div(
        tf.abs(freq1d),
        tf.scalar(FRAME_LENGTH),
      );
      const slicedPowerSpec = tf.slice(
        powerSpec,
        1,
        FRAME_LENGTH / 2,
      );
      const input = tf.reshape(
        slicedPowerSpec,
        [1, 32, 16, 1],
      );
      const encoded = this.encoder.predict([
        input,
      ]) as tf.Tensor[];
      const zMean = tf.reshape(encoded[1], [2]);
      const coord = Array.from(zMean.dataSync());
      this.result = { coord };
      if (this.callback) this.callback({ coord });
    });

    this.isEncoding = false;
    await tf.nextFrame();
  }
}
