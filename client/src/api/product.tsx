import axios, { AxiosInstance } from "axios";
import {
  SuccessState,
  FailState,
  AllProductsPayload,
  PayloadOfRegisterProduct,
  BodyOfRegisterProduct,
  ParamsOfGetAllProducts,
  ResponseState,
} from "productAPI";
import createError from "../utils/createError";
import {
  DEMAND_LOGIN,
  INVALID_BODY,
  OK,
  TOKEN_REISSUED,
} from "../constants/messages";

export default class ProductAPI {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async getSingleProduct(productId: string | undefined) {
    try {
      const res = await this.searchSingleProduct(productId);

      if (res.status !== 200) {
        throw createError("single product를 가져오는 데 실패했습니다.");
      }

      return res.data;
    } catch (error) {
      return error;
    }
  }

  private async searchSingleProduct(productId: string | undefined) {
    return this.httpClient.get(`products/${productId}`).then(res => ({
      status: res.status,
      data: res.data,
    }));
  }

  async getAllProducts(
    params: ParamsOfGetAllProducts
  ): Promise<ResponseState<AllProductsPayload>> {
    const res = await this.searchAllProducts(params);

    if (res.status !== 200) {
      throw createError("상품 리스트를 가져오는 데 실패했습니다.");
    }

    return res;
  }

  private async searchAllProducts(
    params: ParamsOfGetAllProducts
  ): Promise<ResponseState<AllProductsPayload>> {
    return this.httpClient
      .get("products", {
        params,
      })
      .then(res => ({
        status: res.status,
        result: res.data.result,
        payload: res.data.payload,
      }))
      .catch(err => ({
        status: err.response.status,
        result: err.response.data.result,
        message: err.response.data.message,
      }));
  }

  async getProductsByKeyword(
    keyword: string
  ): Promise<SuccessState<AllProductsPayload> | FailState> {
    const res = await this.searchProductByKeyword(keyword);

    if (res.status !== 200) {
      throw createError("검색에 실패했습니다.");
    }

    return res;
  }

  private async searchProductByKeyword(
    keyword: string
  ): Promise<SuccessState<AllProductsPayload> | FailState> {
    return this.httpClient
      .get(`products/search/${keyword}`)
      .then(res => ({
        status: res.status,
        result: res.data.result,
        payload: res.data.payload,
      }))
      .catch(err => ({
        status: err.response.status,
        result: err.response.data.result,
        message: err.response.data.message,
      }));
  }

  async registerProduct(
    body: BodyOfRegisterProduct,
    userId: string,
    accessToken: string
  ): Promise<ResponseState<PayloadOfRegisterProduct>> {
    const formData = new FormData();

    body.images.forEach(image => {
      formData.append("imagesData", image);
    });
    formData.append("userId", userId);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("price", body.price);
    formData.append("instantBidPrice", body.instantBidPrice);
    formData.append("startPrice", body.startPrice);
    formData.append("bidUnit", body.bidUnit);
    formData.append("saleType", body.saleType);
    formData.append("category", body.category);
    formData.append("deadline", body.deadline);

    const res = await this.requestRegisterProduct(formData, accessToken);

    if (res.status === 401 && res.message === TOKEN_REISSUED) {
      const accessToken = res.headers.get("token");
      const secondRes = await this.requestRegisterProduct(
        formData,
        accessToken
      );

      if (secondRes.result === OK) {
        return {
          status: secondRes.status,
          result: secondRes.result,
          payload: { ...secondRes.payload, accessToken },
        };
      }

      return {
        status: secondRes.status,
        result: secondRes.result,
        message: DEMAND_LOGIN,
      };
    }

    if (res.status === 401) {
      return {
        status: res.status,
        result: res.result,
        message: DEMAND_LOGIN,
      };
    }

    if (res.status === 400) {
      return {
        status: res.status,
        result: res.result,
        message: INVALID_BODY,
      };
    }

    return {
      status: res.status,
      result: res.result,
      payload: res.payload,
    };
  }

  private async requestRegisterProduct(
    formData: FormData,
    accessToken: string
  ): Promise<SuccessState<PayloadOfRegisterProduct> | FailState> {
    return this.httpClient
      .post("products/new", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => ({
        status: res.status,
        result: res.data.result,
        payload: res.data.payload,
      }))
      .catch(err => ({
        status: err.response.status,
        result: err.response.data.result,
        message: err.response.data.message,
      }));
  }
}
