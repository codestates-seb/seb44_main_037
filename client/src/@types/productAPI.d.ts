declare module "productAPI" {
  import { Product } from "product";

  export type SuccessState<P> = {
    result: string;
    status: number;
    payload: P;
    message?: string;
    headers?: any;
  };

  export type FailState = {
    result: string;
    status: number;
    payload?: any;
    message: string;
    headers?: any;
  };

  export type ResponseState<P> = SuccessState<P> | FailState;

  export type ParamsOfGetAllProducts = {
    category: string;
    type: string;
    status: string;
  };

  export type AllProductsPayload = {
    products: Array<Product>;
  };

  export type PayloadOfRegisterProduct = {
    productId: string;
  };

  export type BodyOfRegisterProduct = {
    title: string;
    description: string;
    price: string;
    instantBidPrice: string;
    startPrice: string;
    bidUnit: string;
    saleType: string;
    category: string;
    images: Array<string>;
    deadline: string;
  };
}
