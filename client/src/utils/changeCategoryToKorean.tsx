import { DOLL, FANZINE, STUFF } from "../constants/products";

const changeCategoryToKorean = (category: string): string => {
  switch (true) {
    case category === FANZINE:
      return "회지";

    case category === STUFF:
      return "잡화/소품";

    case category === DOLL:
      return "인형/피규어";

    default:
      return "";
  }
};

export default changeCategoryToKorean;
