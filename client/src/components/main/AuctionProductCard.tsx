import { Link } from "react-router-dom";
import * as S from "./productCard.style";
import formatLeftTime from "../../utils/formatLeftTime";
import changeCategoryToKorean from "../../utils/changeCategoryToKorean";
import PriceDetail from "./PriceDetail";
import ProductImage from "./ProductImage";
import { BID_FAILED, BID_SUCCESS } from "../../constants/products";

type Product = {
  _id: string;
  seller: object;
  images: Array<string>;
  title: string;
  description: string;
  saleType: string;
  price: number;
  bidInfo: BidInfo;
  category: string;
  deadline: number;
  createdAt: number;
  history: Array<History>;
  isOnSale: boolean;
};

type ProductCardProps = {
  data: Product;
};

type BidInfo = {
  instantBidPrice: number;
  startPrice: number;
  bidUnit: number;
  deadline: number;
};

type History = {
  bider: object;
  date: number;
  bidPrice: number;
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
  } = data;

  const highestBid = history[history.length - 1];
  const hasSuccessfulBidder = history.length > 0;

  return (
    <S.Wrapper>
      {images && (
        <Link to={`/products/${productId}`}>
          {isOnSale && <ProductImage image={images[0]} />}
          {!isOnSale && (
            <>
              {hasSuccessfulBidder && (
                <ProductImage image={images[0]} state={BID_SUCCESS} />
              )}
              {!hasSuccessfulBidder && (
                <ProductImage image={images[0]} state={BID_FAILED} />
              )}
            </>
          )}
        </Link>
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
        {!isOnSale && (
          <>
            {hasSuccessfulBidder && (
              <PriceDetail name={"최종낙찰가"} price={highestBid.bidPrice} />
            )}
            {!hasSuccessfulBidder && (
              <PriceDetail
                name={"즉시낙찰가"}
                price={bidInfo.instantBidPrice}
              />
            )}
          </>
        )}
        {isOnSale && (
          <>
            <PriceDetail name={"즉시낙찰가"} price={bidInfo?.instantBidPrice} />
            <PriceDetail
              name={"최고입찰가"}
              price={highestBid?.bidPrice}
              color="var(--green)"
            />
          </>
        )}
      </S.PriceBox>
    </S.Wrapper>
  );
}
