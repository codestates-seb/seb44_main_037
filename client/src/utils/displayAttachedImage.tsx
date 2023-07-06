const displayAttachedImage = (
  e: any,
  setter: React.Dispatch<React.SetStateAction<string | ArrayBuffer>>
) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise<void>(resolve => {
    reader.onload = () => {
      if (!reader.result) return;

      setter(reader.result);
      resolve();
    };
  });
};

export default displayAttachedImage;
