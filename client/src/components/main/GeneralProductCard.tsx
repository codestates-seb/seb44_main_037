import { Link } from "react-router-dom";
import { Product } from "product";
import * as S from "./ProductCard.style";
import changeCategoryToKorean from "../../utils/changeCategoryToKorean";
import PriceDetail from "./PriceDetail";
import ProductImage from "./ProductImage";
import formatCreatedAt from "../../utils/formatCreatedAt";
import { NOT_ONSALE_KO } from "../../constants/products";

type ProductCardProps = {
  data: Product;
};

export default function GeneralProductCard({ data }: ProductCardProps) {
  const {
    _id: productId,
    images,
    title,
    price,
    category,
    createdAt,
    isOnSale,
  } = data;

  return (
    <S.Wrapper>
      {images && (
        <Link to={`/products/${productId}`}>
          {isOnSale && <ProductImage image={images[0]} />}
          {!isOnSale && (
            <ProductImage image={images[0]} state={NOT_ONSALE_KO} />
          )}
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
