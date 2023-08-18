import { Link } from "react-router-dom";
import Image from "./Image";
import {
  AUCTION,
  BID_FAILED,
  BID_SUCCESS,
  GENERAL,
  NOT_ONSALE_KO,
} from "../../constants/products";

type AuctionProductProps = {
  productId: string;
  image: string;
  isOnSale: boolean;
  saleType: string;
  hasSuccessfulBidder?: boolean;
};

export default function ProductImage({
  productId,
  image,
  isOnSale,
  saleType,
  hasSuccessfulBidder,
}: AuctionProductProps) {
  const auctionState = hasSuccessfulBidder ? BID_SUCCESS : BID_FAILED;

  return (
    <Link to={`/products/${productId}`}>
      {isOnSale && <Image image={image} />}
      {!isOnSale && saleType === AUCTION && (
        <Image image={image} state={auctionState} />
      )}
      {!isOnSale && saleType === GENERAL && (
        <Image image={image} state={NOT_ONSALE_KO} />
      )}
    </Link>
  );
}
