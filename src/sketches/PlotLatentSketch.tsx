import { P5WithProps } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import { LatentImgInfo } from '@app/constants/visualizerConfig';
import { EncodeResult } from '@app/utils/TimbreVAE';
import { url } from '@app/utils/urlConfig';
import p5 from 'p5';

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  encodeResult: EncodeResult | null;
  latentImgInfo: LatentImgInfo;
}

export type PlotLatentSketchProps = SketchProps & {
  className?: string;
};

const sketch = (p: P5WithProps<SketchProps>): void => {
  let img: p5.Image;
  let prevImgSrc = p.props.latentImgInfo.imgSrc;

  p.preload = () => {
    img = p.loadImage(url(prevImgSrc));
  };

  p.setup = () => {
    p.createCanvas(
      p.props.canvasWidth,
      p.props.canvasHeight,
    );
  };

  p.draw = () => {
    p.background(200);
    const { imgSrc, xmin, xmax, ymin, ymax } =
      p.props.latentImgInfo;

    if (imgSrc !== prevImgSrc) {
      img = p.loadImage(url(imgSrc));
      prevImgSrc = imgSrc;
    }

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
  latentImgInfo,
  className,
}: PlotLatentSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        encodeResult,
        latentImgInfo,
      }}
      className={className}
    />
  );
};
