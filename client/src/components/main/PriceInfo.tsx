import { BidHistory, BidInfo } from "product";
import PriceDetail from "./PriceDetail";

type PriceInfoProps = {
  isOnSale: boolean;
  bidInfo: BidInfo;
  highestBid: BidHistory;
  hasSuccessfulBidder: boolean;
};

export default function PriceInfo({
  isOnSale,
  bidInfo,
  highestBid,
  hasSuccessfulBidder,
}: PriceInfoProps) {
  return (
    <>
      {!isOnSale && (
        <>
          {hasSuccessfulBidder && (
            <PriceDetail name={"최종낙찰가"} price={highestBid.bidPrice} />
          )}
          {!hasSuccessfulBidder && (
            <PriceDetail name={"즉시낙찰가"} price={bidInfo.instantBidPrice} />
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
    </>
  );
}
