import {
  createEncoder01Preprocessor,
  createEncoder01LongPreprocessor,
} from './../utils/preprocessors';
import * as tf from '@tensorflow/tfjs';

export interface LatentImgInfo {
  imgSrc: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export interface VisualizerConfig {
  mode: 'SHORT' | 'LONG';
  encoderJSONPath: string;
  samplingRate: number;
  frameLength: number;
  encoderPreprocessor: (buffer: Float32Array) => tf.Tensor;
  latentImgInfo: LatentImgInfo;
}

export const Encoder01VisualizerConfig: VisualizerConfig = {
  mode: 'SHORT',
  encoderJSONPath: '/models/encoder01/model.json',
  samplingRate: 44100,
  frameLength: 1024,
  encoderPreprocessor: createEncoder01Preprocessor(
    1024,
    [1, 32, 16, 1],
  ),
  latentImgInfo: {
    imgSrc: '/imgs/encoder01.png',
    xmin: -0.002,
    xmax: 0.0025,
    ymin: -0.004,
    ymax: 0.004,
  },
};

export const Encoder01LongVisualizerConfig: VisualizerConfig =
  {
    mode: 'LONG',
    encoderJSONPath: '/models/encoder01_long/model.json',
    samplingRate: 44100,
    frameLength: 65535,
    encoderPreprocessor: createEncoder01LongPreprocessor(
      44100,
      2048,
      1024,
      [1, 128, 64, 1],
    ),
    latentImgInfo: {
      imgSrc: '/imgs/encoder01_long.png',
      xmin: -3,
      xmax: 4,
      ymin: -4.5,
      ymax: 2.5,
    },
  };
