import { showToast } from "../components/common/Toast";
import { ERROR } from "../constants/toast";

export class Images {
  private _files: FileList;
  maxSize = 0.5 * 1024 * 1024;

  constructor(files: FileList) {
    this._files = files;
  }

  get fileList() {
    return Array.from(this._files);
  }

  get sizeErrorMessage() {
    let result = "";

    this.fileList.forEach((file, index) => {
      if (file.size > this.maxSize) {
        result = result + `${index + 1}번 `;
      }
    });

    if (result === "") return null;

    return result + "사진의 사이즈를 확인해 주세요.";
  }

  checkSizeError = () => {
    const errorMessage = this.sizeErrorMessage;

    if (errorMessage) {
      showToast({ type: ERROR, message: errorMessage });

      return false;
    }

    return true;
  };
}
