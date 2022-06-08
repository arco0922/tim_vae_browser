import { P5WithProps } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import { EncodeResult } from '@app/utils/TimbreVAE';
import { url } from '@app/utils/urlConfig';
import p5 from 'p5';

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  encodeResult: EncodeResult | null;
}

export type PlotLatentSketchProps = SketchProps & {
  className?: string;
};

const sketch = (p: P5WithProps<SketchProps>): void => {
  let img: p5.Image;
  const xmin = -0.002;
  const xmax = 0.0025;
  const ymin = -0.004;
  const ymax = 0.004;

  p.preload = () => {
    img = p.loadImage(url('/imgs/encoder01.png'));
  };

  p.setup = () => {
    p.createCanvas(
      p.props.canvasWidth,
      p.props.canvasHeight,
    );
  };

  p.draw = () => {
    p.background(200);
    p.image(img, 0, 0, p.width, p.height);

    if (p.props.encodeResult === null) return;

    const cx = p.props.encodeResult.coord[0];
    const cy = p.props.encodeResult.coord[1];

    const x = (p.width * (cx - xmin)) / (xmax - xmin);
    const y = (p.height * (ymax - cy)) / (ymax - ymin);

    p.fill('red');
    p.ellipse(x, y, 15, 15);
  };
};

export const PlotLatentSketch = ({
  canvasWidth,
  canvasHeight,
  encodeResult,
  className,
}: PlotLatentSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        encodeResult,
      }}
      className={className}
    />
  );
};
