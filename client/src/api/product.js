import axios from "axios";
import createError from "../utils/createError";

export default class ProductAPI {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async getAllProducts(params) {
    try {
      const res = await this.#searchAllProducts(params);

      if (res.status !== 205) {
        throw createError(res.status);
      }

      return res.data;
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
        data: res.data,
      }));
  }

  async registerProduct(body) {
    try {
      const formData = new FormData();

      formData.append("title", body.title);
      formData.append("description", body.description);
      formData.append("price", body.price);
      formData.append("instantBidPrice", body.instantBidPrice);
      formData.append("startPrice", body.startPrice);
      formData.append("bidUnit", body.bidUnit);

      const res = await this.#requestRegisterProduct(formData);

      if (res.status !== 200) {
        throw createError(res.status);
      }

      return res.data;
    } catch (error) {
      return error;
    }
  }

  async #requestRegisterProduct(formData) {
    return this.httpClient
      .post("products/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => ({
        status: res.status,
        data: res.data,
      }));
  }
}
