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
    if (this.isEncoding || data === null) {
      // if (this.isEncoding) {
      //   console.log('Encoding rejected');
      // }
      return;
    }

    this.isEncoding = true;
    const startTime = new Date().getTime();
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

    const endTime = new Date().getTime();

    // console.log(
    //   `VAE Duration: ${(endTime - startTime) / 1000}s`,
    // );

    this.isEncoding = false;
    await tf.nextFrame();
  }
}
