import axios, { AxiosHeaders, AxiosInstance } from "axios";
import {
  BodyOfCharge,
  BodyOfLogin,
  BodyOfRegisterUser,
  PayloadOfAuth,
  PayloadOfCharge,
  ResponseState,
} from "userAPI";
import createError from "../utils/createError";
import handleRequestRequiringAuthorization from "../utils/handleRequestRequiringAuthorization";

export default class UserAPI {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async logout() {
    try {
      const res = await this.requestLogout();

      if (res.status !== 200) {
        throw createError("로그아웃에 실패했습니다.");
      }

      return res.data;
    } catch (error) {
      return error;
    }
  }

  private async requestLogout() {
    return this.httpClient.get("users/logout").then(res => ({
      status: res.status,
      data: res.data,
    }));
  }

  async login(body: BodyOfLogin) {
    const res = await this.requestLogin(body);

    return res;
  }

  private async requestLogin(
    body: BodyOfLogin
  ): Promise<ResponseState<PayloadOfAuth>> {
    return this.httpClient
      .post("users/login", body)
      .then(res => {
        const headers = res.headers;

        return {
          status: res.status,
          result: res.data.result,
          payload: {
            ...res.data.payload,
            accessToken:
              headers instanceof AxiosHeaders && headers.get("token"),
          },
        };
      })
      .catch(err => ({
        status: err.response.status,
        result: err.response.data.result,
        message: err.response.data.message,
      }));
  }

  async register(body: BodyOfRegisterUser) {
    const formData = new FormData();

    formData.append("imageData", body.image!);
    formData.append("email", body.email);
    formData.append("nickname", body.nickname);

    const res = await this.requestRegister(formData);

    if (res.status !== 201) {
      throw createError("회원 등록 과정에서 오류가 생겼습니다.");
    }

    return res;
  }

  private async requestRegister(
    formData: FormData
  ): Promise<ResponseState<PayloadOfAuth>> {
    return this.httpClient
      .post("users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        const headers = res.headers;

        return {
          status: res.status,
          result: res.data.result,
          payload: {
            ...res.data.payload,
            accessToken:
              headers instanceof AxiosHeaders && headers.get("token"),
          },
        };
      })
      .catch(err => ({
        status: err.response.status,
        result: err.response.data.result,
        message: err.response.data.message,
      }));
  }

  async refreshToken() {
    try {
      const res = await this.requestSilentRefresh();

      if (res.status !== 200) {
        throw createError("토큰을 재발급하는 과정에서 에러가 발생했습니다.");
      }

      return res;
    } catch (error) {
      return error;
    }
  }

  private async requestSilentRefresh(): Promise<ResponseState<PayloadOfAuth>> {
    return this.httpClient
      .get("users/silent-refresh")
      .then(res => {
        const headers = res.headers;

        return {
          status: res.status,
          result: res.data.result,
          payload: {
            ...res.data.payload,
            accessToken:
              headers instanceof AxiosHeaders && headers.get("token"),
          },
        };
      })
      .catch(err => ({
        status: err.response.status,
        result: err.response.data.result,
        message: err.response.data.message,
      }));
  }

  async getUserInfo(accessToken: string) {
    try {
      const res = await this.requestUserInfo(accessToken);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.requestUserInfo
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  private async requestUserInfo(accessToken: string) {
    return this.httpClient
      .get("users", {
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

  async charge(accessToken: string, body: BodyOfCharge) {
    const res = await this.requestCharge(accessToken, body);
    const result = await handleRequestRequiringAuthorization(
      res,
      this.requestCharge,
      body
    );

    return result;
  }

  private async requestCharge(
    accessToken: string,
    body: BodyOfCharge
  ): Promise<ResponseState<PayloadOfCharge>> {
    return this.httpClient
      .post("users/charge", body, {
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
