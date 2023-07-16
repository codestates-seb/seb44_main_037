import axios from "axios";
import handleRequestRequiringAuthorization from "../utils/handleRequestRequiringAuthorization";

export default class TradingAPI {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async buy(body, accessToken) {
    try {
      const res = await this.#requestBuy(body, accessToken);
      const result = await handleRequestRequiringAuthorization(
        res,
        body,
        this.#requestBuy
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestBuy(body, accessToken) {
    return this.httpClient
      .post("products/buy", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  async bid(body, accessToken) {
    try {
      const res = await this.#requestBid(body, accessToken);
      const result = await handleRequestRequiringAuthorization(
        res,
        body,
        this.#requestBid
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestBid(body, accessToken) {
    return this.httpClient
      .post("products/bid", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  async bidInstantly(body, accessToken) {
    try {
      const res = await this.#requestInstantBid(body, accessToken);
      const result = await handleRequestRequiringAuthorization(
        res,
        body,
        this.#requestInstantBid
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestInstantBid(body, accessToken) {
    return this.httpClient
      .post("products/bid/instant", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  async closeBid(body, accessToken) {
    try {
      const res = await this.#requestCloseBid(body, accessToken);
      const result = await handleRequestRequiringAuthorization(
        res,
        body,
        this.#requestCloseBid
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestCloseBid(body, accessToken) {
    return this.httpClient
      .post("products/bid/close", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
