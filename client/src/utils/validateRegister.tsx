import checkHasSpecialCharacter from "./checkHasSpecialCharacter";
import checkHasSpace from "./checkHasSpace";

import {
  INCLUDING_SPECIAL_CHARACTER,
  INCLUDING_SPACE,
  EXCESSIVE_NICKNAME_LENGTH,
  INSUFFICIENT_LENGTH,
} from "../constants/messages";

const validateRegister = (data: any) => {
  const { nickname } = data;
  let isValid = false;

  const checkNickname = (string: string) => {
    switch (true) {
      case string.length < 2:
        return INSUFFICIENT_LENGTH;

      case checkHasSpecialCharacter(string):
        return INCLUDING_SPECIAL_CHARACTER;

      case checkHasSpace(string):
        return INCLUDING_SPACE;

      case string.length > 20:
        return EXCESSIVE_NICKNAME_LENGTH;

      default:
        isValid = true;
        return "";
    }
  };

  const result = {
    isValid: isValid,
    failureReason: {
      nickname: checkNickname(nickname),
    },
  };

  result.isValid = isValid;

  return result;
};

export default validateRegister;
