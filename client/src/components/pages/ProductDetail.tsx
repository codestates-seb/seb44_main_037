import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductAPI from "../../api/product";
import FakeProductAPI from "../../api/fake/fakeProduct";
import AuctionPage from "../ProductDetail/AuctionPage";
import GeneralPage from "../ProductDetail/GeneralPage";
import { AUCTION, GENERAL } from "../../constants/products";

const productAPI = new ProductAPI();
// const productAPI = new FakeProductAPI();

type ProductDetailProps = {
  user: any;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProductDetail({
  user,
  accessToken,
  setAccessToken,
}: ProductDetailProps) {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<any>(null);

  const isAuction = product && product?.saleType === AUCTION;
  const isGeneral = product && product?.saleType === GENERAL;

  useEffect(() => {
    const getSingleProduct = async () => {
      const response = await productAPI.getSingleProduct(productId);

      setProduct(response.product);
    };

    getSingleProduct();
  }, []);

  return (
    <>
      {isAuction && (
        <AuctionPage
          product={product}
          setProduct={setProduct}
          user={user}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
      )}
      {isGeneral && (
        <GeneralPage
          product={product}
          setProduct={setProduct}
          user={user}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
      )}
    </>
  );
}
