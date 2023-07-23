import axios from "axios";
import createError from "../utils/createError";
import {
  DEMAND_LOGIN,
  INVALID_BODY,
  OK,
  TOKEN_REISSUED,
} from "../constants/messages";

export default class ProductAPI {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async getSingleProduct(productId) {
    try {
      const res = await this.#searchSingleProduct(productId);

      if (res.status !== 200) {
        throw createError(res.status);
      }

      return res.data;
    } catch (error) {
      return error;
    }
  }

  async #searchSingleProduct(productId) {
    return this.httpClient.get(`products/${productId}`).then(res => ({
      status: res.status,
      data: res.data,
    }));
  }

  async getAllProducts(params) {
    try {
      const res = await this.#searchAllProducts(params);

      if (res.status !== 200) {
        throw createError(res.status);
      }

      return res;
    } catch (error) {
      return error;
    }
  }

  async #searchAllProducts(params) {
    return this.httpClient
      .get("products", {
        params,
      })
      .then(res => ({
        status: res.status,
        result: res.data.result,
        payload: res.data.payload,
      }));
  }

  async getProductsByKeyword(keyword) {
    try {
      const res = await this.#searchProductByKeyword(keyword);

      if (res.status !== 200) {
        throw createError(res.status);
      }

      return res;
    } catch (error) {
      return error;
    }
  }

  async #searchProductByKeyword(keyword) {
    return this.httpClient.get(`products/search/${keyword}`).then(res => ({
      status: res.status,
      result: res.data.result,
      payload: res.data.payload,
    }));
  }

  async registerProduct(body, userId, accessToken) {
    try {
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

      const res = await this.#requestRegisterProduct(formData, accessToken);

      if (res.status === 401 && res.message === TOKEN_REISSUED) {
        const accessToken = res.headers.get("token");
        const res = await this.#requestRegisterProduct(formData, accessToken);

        if (res.result === OK) {
          return {
            status: res.status,
            result: res.result,
            payload: { ...res.payload, accessToken },
          };
        }

        return {
          status: res.status,
          result: res.result,
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
    } catch (error) {
      return error;
    }
  }

  async #requestRegisterProduct(formData, accessToken) {
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
      }));
  }
}
