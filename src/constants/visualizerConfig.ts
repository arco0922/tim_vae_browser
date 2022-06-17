import { createEncoder01Preprocessor } from './../utils/preprocessors';
import * as tf from '@tensorflow/tfjs';

export interface LatentImgInfo {
  imgSrc: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export interface VisualizerConfig {
  encoderJSONPath: string;
  samplingRate: number;
  frameLength: number;
  encoderPreprocessor: (buffer: Float32Array) => tf.Tensor;
  latentImgInfo: LatentImgInfo;
}

export const Encoder01VisualizerConfig: VisualizerConfig = {
  encoderJSONPath: '/models/encoder01/model.json',
  samplingRate: 44100,
  frameLength: 1024,
  encoderPreprocessor: createEncoder01Preprocessor(1024),
  latentImgInfo: {
    imgSrc: '/imgs/encoder01.png',
    xmin: -0.002,
    xmax: 0.0025,
    ymin: -0.004,
    ymax: 0.004,
  },
};
