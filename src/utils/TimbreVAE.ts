import {
  EncoderPreProcessor,
  WorkletMessage,
} from '@app/constants/visualizerConfig';
import * as tf from '@tensorflow/tfjs';

const THRESHOLD = 0.01;

export interface EncodeResult {
  coord: number[];
}

export class TimbreVAE<P extends WorkletMessage> {
  isFlipped: boolean;
  encoder: tf.GraphModel;
  isEncoding = false;
  preprocessor: EncoderPreProcessor<P>;
  result: EncodeResult | null = null;
  callback: ((res: EncodeResult) => void) | undefined =
    undefined;

  constructor(
    isFlipped: boolean,
    encoder: tf.GraphModel,
    preprocessor: EncoderPreProcessor<P>,
    callback?: (res: EncodeResult) => void,
  ) {
    this.isFlipped = isFlipped;
    this.encoder = encoder;
    this.preprocessor = preprocessor;
    if (callback) this.callback = callback;
  }

  async encodeAudio(data: P | null) {
    if (this.isEncoding || data === null) return;

    this.isEncoding = true;
    await tf.nextFrame();

    tf.tidy(() => {
      const input = this.preprocessor(data);
      const encoded = this.encoder.predict([
        input,
      ]) as tf.Tensor[];
      const idx = this.isFlipped ? 1 : 0;
      const zMean = tf.reshape(encoded[idx], [2]);
      const coord = Array.from(zMean.dataSync());
      this.result = { coord };
      if (this.callback) this.callback({ coord });
    });

    this.isEncoding = false;
    await tf.nextFrame();
  }
}
