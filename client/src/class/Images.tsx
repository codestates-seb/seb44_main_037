import checkFileSize from "../utils/checkFileSize";

export class Images {
  private _files: FileList;

  constructor(files: FileList) {
    this._files = files;
  }

  get fileList() {
    return Array.from(this._files);
  }

  get sizeErrorMessage() {
    const maxSize = 0.5 * 1024 * 1024;
    const errorMessage = checkFileSize(this.fileList, maxSize);

    if (errorMessage === "") {
      return null;
    }

    return errorMessage;
  }
}
