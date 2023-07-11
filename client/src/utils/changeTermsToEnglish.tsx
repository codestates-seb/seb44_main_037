import {
  FANZINE,
  STUFF,
  DOLL,
  GENERAL,
  AUCTION,
  FANZINE_KO,
  STUFF_KO,
  DOLL_KO,
  GENERAL_KO,
  AUCTION_KO,
} from "../constants/products";

const changeTermsToKorean = (category: string): string => {
  switch (true) {
    case category === FANZINE_KO:
      return FANZINE;

    case category === STUFF_KO:
      return STUFF;

    case category === DOLL_KO:
      return DOLL;

    case category === GENERAL_KO:
      return GENERAL;

    case category === AUCTION_KO:
      return AUCTION;

    default:
      return "";
  }
};

export default changeTermsToKorean;
