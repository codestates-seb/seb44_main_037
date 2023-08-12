import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as S from "./AuctionPage.style";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "../../App";
import formatCreatedAt from "../../utils/formatCreatedAt";
import useInput from "../../hook/useInput";
import { useGlobalContext } from "../routerTemplate/General";
import TradingAPI from "../../api/trading";
import {
  DOUBLE_BIDDING,
  FAILED,
  FAILED_AUCTION_CLOSE,
  FAILED_INSTANT_BID,
  OK,
  SUCCESSFUL_AUCTION_CLOSE,
  SUCCESSFUL_BID,
} from "../../constants/messages";
import { ERROR, SUCCESS } from "../../constants/toast";
import { BID_FAILED, NOT_ONSALE_KO } from "../../constants/products";
import { showToast } from "../common/Toast";

import HalfButton from "../common/HalfButton";
import PriceDetail from "../ProductDetail/PriceDetail";
import BidInput from "./BidInput";
import LeftTime from "./LeftTime";

const tradingAPI = new TradingAPI();

type History = {
  _id: string;
  bider: any;
  bidPrice: number;
  createdAt: number;
};

type AuctionPageProps = {
  product: any;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
};

export default function AuctionPage({ product, setProduct }: AuctionPageProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >();

  const { user, accessToken, setAccessToken } = useGlobalContext();
  const [form, onChange, reset, setForm] = useInput({
    bid: "",
  });

  const navigate = useNavigate();

  const latestBid = product.history[product.history.length - 1] || null;
  const isSeller = user?._id === product.seller._id;
  const leftBlanks = Array.from({ length: 4 - product.images.length });
  const hasBider = product.history.length > 0;

  useEffect(() => {
    const URL: string = process.env.REACT_APP_SERVER || "";
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${URL}/auction`,
      {
        withCredentials: true,
        extraHeaders: {
          "product-id": product._id,
        },
      }
    );

    setSocket(socket);
  }, []);

  useEffect((): any => {
    socket?.on("bid", (data: any) => {
      setProduct({ ...product, history: [...product.history, data] });
    });

    socket?.on("auctionClose", (data: any) => {
      setProduct(data);
    });

    return () => socket?.disconnect();
  }, [socket]);

  const handleChatClick = () => {
    navigate(`/mypage/chat`);
  };

  const handleBuyClick = async () => {
    const body = { productId: product._id };
    const response: any = await tradingAPI.bidInstantly(body, accessToken);

    if (response.result === OK) {
      const updatedProduct = response.payload.product;

      setProduct((prev: any) => ({ ...prev, ...updatedProduct }));
      showToast({ type: SUCCESS, message: SUCCESSFUL_AUCTION_CLOSE });

      socket?.emit("auctionClose", updatedProduct, (response: any) => {
        console.log(response);
      });
    }

    if (response.result === FAILED) {
      showToast({ type: ERROR, message: FAILED_INSTANT_BID });
    }
  };

  const handleBidClick = async () => {
    if (latestBid?.bider._id === user._id) {
      showToast({ type: ERROR, message: DOUBLE_BIDDING });
      return;
    }

    const body = { productId: product._id, price: form.bid };
    const response: any = await tradingAPI.bid(body, accessToken);

    if (response.result === OK) {
      const updatedProduct = response.payload.product;
      const bidHistory = updatedProduct.history;
      const data = bidHistory[bidHistory.length - 1];

      setProduct(updatedProduct);
      showToast({ type: SUCCESS, message: SUCCESSFUL_BID });

      socket?.emit("bid", data, (response: any) => {
        console.log(response);
      });
    }

    if (response.result === FAILED) {
      showToast({ type: ERROR, message: response.message });
    }

    reset();
  };

  const handleRepostClick = async () => {
    console.log("repost 클릭!");
  };

  const handleCloseAuctionClick = async () => {
    const body = { productId: product._id };
    const response: any = await tradingAPI.closeBid(body, accessToken);

    if (response.result === OK) {
      const updatedProduct = response.payload.product;

      setProduct(updatedProduct);
      showToast({ type: SUCCESS, message: SUCCESSFUL_AUCTION_CLOSE });

      socket?.emit("auctionClose", updatedProduct, (response: any) => {
        console.log(response);
      });
    }

    if (response.result === FAILED) {
      showToast({ type: ERROR, message: FAILED_AUCTION_CLOSE });
    }
  };

  return (
    <>
      <S.Container>
        <S.UpperBox>
          <S.LeftBox>
            {product.isOnSale && <S.MainImage src={selectedImage} />}
            {!product.isOnSale && (
              <S.Wrapper>
                <S.MainImage src={selectedImage} isDark={true} />
                <S.ImageInfo isDark={true}>
                  {hasBider ? NOT_ONSALE_KO : BID_FAILED}
                </S.ImageInfo>
              </S.Wrapper>
            )}
            <S.Images>
              {product.images.map((url: string) => (
                <S.ImageWrapper key={url}>
                  <S.Image
                    src={url}
                    alt=""
                    isSelected={url === selectedImage ? true : false}
                    onClick={() => setSelectedImage(url)}
                  />
                </S.ImageWrapper>
              ))}
              {leftBlanks.map((el, index) => (
                <S.ImageWrapper key={index}>
                  <S.BlankBox />
                </S.ImageWrapper>
              ))}
            </S.Images>
          </S.LeftBox>
          <S.RightBox>
            <S.BigTitle>{product.title}</S.BigTitle>
            <S.Text>{formatCreatedAt(product.createdAt)}</S.Text>

            <S.AuctionPriceWrapper>
              <PriceDetail
                color="var(--gray)"
                name="시작가"
                price={product.bidInfo.startPrice}
              />
              <PriceDetail
                color="var(--gray)"
                name="입찰 단위"
                price={product.bidInfo.bidUnit}
              />
              <PriceDetail
                color="var(--red)"
                name="최고입찰가"
                price={latestBid ? latestBid.bidPrice : 0}
              />
              <PriceDetail
                color="var(--green)"
                name="즉시낙찰가"
                price={product.bidInfo.instantBidPrice}
              />
            </S.AuctionPriceWrapper>

            {product.isOnSale && !isSeller && (
              <BidInput
                form={form}
                name={"bid"}
                onChange={onChange}
                handleBidClick={handleBidClick}
              />
            )}

            {product.isOnSale && !isSeller && (
              <S.ButtonBar>
                <HalfButton
                  name="판매자와 연락하기"
                  onClick={handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                  isUnable={true}
                />
                <HalfButton
                  name="즉시 낙찰받기"
                  onClick={handleBuyClick}
                  backgroundColor="var(--green)"
                  width="100%"
                />
              </S.ButtonBar>
            )}
            {product.isOnSale && isSeller && (
              <S.ButtonBar>
                <HalfButton
                  name="경매 조기종료"
                  onClick={handleCloseAuctionClick}
                  backgroundColor="var(--red)"
                  width="100%"
                />
              </S.ButtonBar>
            )}
            {!product.isOnSale && hasBider && (
              <S.ButtonBar>
                <HalfButton
                  name={isSeller ? "구매자와 연락하기" : "판매자와 연락하기"}
                  onClick={handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                  isUnable={true}
                />
              </S.ButtonBar>
            )}
            {!product.isOnSale && !hasBider && (
              <S.ButtonBar>
                <HalfButton
                  name={isSeller ? "일반 판매로 전환하기" : "판매자와 연락하기"}
                  onClick={isSeller ? handleRepostClick : handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                  isUnable={true}
                />
              </S.ButtonBar>
            )}
          </S.RightBox>
        </S.UpperBox>
        <S.LowerBox>
          <S.LeftBox>
            <S.SmallTitle>상품 설명</S.SmallTitle>
            <S.Description>{product.description}</S.Description>
          </S.LeftBox>
          <S.RightBox>
            <S.SmallTitle>실시간 입찰 현황</S.SmallTitle>
            <S.SmallText>
              {product.isOnSale ? (
                <LeftTime deadline={product.bidInfo.deadline} />
              ) : (
                "마감"
              )}
            </S.SmallText>
            {hasBider && (
              <>
                <S.BeigeBox>
                  <S.Left>
                    <div>현재 최고 입찰자</div>
                    <div>{formatCreatedAt(latestBid.createdAt)}</div>
                  </S.Left>
                  <S.Right>{latestBid.bider.nickname}</S.Right>
                </S.BeigeBox>
                <S.HistoryBox>
                  <S.HistoryTitle>
                    <div>입찰 일시</div>
                    <div>입찰가</div>
                    <div>입찰자명</div>
                  </S.HistoryTitle>
                  {[...product.history]
                    .reverse()
                    .map(({ bider, bidPrice, createdAt, _id }: History) => (
                      <S.History key={_id}>
                        <div>{formatCreatedAt(createdAt)}</div>
                        <div>{`${bidPrice.toLocaleString()}원`}</div>
                        <div>{bider.nickname}</div>
                      </S.History>
                    ))}
                </S.HistoryBox>
              </>
            )}
            {!hasBider && (
              <S.BeigeBox>
                {product.isOnSale
                  ? "입찰자를 기다리는 중입니다. 이 상품의 첫 입찰자가 되어 보세요!"
                  : "입찰자 없이 마감된 경매입니다."}
              </S.BeigeBox>
            )}
          </S.RightBox>
        </S.LowerBox>
      </S.Container>
    </>
  );
}
