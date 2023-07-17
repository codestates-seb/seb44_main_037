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
      const res = await this.#requestBuy(accessToken, body);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.#requestBuy,
        body
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestBuy(accessToken, body) {
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
      const res = await this.#requestBid(accessToken, body);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.#requestBid,
        body
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestBid(accessToken, body) {
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
      const res = await this.#requestInstantBid(accessToken, body);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.#requestInstantBid,
        body
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestInstantBid(accessToken, body) {
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
      const res = await this.#requestCloseBid(accessToken, body);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.#requestCloseBid,
        body
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestCloseBid(accessToken, body) {
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
