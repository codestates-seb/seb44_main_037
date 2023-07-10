const validateProductRegister = (data: any) => {
  const { title, description } = data;
  let isValid = false;

  const checkTitle = (string: string) => {
    switch (true) {
      case string.length < 5:
        return "제목은 5자 이상이어야 합니다.";

      case string.length > 40:
        return "제목은 40자를 넘지 않아야 합니다.";

      default:
        isValid = true;
        return "";
    }
  };

  const checkDescription = (string: string) => {
    switch (true) {
      case string.length < 10:
        return "상품설명은 10자 이상이어야 합니다.";

      case string.length > 300:
        return "상품설명은 300자를 넘지 않아야 합니다.";

      default:
        isValid = true;
        return "";
    }
  };

  const result = {
    isValid: isValid,
    failureReason: {
      title: checkTitle(title),
      description: checkDescription(description),
    },
  };

  result.isValid = isValid;

  return result;
};

export default validateProductRegister;
