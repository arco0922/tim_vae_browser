import { NumVector, P5WithProps } from '@app/@types';
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
  goalCoord?: NumVector;
  hidePoints?: boolean;
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

    if (p.props.goalCoord !== undefined) {
      const gx = p.props.goalCoord[0];
      const gy = p.props.goalCoord[1];

      const x = (p.width * (gx - xmin)) / (xmax - xmin);
      const y = (p.height * (ymax - gy)) / (ymax - ymin);

      p.fill('orange');
      p.ellipse(x, y, 10, 10);
    }

    if (p.props.encodeResult === null || p.props.hidePoints)
      return;

    const cx = p.props.encodeResult.coord[0];
    const cy = p.props.encodeResult.coord[1];

    const x = (p.width * (cx - xmin)) / (xmax - xmin);
    const y = (p.height * (ymax - cy)) / (ymax - ymin);

    p.fill('red');
    p.ellipse(x, y, 20, 20);
  };
};

export const PlotLatentSketch = ({
  canvasWidth,
  canvasHeight,
  encodeResult,
  latentImgInfo,
  goalCoord,
  hidePoints = false,
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
        goalCoord,
        hidePoints,
      }}
      className={className}
    />
  );
};
