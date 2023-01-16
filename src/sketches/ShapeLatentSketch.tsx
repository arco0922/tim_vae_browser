import { NumVector, P5WithProps } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import { LatentImgInfo } from '@app/constants/visualizerConfig';
import { url } from '@app/utils/urlConfig';
import p5 from 'p5';

export type SamplingPointsCollection = {
  coord: NumVector;
  samplingPoints: NumVector[];
}[];

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  latentImgInfo: LatentImgInfo;
  samplingPointsCollection: SamplingPointsCollection;
  radius: number;
}

interface DrawSamplingPointsProps {
  radius: number;
  samplingPoints: NumVector[] | null;
  strokecolor?: string;
  strokeWeight?: number;
}

export type ShapeLatentSketchProps = SketchProps & {
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

  const drawSamplingPoints = ({
    radius,
    samplingPoints,
    strokecolor = '#000',
    strokeWeight = 1,
  }: DrawSamplingPointsProps): void => {
    if (samplingPoints === null) return;

    // サンプル点を描画する(直線で結ぶ)
    p.stroke(strokecolor);
    p.strokeWeight(strokeWeight);
    p.noFill();
    p.beginShape();

    samplingPoints.forEach((point) => {
      p.vertex(radius * point[0], radius * point[1]);
    });

    p.endShape(p.CLOSE);
  };

  p.draw = () => {
    p.background(255);
    const { imgSrc, xmin, xmax, ymin, ymax } =
      p.props.latentImgInfo;

    if (imgSrc !== prevImgSrc) {
      img = p.loadImage(url(imgSrc));
      prevImgSrc = imgSrc;
    }

    p.tint(255, 200);
    p.image(img, 0, 0, p.width, p.height);

    p.props.samplingPointsCollection.forEach(
      ({ coord, samplingPoints }) => {
        const vPointX =
          p.width * ((coord[0] - xmin) / (xmax - xmin));
        const vPointY =
          p.height *
          (1 - (coord[1] - ymin) / (ymax - ymin));
        p.translate(vPointX, vPointY);
        drawSamplingPoints({
          radius: p.props.radius,
          samplingPoints,
        });
        p.translate(-vPointX, -vPointY);
      },
    );
  };
};

export const ShapeLatentSketch = ({
  canvasWidth,
  canvasHeight,
  latentImgInfo,
  samplingPointsCollection,
  radius,
  className,
}: ShapeLatentSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        latentImgInfo,
        samplingPointsCollection,
        radius,
      }}
      className={className}
    />
  );
};
