const checkHasSpecialCharacter = (string: string): boolean => {
  const stringList: string[] = Array.from(string);

  const hasSpecialCharacter: boolean = stringList.some((character: string) => {
    const charCode: number = character.charCodeAt(0);
    return (
      (charCode >= 33 && charCode <= 47) ||
      (charCode >= 58 && charCode <= 64) ||
      (charCode >= 91 && charCode <= 96) ||
      (charCode >= 123 && charCode <= 126)
    );
  });

  return hasSpecialCharacter;
};

export default checkHasSpecialCharacter;
