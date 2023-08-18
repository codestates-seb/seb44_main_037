import { Link } from "react-router-dom";
import { Product } from "product";
import * as S from "./ProductCard.style";
import formatLeftTime from "../../utils/formatLeftTime";
import changeCategoryToKorean from "../../utils/changeCategoryToKorean";
import ProductImage from "./ProductImage";
import PriceInfo from "./PriceInfo";

type ProductCardProps = {
  data: Product;
};

export default function AuctionProductCard({ data }: ProductCardProps) {
  const {
    _id: productId,
    images,
    title,
    bidInfo,
    category,
    history,
    isOnSale,
    saleType,
  } = data;

  const highestBid = history[history.length - 1];
  const hasSuccessfulBidder = history.length > 0;

  return (
    <S.Wrapper>
      {images && (
        <ProductImage
          productId={productId}
          image={images[0]}
          isOnSale={isOnSale}
          hasSuccessfulBidder={hasSuccessfulBidder}
          saleType={saleType}
        />
      )}
      <S.UpperInfo>
        <S.SmallText>{changeCategoryToKorean(category)}</S.SmallText>
        <S.SmallText color="var(--pink)">
          {isOnSale ? formatLeftTime(bidInfo?.deadline) : "마감"}
        </S.SmallText>
      </S.UpperInfo>
      <Link to={`/products/${productId}`}>
        <S.Title>{title}</S.Title>
      </Link>
      <S.PriceBox>
        <PriceInfo
          isOnSale={isOnSale}
          bidInfo={bidInfo}
          highestBid={highestBid}
          hasSuccessfulBidder={hasSuccessfulBidder}
        />
      </S.PriceBox>
    </S.Wrapper>
  );
}
