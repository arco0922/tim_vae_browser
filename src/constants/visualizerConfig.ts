import {
  createEncoder01Preprocessor,
  createEncoder01LongPreprocessor,
  createEncoder02LongPreprocessor,
} from './../utils/preprocessors';
import * as tf from '@tensorflow/tfjs';

export type EncoderMode = 'SHORT' | 'LONG' | 'LONG_FAST';
export type WorkletMessage = Float32Array | Float32Array[];
export type EncoderPreProcessor<P extends WorkletMessage> =
  (buffer: P) => tf.Tensor;

export interface LatentImgInfo {
  imgSrc: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export interface VisualizerConfig<
  P extends WorkletMessage,
> {
  mode: EncoderMode;
  isFlipped: boolean;
  encoderJSONPath: string;
  samplingRate: number;
  frameLength: number;
  encoderPreprocessor: EncoderPreProcessor<P>;
  latentImgInfo: LatentImgInfo;
}

export const Encoder01VisualizerConfig: VisualizerConfig<Float32Array> =
  {
    mode: 'SHORT',
    isFlipped: true,
    encoderJSONPath: '/models/encoder01/model.json',
    samplingRate: 44100,
    frameLength: 1024,
    encoderPreprocessor: createEncoder01Preprocessor(
      1024,
      [1, 32, 16, 1],
    ),
    latentImgInfo: {
      imgSrc: '/imgs/latentImgs/encoder01.png',
      xmin: -0.002,
      xmax: 0.0025,
      ymin: -0.004,
      ymax: 0.004,
    },
  };

export const Encoder01LongVisualizerConfig: VisualizerConfig<Float32Array> =
  {
    mode: 'LONG',
    isFlipped: false,
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
      imgSrc: '/imgs/latentImgs/encoder01_long.png',
      xmin: -3,
      xmax: 4,
      ymin: -4.5,
      ymax: 2.5,
    },
  };

export const Encoder02LongVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  mode: 'LONG_FAST',
  isFlipped: true,
  encoderJSONPath: '/models/encoder02_long/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc: '/imgs/latentImgs/encoder02_long.png',
    xmin: -3,
    xmax: 4,
    ymin: -4.5,
    ymax: 3,
  },
};

export const Encoder03LongVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  mode: 'LONG_FAST',
  isFlipped: false,
  encoderJSONPath: '/models/encoder03_long/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc: '/imgs/latentImgs/encoder03_long.png',
    xmin: -5,
    xmax: 9,
    ymin: -10,
    ymax: 8,
  },
};
