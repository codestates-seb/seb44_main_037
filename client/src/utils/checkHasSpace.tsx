const checkHasSpace = (string: string): boolean => {
  const stringList: string[] = Array.from(string);

  const hasSpace: boolean = stringList.some(
    (character: string) => character.charCodeAt(0) === 32
  );

  return hasSpace;
};

export default checkHasSpace;
