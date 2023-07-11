const checkIsNumber = (num: number): boolean => {
  if (typeof num !== "number") {
    return false;
  }

  return true;
};

export default checkIsNumber;
