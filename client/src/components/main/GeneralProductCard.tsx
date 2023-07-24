import { Link } from "react-router-dom";
import * as S from "./productCard.style";
import changeCategoryToKorean from "../../utils/changeCategoryToKorean";
import PriceDetail from "./PriceDetail";
import ProductImage from "./ProductImage";
import formatCreatedAt from "../../utils/formatCreatedAt";

type Product = {
  _id: string;
  seller: object;
  images: Array<string>;
  title: string;
  description: string;
  saleType: string;
  price: number;
  bidInfo: BidInfo | null;
  category: string;
  deadline: number;
  createdAt: number;
};

type ProductCardProps = {
  data: Product;
};

type BidInfo = {
  instantBidPrice: number;
  startPrice: number;
  bidUnit: number;
  deadline: number;
  history: Array<History>;
};

type History = {
  bider: object;
  date: number;
  bidPrice: number;
};

export default function GeneralProductCard({ data }: ProductCardProps) {
  const { _id: productId, images, title, price, category, createdAt } = data;

  return (
    <S.Wrapper>
      {images && (
        <Link to={`/products/${productId}`}>
          <ProductImage image={images[0]} />
        </Link>
      )}
      <S.UpperInfo>
        <S.SmallText>{changeCategoryToKorean(category)}</S.SmallText>
        <S.SmallText>{formatCreatedAt(createdAt)}</S.SmallText>
      </S.UpperInfo>
      <Link to={`/products/${productId}`}>
        <S.Title>{title}</S.Title>
      </Link>
      <S.PriceBox>
        <PriceDetail name={"정가"} price={price} />
      </S.PriceBox>
    </S.Wrapper>
  );
}
