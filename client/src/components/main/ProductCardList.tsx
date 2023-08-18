import { Product } from "product";
import { AUCTION } from "../../constants/products";
import AuctionProductCard from "./AuctionProductCard";
import GeneralProductCard from "./GeneralProductCard";

type ProductCardListProps = {
  products: Array<Product>;
};

export default function ProductCardList({ products }: ProductCardListProps) {
  return (
    <>
      {products.map(product =>
        product.saleType === AUCTION ? (
          <AuctionProductCard data={product} />
        ) : (
          <GeneralProductCard data={product} />
        )
      )}
    </>
  );
}
