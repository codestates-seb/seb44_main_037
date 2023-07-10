const displayAttachedImages = (imageFile: any, setter: any) => {
  const file = imageFile;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  return new Promise<void>(resolve => {
    reader.onload = () => {
      if (!reader.result) return;

      setter((prev: Array<string | ArrayBuffer>) => [...prev, reader.result]);
      resolve();
    };
  });
};

export default displayAttachedImages;
