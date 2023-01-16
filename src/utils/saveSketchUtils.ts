export const downloadCanvasAsImage = (
  canvasId: string,
  fileName: string,
) => {
  const canvasDOM = document.getElementById(canvasId);
  if (canvasDOM === null) return;

  const canvas = canvasDOM as HTMLCanvasElement;

  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', fileName);

  canvas.toBlob((blob) => {
    if (blob === null) return;
    const url = URL.createObjectURL(blob);
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  });
};
