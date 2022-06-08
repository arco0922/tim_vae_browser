import p5 from 'p5';

export interface P5WithProps<P> extends p5 {
  props: P;
}
