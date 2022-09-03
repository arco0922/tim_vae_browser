import { NumVector, P5WithProps } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import { LatentImgInfo } from '@app/constants/visualizerConfig';
import { url } from '@app/utils/urlConfig';
import p5 from 'p5';
import React from 'react';

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  latentImgInfo: LatentImgInfo;
  coord: NumVector | null;
  setCoord: (coord: NumVector | null) => void;
}

export type DrawMousePosOnLatentSketchProps =
  SketchProps & {
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

    if (p.props.coord === null) return;

    const x =
      (p.width * (p.props.coord[0] - xmin)) / (xmax - xmin);
    const y =
      (p.height * (ymax - p.props.coord[1])) /
      (ymax - ymin);

    p.fill('red');
    p.ellipse(x, y, 15, 15);
  };

  p.mouseDragged = () => {
    const { xmin, xmax, ymin, ymax } =
      p.props.latentImgInfo;

    const isInside =
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height;

    if (isInside) {
      const mx = p.mouseX;
      const my = p.mouseY;

      const x = xmin + (mx * (xmax - xmin)) / p.width;
      const y = ymax - (my * (ymax - ymin)) / p.height;

      p.props.setCoord([x, y]);
    }
  };
};

export const DrawMousePosOnLatentSketch = ({
  canvasWidth,
  canvasHeight,
  latentImgInfo,
  coord,
  setCoord,
  className,
}: DrawMousePosOnLatentSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        latentImgInfo,
        coord,
        setCoord,
      }}
      className={className}
    />
  );
};
