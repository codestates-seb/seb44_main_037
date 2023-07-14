import axios from "axios";
import createError from "../utils/createError";

export default class UserAPI {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async logout() {
    try {
      const res = await this.#requestLogout();

      if (res.status !== 200) {
        throw createError(res.status);
      }

      return res.data;
    } catch (error) {
      return error;
    }
  }

  async #requestLogout() {
    return this.httpClient.get("users/logout").then(res => ({
      status: res.status,
      data: res.data,
    }));
  }

  async login(body) {
    try {
      const res = await this.#requestLogin(body);

      if (res.status !== 201) {
        throw createError(res.status);
      }

      return res;
    } catch (error) {
      return error;
    }
  }

  async #requestLogin(body) {
    return this.httpClient.post("users/login", body).then(res => ({
      status: res.status,
      result: res.data.result,
      payload: { ...res.data.payload, accessToken: res.headers.get("token") },
    }));
  }

  async register(body) {
    try {
      const formData = new FormData();

      formData.append("imageData", body.image);
      formData.append("email", body.email);
      formData.append("nickname", body.nickname);

      const res = await this.#requestRegister(formData);

      if (res.status !== 201) {
        throw createError(res.status);
      }

      return res;
    } catch (error) {
      return error;
    }
  }

  async #requestRegister(formData) {
    return this.httpClient
      .post("users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => ({
        status: res.status,
        result: res.data.result,
        payload: { ...res.data.payload, accessToken: res.headers.get("token") },
      }));
  }

  async refreshToken() {
    try {
      const res = await this.#requestSilentRefresh();

      if (res.status !== 200) {
        throw createError(res.status);
      }

      return res;
    } catch (error) {
      return error;
    }
  }

  async #requestSilentRefresh() {
    return this.httpClient.get("users/silent-refresh").then(res => ({
      status: res.status,
      result: res.data.result,
      payload: { ...res.data.payload, accessToken: res.headers.get("token") },
    }));
  }
}
