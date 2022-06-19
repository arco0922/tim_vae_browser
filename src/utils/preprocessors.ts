import {
  amplitudeSpectrogram,
  melSpectrogram,
  normalizeBuffer,
  powerToDb,
} from './audioUtils';
import * as tf from '@tensorflow/tfjs';

export const createEncoder01Preprocessor =
  (frameLength: number, inputShape: number[]) =>
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
    const input = tf.reshape(slicedAmpSpec, inputShape);
    return input;
  };

export const createEncoder01LongPreprocessor =
  (
    sampleRate: number,
    nFft: number,
    hopLength: number,
    inputShape: number[],
  ) =>
  (buffer: Float32Array): tf.Tensor => {
    const melSpec = powerToDb(
      melSpectrogram(buffer, {
        sampleRate,
        nFft,
        hopLength,
        center: true,
      }),
    );
    const melSpecArr = melSpec.map((spec) =>
      Array.from(spec),
    );
    const melSpecTensor = tf.tensor2d(melSpecArr);
    const minVal = tf.min(melSpecTensor);
    const maxVal = tf.max(melSpecTensor);
    const normalizedMelSpec = tf.div(
      tf.sub(melSpecTensor, minVal),
      tf.sub(maxVal, minVal),
    );
    const normalizedMelSpecTransposed = tf.transpose(
      normalizedMelSpec,
    );
    const input = tf.reshape(
      normalizedMelSpecTransposed,
      inputShape,
    );
    return input;
  };
