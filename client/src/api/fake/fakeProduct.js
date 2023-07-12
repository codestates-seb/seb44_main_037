import axios from "axios";

export default class FakeProductAPI {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getAllProducts(params) {
    return this.#searchAllProducts();
  }

  async #searchAllProducts() {
    return axios.get("/products/allProducts.json").then(res => res.data);
  }

  async getSingleGeneralProduct(productId) {
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
