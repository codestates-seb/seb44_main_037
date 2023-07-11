const checkIsValidUnit = (num: number): boolean => {
  if (num % 1000 === 0) {
    return true;
  }

  return false;
};

export default checkIsValidUnit;
