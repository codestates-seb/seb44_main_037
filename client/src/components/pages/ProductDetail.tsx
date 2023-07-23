import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductAPI from "../../api/product";
import AuctionPage from "../ProductDetail/AuctionPage";
import GeneralPage from "../ProductDetail/GeneralPage";
import { AUCTION, GENERAL } from "../../constants/products";
import { useGlobalContext } from "../routerTemplate/General";

const productAPI = new ProductAPI();

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<any>(null);

  const { user, accessToken, setAccessToken } = useGlobalContext();

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
      {isAuction && <AuctionPage product={product} setProduct={setProduct} />}
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
