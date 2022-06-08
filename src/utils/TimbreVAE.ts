import * as tf from '@tensorflow/tfjs';
import { url } from './urlConfig';

const FRAME_LENGTH = 1024;
const THRESHOLD = 0.01;

export interface EncodeResult {
  coord: number[];
}

export class TimbreVAE {
  audioContext: AudioContext;
  stream: MediaStream;
  resampleProcesser: AudioWorkletNode | null;
  encoder: tf.GraphModel;
  running = false;
  result: EncodeResult | null = null;
  callback: ((res: EncodeResult) => void) | undefined =
    undefined;

  constructor(
    audioContext: AudioContext,
    stream: MediaStream,
    encoder: tf.GraphModel,
    callback?: (res: EncodeResult) => void,
  ) {
    this.audioContext = audioContext;
    this.stream = stream;
    this.encoder = encoder;
    this.resampleProcesser = null;
    if (callback) this.callback = callback;
  }

  async start() {
    const source =
      this.audioContext.createMediaStreamSource(
        this.stream,
      );
    await this.audioContext.audioWorklet.addModule(
      url('/worklet-scripts/resample.worklet.js'),
    );
    this.resampleProcesser = new AudioWorkletNode(
      this.audioContext,
      'resample.worklet',
    );
    source
      .connect(this.resampleProcesser)
      .connect(this.audioContext.destination);

    this.resampleProcesser.port.onmessage = async (e: {
      data: Float32Array;
    }) => {
      if (this.running) return;
      this.encodeAudio(e.data);
    };
  }

  async encodeAudio(buffer: Float32Array) {
    this.running = true;
    await tf.nextFrame();

    const buffer_arr = Array.from(buffer);
    const maxAmp = Math.max(
      Math.max(...buffer_arr),
      -Math.min(...buffer_arr),
    );
    if (maxAmp < THRESHOLD) {
      this.running = false;
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

    this.running = false;
    await tf.nextFrame();
  }
}
