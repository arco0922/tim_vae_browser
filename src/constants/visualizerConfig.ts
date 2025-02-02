import { EncoderId } from './encoders';
import {
  createEncoder01Preprocessor,
  createEncoder01LongPreprocessor,
  createEncoder02LongPreprocessor,
} from '@app/utils/preprocessors';
import * as tf from '@tensorflow/tfjs';

export type VisualizeMode =
  | 'LATENT'
  | 'SHAPE'
  | 'RANDOM'
  | 'CHECK';
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
  aspectRatio?: number;
}

export interface VisualizerConfig<
  P extends WorkletMessage,
> {
  encoderId: EncoderId;
  encoderMode: EncoderMode;
  isFlipped: boolean;
  encoderJSONPath: string;
  samplingRate: number;
  frameLength: number;
  encoderPreprocessor: EncoderPreProcessor<P>;
  latentImgInfo: LatentImgInfo;
}

export const Encoder01VisualizerConfig: VisualizerConfig<Float32Array> =
  {
    encoderId: 'encoder01',
    encoderMode: 'SHORT',
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
    encoderId: 'encoder01_long',
    encoderMode: 'LONG',
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
  encoderId: 'encoder02_long',
  encoderMode: 'LONG_FAST',
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
  encoderId: 'encoder03_long',
  encoderMode: 'LONG_FAST',
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

export const Encoder01NewVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  encoderId: 'encoder01_new',
  encoderMode: 'LONG_FAST',
  isFlipped: false,
  encoderJSONPath: '/models/encoder01_new/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc: '/imgs/latentImgs/encoder01_new.png',
    xmin: -4.338333368301392,
    xmax: 3.107632875442505,
    ymin: -3.3266372680664062,
    ymax: 3.557241439819336,
  },
};

export const Encoder03AraiIphoneVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  encoderId: 'encoder03_arai_iphone',
  encoderMode: 'LONG_FAST',
  isFlipped: false,
  encoderJSONPath:
    '/models/encoder03_arai_iphone/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc: '/imgs/latentImgs/encoder03_arai_iphone.png',
    xmin: -4.314516544342041,
    xmax: 2.3160040378570557,
    ymin: -2.2613269090652466,
    ymax: 3.136868715286255,
    aspectRatio: 607 / 623,
  },
};

export const Encoder04AraiMacVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  encoderId: 'encoder04_arai_mac',
  encoderMode: 'LONG_FAST',
  isFlipped: true,
  encoderJSONPath: '/models/encoder04_arai_mac/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc: '/imgs/latentImgs/encoder04_arai_mac.png',
    xmin: -4.098137378692627,
    xmax: 2.5161726474761963,
    ymin: -3.2377891540527344,
    ymax: 4.495275497436523,
    aspectRatio: 607 / 623,
  },
};

export const Encoder05AraiMacVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  encoderId: 'encoder05_arai_mac',
  encoderMode: 'LONG_FAST',
  isFlipped: false,
  encoderJSONPath: '/models/encoder05_arai_mac/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc: '/imgs/latentImgs/encoder05_arai_mac.png',
    xmin: -3.868354082107544,
    xmax: 5.179101467132568,
    ymin: -3.995244264602661,
    ymax: 3.7708518505096436,
    aspectRatio: 607 / 623,
  },
};

export const Encoder06AraiKidokoroMacVisualizerConfig: VisualizerConfig<
  Float32Array[]
> = {
  encoderId: 'encoder06_arai_kidokoro_mac',
  encoderMode: 'LONG_FAST',
  isFlipped: false,
  encoderJSONPath:
    '/models/encoder06_arai_kidokoro_mac/model.json',
  samplingRate: 44100,
  frameLength: 2048,
  encoderPreprocessor: createEncoder02LongPreprocessor([
    1, 128, 64, 1,
  ]),
  latentImgInfo: {
    imgSrc:
      '/imgs/latentImgs/encoder06_arai_kidokoro_mac.png',
    xmin: -4.467989206314087,
    xmax: 4.0386598110198975,
    ymin: -4.374500751495361,
    ymax: 3.882669687271118,
    aspectRatio: 607 / 623,
  },
};

export const latestVisualizerConfig =
  Encoder05AraiMacVisualizerConfig;

export type LatestVisualizerWorkletMessage = Float32Array[];
