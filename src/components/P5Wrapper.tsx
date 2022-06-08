import React from 'react';
import { P5WithProps } from '@app/@types';
import p5 from 'p5';

interface WrapperProps<P> {
  sketch: (p: P5WithProps<P>) => void;
  sketchProps: P;
  className?: string;
}

const createSketchWithInitialProps =
  <P,>({
    sketch,
    initialSketchProps,
  }: {
    sketch: (p: P5WithProps<P>) => void;
    initialSketchProps: P;
  }) =>
  (p: P5WithProps<P>) => {
    p.props = initialSketchProps;
    sketch(p);
  };

export const P5Wrapper = <P,>({
  sketch,
  sketchProps,
  className,
}: WrapperProps<P>) => {
  const [canvas, setCanvas] =
    React.useState<P5WithProps<P> | null>(null);
  const canvasContainerRef =
    React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasContainerRef.current === null) return;

    const initialSketchProps = sketchProps;

    const sketchWithInitialProps =
      createSketchWithInitialProps({
        sketch,
        initialSketchProps,
      });

    const newCanvas = new p5(
      sketchWithInitialProps,
      canvasContainerRef.current,
    ) as P5WithProps<P>;

    setCanvas(newCanvas);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (canvas === null) return;
    canvas.props = sketchProps;
  }, [canvas, sketchProps]);

  return (
    <div ref={canvasContainerRef} className={className} />
  );
};
