# TimToShape

Framework to Visualize Timbre with 2D Shapes based on Crossmodal Correspondences

URL: https://arco0922.github.io/tim_vae_browser/ (Please open with Chrome)

Paper: https://dl.acm.org/doi/abs/10.1145/3581641.3584053

![](./resources/timtoshape_teaser.png)

## Implementation Details

This entire application is implemented using [Next.js](https://nextjs.org/).

Real time audio processing (e.g., FFT) is using [AudioWorkletProcessor](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor), so that the audio processing does not block the main thread.

The processed audio is encoded into timbre latent space using VAE encoder. The VAE is pre-trained and real time inference is implemented using [Tensorflow.js](https://github.com/tensorflow/tfjs).

The shape drawing is implemented using [p5.js](https://p5js.org/).

Please refer to the paper for more details.
