import axios from "axios";
import handleRequestRequiringAuthorization from "../utils/handleRequestRequiringAuthorization";

export default class ChatAPI {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
      withCredentials: true,
    });
  }

  async getAllChatRooms(accessToken) {
    try {
      const res = await this.#requestAllChatRooms(accessToken);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.#requestAllChatRooms
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestAllChatRooms(accessToken) {
    return this.httpClient
      .post(
        "chats/getAllChatRooms",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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

  async sendMessage(body, accessToken) {
    try {
      const res = await this.#requestSendingMessage(accessToken, body);
      const result = await handleRequestRequiringAuthorization(
        res,
        this.#requestSendingMessage,
        body
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  async #requestSendingMessage(accessToken, body) {
    return this.httpClient
      .post("chats/newMessage", body, {
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
