const findWhoIsTalkingTo = (myId: string, seller: any, buyer: any) => {
  if (myId === seller._id) {
    return buyer;
  }

  return seller;
};

export default findWhoIsTalkingTo;
