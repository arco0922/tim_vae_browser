import { P5WithProps, ShapeParams } from '@app/@types';
import { P5Wrapper } from '@app/components/P5Wrapper';
import React from 'react';

interface SketchProps {
  canvasWidth: number;
  canvasHeight: number;
  shapeParams: ShapeParams;
}

export type DrawFromParamSketchProps = SketchProps & {
  className?: string;
};

interface DrawFromParamProps extends ShapeParams {
  radius: number;
}

const sketch = (p: P5WithProps<SketchProps>): void => {
  p.setup = () => {
    p.createCanvas(
      p.props.canvasWidth,
      p.props.canvasHeight,
    );
  };

  const drawFromParam = ({
    radius,
    cornNum,
    cornAmp,
    randomness,
    randomSeed,
    outerCurve,
    innerCurve,
  }: DrawFromParamProps): void => {
    p.randomSeed(randomSeed);

    //頂点の位置を決めてから、間をベジェ曲線で結ぶ

    /**
     * 頂点位置を極座標で管理する
     * pointsR: r座標
     * pointsTheta: Θ座標
     */
    const pointsR = Array<number>(cornNum * 2);
    const pointsTheta = Array<number>(cornNum * 2);

    //まずは、頂点の位置を決める
    for (let i = 0; i < 2 * cornNum; i++) {
      pointsR[i] =
        radius *
        (1 +
          cornAmp * p.pow(-1, i) +
          randomness * p.random(-1, 1) * 0.4);
      pointsTheta[i] =
        (p.PI * i) / cornNum -
        p.PI / 2 +
        (randomness * p.random(-1, 1) * p.PI) / cornNum;
    }

    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();

    const startX = pointsR[0] * p.cos(pointsTheta[0]);
    const startY = pointsR[0] * p.sin(pointsTheta[0]);
    p.vertex(startX, startY);

    for (let i = 1; i <= 2 * cornNum; i++) {
      const k = i % (2 * cornNum);
      const prevBaseX =
        pointsR[i - 1] * p.cos(pointsTheta[i - 1]);
      const prevBaseY =
        pointsR[i - 1] * p.sin(pointsTheta[i - 1]);

      const baseX = pointsR[k] * p.cos(pointsTheta[k]);
      const baseY = pointsR[k] * p.sin(pointsTheta[k]);

      const n1 = p
        .createVector(-prevBaseY, prevBaseX)
        .normalize();
      const n2 = p.createVector(baseY, -baseX).normalize();

      let x1, y1, x2, y2;

      if (k % 2 == 1) {
        x1 = prevBaseX + (radius / 2) * outerCurve * n1.x;
        y1 = prevBaseY + (radius / 2) * outerCurve * n1.y;
        x2 = baseX + (radius / 2) * innerCurve * n2.x;
        y2 = baseY + (radius / 2) * innerCurve * n2.y;
        p.bezierVertex(x1, y1, x2, y2, baseX, baseY);
      } else {
        x1 = prevBaseX + (radius / 2) * innerCurve * n1.x;
        y1 = prevBaseY + (radius / 2) * innerCurve * n1.y;
        x2 = baseX + (radius / 2) * outerCurve * n2.x;
        y2 = baseY + (radius / 2) * outerCurve * n2.y;
        p.bezierVertex(x1, y1, x2, y2, baseX, baseY);
      }
    }
    p.endShape(p.CLOSE);
  };

  p.draw = () => {
    p.background(255);
    p.translate(p.width / 2, p.height / 2);
    p.fill(255);
    p.stroke(0);
    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
    const {
      cornNum,
      cornAmp,
      randomness,
      randomSeed,
      innerCurve,
      outerCurve,
    } = p.props.shapeParams;
    drawFromParam({
      radius: p.width / 4,
      cornNum,
      cornAmp,
      randomness,
      randomSeed,
      innerCurve,
      outerCurve,
    });
    p.translate(-p.width / 2, -p.height / 2);
  };
};

export const DrawFromParamSketch = ({
  canvasWidth,
  canvasHeight,
  shapeParams,
  className,
}: DrawFromParamSketchProps) => {
  return (
    <P5Wrapper<SketchProps>
      sketch={sketch}
      sketchProps={{
        canvasWidth,
        canvasHeight,
        shapeParams,
      }}
      className={className}
    />
  );
};
