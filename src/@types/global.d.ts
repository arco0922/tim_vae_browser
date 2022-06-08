export {};

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
  interface HTMLMediaElement {
    captureStream(): MediaStream;
    mozCaptureStream(): MediaStream;
  }
}
