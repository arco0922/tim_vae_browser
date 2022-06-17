import {
  amplitudeSpectrogram,
  normalizeBuffer,
} from './audioUtils';
import * as tf from '@tensorflow/tfjs';

export const createEncoder01Preprocessor =
  (frameLength: number) =>
  (buffer: Float32Array): tf.Tensor => {
    const normalizedBuffer = normalizeBuffer(buffer);
    const ampSpec = amplitudeSpectrogram(normalizedBuffer, {
      nFft: frameLength,
    })[0];
    const _ampSpecTensor = tf.tensor1d(ampSpec);
    const ampSpecTensor = tf.div(
      _ampSpecTensor,
      tf.scalar(frameLength),
    );
    const slicedAmpSpec = tf.slice(
      ampSpecTensor,
      1,
      frameLength / 2,
    );
    const input = tf.reshape(slicedAmpSpec, [1, 32, 16, 1]);
    return input;
  };
