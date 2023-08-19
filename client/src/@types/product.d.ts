declare module "product" {
  import { User } from "context";

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
}
