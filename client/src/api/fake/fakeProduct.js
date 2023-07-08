import axios from "axios";

export default class FakeProductAPI {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getSingleGeneralProduct() {
    return this.#searchSingleGeneralProduct();
  }

  async #searchSingleGeneralProduct() {
    return axios
      .get("/products/singleGeneralProduct.json")
      .then(res => res.data);
  }

  async getSingleAuctionProduct() {
    return this.#searchSingleAuctionProduct();
  }

  async #searchSingleAuctionProduct() {
    return axios
      .get("/products/singleAuctionProduct.json")
      .then(res => res.data);
  }
}
