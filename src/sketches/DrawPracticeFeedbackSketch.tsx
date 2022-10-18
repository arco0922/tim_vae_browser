import { NumVector, P5WithProps } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import React from 'react';

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  samplingPoints: NumVector[] | null;
  goalSamplingPoints: NumVector[] | null;
  hidePoints?: boolean;
}

export type DrawPracticeFeedbackSketchProps =
  SketchProps & {
    className?: string;
  };

interface DrawSamplingPointsProps {
  radius: number;
  samplingPoints: NumVector[] | null;
  strokecolor?: string;
  strokeWeight?: number;
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
    const startTime = new Date().getTime();
    p.background(255);
    p.translate(p.width / 2, p.height / 2);
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
    const goalSamplingPoints = p.props.goalSamplingPoints;
    // drawSamplingPoints({
    //   radius: p.width / 4,
    //   samplingPoints: goalSamplingPoints,
    //   strokecolor: '#acacac',
    // });
    if (p.props.hidePoints) return;
    const samplingPoints = p.props.samplingPoints;
    drawSamplingPoints({
      radius: p.width / 4,
      samplingPoints,
      strokecolor: '#ff0000',
      strokeWeight: 3,
    });

    p.translate(-p.width / 2, -p.height / 2);
    const endTime = new Date().getTime();
    // console.log(
    //   `Draw Duration: ${(endTime - startTime) / 1000}s`,
    // );
  };
};

export const DrawPracticeFeedbackSketch = ({
  canvasWidth,
  canvasHeight,
  samplingPoints,
  goalSamplingPoints,
  hidePoints,
  className,
}: DrawPracticeFeedbackSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        samplingPoints,
        goalSamplingPoints,
        hidePoints,
      }}
      className={className}
    />
  );
};
