import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductAPI from "../../api/product";
import FakeProductAPI from "../../api/fake/fakeProduct";
import AuctionPage from "../ProductDetail/AuctionPage";
import GeneralPage from "../ProductDetail/GeneralPage";
import { AUCTION, GENERAL } from "../../constants/products";

// const productAPI = new ProductAPI();
const productAPI = new FakeProductAPI();

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<any>(null);

  const isAuction = product && product?.saleType === AUCTION;
  const isGeneral = product && product?.saleType === GENERAL;

  useEffect(() => {
    const getSingleProduct = async () => {
      // const response = await productAPI.getSingleProduct(productId);
      const response = await productAPI.getSingleAuctionProduct(productId);

      setProduct(response.product);
      console.log(response.product);
    };

    getSingleProduct();
  }, []);

  return (
    <>
      {isAuction && <AuctionPage product={product} />}
      {isGeneral && <GeneralPage product={product} />}
    </>
  );
}
