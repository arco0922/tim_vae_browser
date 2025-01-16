export const readFileAsText = (file: File) => {
  const reader = new FileReader();

  return new Promise<string>((resolve) => {
    reader.onload = (ev) => {
      if (ev.target === null || ev.target.result === null)
        return;
      const resText = ev.target.result as string;
      resolve(resText);
    };
    reader.readAsText(file);
  });
};
