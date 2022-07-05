import { NumVector, P5WithProps } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import React from 'react';

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  samplingPoints: NumVector[];
}

export type DrawSamplingPointsSketchProps = SketchProps & {
  className?: string;
};

interface DrawSamplingPointsProps {
  radius: number;
  samplingPoints: NumVector[];
}

const sketch = (p: P5WithProps<SketchProps>): void => {
  p.setup = () => {
    p.createCanvas(
      p.props.canvasWidth,
      p.props.canvasHeight,
    );
  };

  const drawSamplingPoints = ({
    radius,
    samplingPoints,
  }: DrawSamplingPointsProps): void => {
    // サンプル点を描画する(直線で結ぶ)
    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();

    samplingPoints.forEach((point) => {
      p.vertex(radius * point[0], radius * point[1]);
    });

    p.endShape(p.CLOSE);
  };

  p.draw = () => {
    p.background(255);
    p.translate(p.width / 2, p.height / 2);
    p.fill(255);
    p.stroke(0);
    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
    const samplingPoints = p.props.samplingPoints;
    drawSamplingPoints({
      radius: p.width / 4,
      samplingPoints,
    });
    p.translate(-p.width / 2, -p.height / 2);
  };
};

export const DrawFromSamplingPointsSketch = ({
  canvasWidth,
  canvasHeight,
  samplingPoints,
  className,
}: DrawSamplingPointsSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        samplingPoints,
      }}
      className={className}
    />
  );
};
