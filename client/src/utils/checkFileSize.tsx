const checkFileSize = (files: any, maxSize: number) => {
  let message = "";

  files.forEach((file: any, index: number) => {
    if (file.size > maxSize) {
      message = message + `${index + 1}번 `;
    }
  });

  if (message !== "") {
    message = message + "사진의 사이즈를 확인해 주세요.";
  }

  return message;
};

export default checkFileSize;
