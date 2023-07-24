const findBuyer = (myId: string, sellerId: string, buyerId: string) => {
  switch (true) {
    case myId === sellerId:
      return "내가 이 상품의 구매자입니다.";

    case myId === buyerId:
      return "상대방이 이 상품의 구매자입니다.";

    default:
      return "";
  }
};

export default findBuyer;
