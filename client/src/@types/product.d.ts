declare module "product" {
  export type Product = {
    _id: string;
    seller: User | string;
    buyer?: User | string;
    images: Array<string>;
    title: string;
    description: string;
    saleType: string;
    price: number;
    bidInfo: BidInfo;
    category: string;
    createdAt: number;
    history: Array<BidHistory>;
    isOnSale: boolean;
  };

  export type BidInfo = {
    instantBidPrice: number;
    startPrice: number;
    bidUnit: number;
    deadline: number;
  };

  export type BidHistory = {
    bider: User | string;
    bidPrice: number;
    createdAt: number;
  };

  export type PointHistory = {
    title: string;
    chargeId: string;
    productId: string;
    price: number;
    balance: number;
    createdAt: number;
  };

  export type User = {
    email: string;
    image: string;
    nickname: string;
    point: number;
    pointHistory: Array<PointHistory>;
    salesList: Array<string>;
    _id: string;
    __v: number;
  };
}
