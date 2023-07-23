import { useEffect, useState } from "react";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "../../App";
import formatCreatedAt from "../../utils/formatCreatedAt";
import useInput from "../../hook/useInput";
import { useGlobalContext } from "../routerTemplate/General";
import TradingAPI from "../../api/trading";
import { FAILED, OK } from "../../constants/messages";

import HalfButton from "../common/HalfButton";
import PriceDetail from "../ProductDetail/PriceDetail";
import BidInput from "./BidInput";
import LeftTime from "./LeftTime";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1264px;
  padding: 1.5rem 1rem;
`;

const UpperBox = styled.div`
  display: flex;
  width: 100%;
  margin: 1.5rem 0;
  gap: 2.5rem;
`;

const LowerBox = styled.div`
  display: flex;
  width: 100%;
  margin: 1.5rem 0;
  gap: 2.5rem;
`;

const LeftBox = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RightBox = styled.div`
  flex-basis: 50%;
`;

const FocusedImage = styled.img`
  min-width: 100%;
  max-height: 25rem;
  margin-bottom: 1rem;
  object-fit: contain;
  background-color: var(--line-gray);
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Images = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const Image = styled.img<{ isSelected: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.isSelected && "0.5"};
  cursor: pointer;
`;

const BlankBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--line-gray);
`;

const BigTitle = styled.h1`
  margin-top: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
`;

const SmallTitle = styled.h2`
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Text = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

const ButtonBar = styled.div`
  display: flex;
  margin-top: 4rem;
`;

const AuctionPriceWrapper = styled.div`
  margin-top: 2rem;

  :nth-child(3) {
    margin-top: 2rem;
  }
`;

const BeigeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.7rem 1.5rem;
  margin: 1rem 0;
  background-color: var(--beige);
  border-radius: 0.5rem;
`;

const Left = styled.div`
  :nth-child(1) {
    font-size: 1.1rem;
  }

  :nth-child(2) {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: var(--drak-gray);
  }
`;

const Right = styled.div`
  margin-top: 0.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--gray);
`;

const SmallText = styled.div`
  margin: 0.5rem 0;
  color: var(--pink);
  font-size: 0.8rem;
`;

const HistoryBox = styled(BeigeBox)`
  flex-direction: column;
`;

const History = styled.div`
  display: flex;
  width: 100%;
  color: var(--gray);
  font-size: 1rem;

  & > * {
    flex-basis: calc(100% / 3);
    margin: 0.3rem 0;
    text-align: center;
  }
`;

const HistoryTitle = styled(History)`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--drak-gray);
`;

const tradingAPI = new TradingAPI();

type History = {
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
    console.log("chat 클릭!");
  };

  const handleBuyClick = async () => {
    const body = { productId: product._id };
    const response: any = await tradingAPI.bidInstantly(body, accessToken);

    if (response.result === OK) {
      const updatedProduct = response.payload.product;

      setProduct((prev: any) => ({ ...prev, ...updatedProduct }));
      alert("경매를 조기종료합니다.");

      socket?.emit("auctionClose", updatedProduct, (response: any) => {
        console.log(response);
      });
    }

    if (response.result === FAILED) {
      alert("낙찰에 실패했습니다.");
    }
  };

  const handleBidClick = async () => {
    const body = { productId: product._id, price: form.bid };
    const response: any = await tradingAPI.bid(body, accessToken);

    if (response.result === OK) {
      const updatedProduct = response.payload.product;
      const bidHistory = updatedProduct.history;
      const data = bidHistory[bidHistory.length - 1];

      setProduct((prev: any) => ({ ...prev, ...updatedProduct }));

      alert("응찰에 성공했습니다!");

      socket?.emit("bid", data, (response: any) => {
        console.log(response);
      });
    }

    if (response.result === FAILED) {
      alert("응찰에 실패했습니다.");
    }
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
      alert("경매를 조기종료합니다.");

      socket?.emit("auctionClose", updatedProduct, (response: any) => {
        console.log(response);
      });
    }

    if (response.result === FAILED) {
      alert("종료에 실패했습니다.");
    }
  };

  return (
    <>
      <Container>
        <UpperBox>
          <LeftBox>
            <FocusedImage src={selectedImage} />
            <Images>
              {product.images.map((url: string) => (
                <ImageWrapper key={url}>
                  <Image
                    src={url}
                    alt=""
                    isSelected={url === selectedImage ? true : false}
                    onClick={() => setSelectedImage(url)}
                  />
                </ImageWrapper>
              ))}
              {leftBlanks.map((el, index) => (
                <ImageWrapper key={index}>
                  <BlankBox />
                </ImageWrapper>
              ))}
            </Images>
          </LeftBox>
          <RightBox>
            <BigTitle>{product.title}</BigTitle>
            <Text>{formatCreatedAt(product.createdAt)}</Text>

            <AuctionPriceWrapper>
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
            </AuctionPriceWrapper>

            {product.isOnSale && !isSeller && (
              <BidInput
                form={form}
                name={"bid"}
                onChange={onChange}
                handleBidClick={handleBidClick}
              />
            )}

            {product.isOnSale && !isSeller && (
              <ButtonBar>
                <HalfButton
                  name="판매자와 연락하기"
                  onClick={handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                />
                <HalfButton
                  name="즉시 낙찰받기"
                  onClick={handleBuyClick}
                  backgroundColor="var(--green)"
                  width="100%"
                />
              </ButtonBar>
            )}
            {product.isOnSale && isSeller && (
              <ButtonBar>
                <HalfButton
                  name="경매 조기종료"
                  onClick={handleCloseAuctionClick}
                  backgroundColor="var(--red)"
                  width="100%"
                />
              </ButtonBar>
            )}
            {!product.isOnSale && hasBider && (
              <ButtonBar>
                <HalfButton
                  name={isSeller ? "구매자와 연락하기" : "판매자와 연락하기"}
                  onClick={handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                />
              </ButtonBar>
            )}
            {!product.isOnSale && !hasBider && (
              <ButtonBar>
                <HalfButton
                  name={isSeller ? "일반 판매로 전환하기" : "판매자와 연락하기"}
                  onClick={isSeller ? handleRepostClick : handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                />
              </ButtonBar>
            )}
          </RightBox>
        </UpperBox>
        <LowerBox>
          <LeftBox>
            <SmallTitle>상품 설명</SmallTitle>
            <p>{product.description}</p>
          </LeftBox>
          <RightBox>
            <SmallTitle>실시간 입찰 현황</SmallTitle>
            <SmallText>
              {product.isOnSale ? (
                <LeftTime deadline={product.bidInfo.deadline} />
              ) : (
                "마감"
              )}
            </SmallText>
            {hasBider && (
              <>
                <BeigeBox>
                  <Left>
                    <div>현재 최고 입찰자</div>
                    <div>{formatCreatedAt(latestBid.createdAt)}</div>
                  </Left>
                  <Right>{latestBid.bider.nickname}</Right>
                </BeigeBox>
                <HistoryBox>
                  <HistoryTitle>
                    <div>입찰 일시</div>
                    <div>입찰가</div>
                    <div>입찰자명</div>
                  </HistoryTitle>
                  {[...product.history]
                    .reverse()
                    .map(({ bider, bidPrice, createdAt }: History) => (
                      <History>
                        <div>{formatCreatedAt(createdAt)}</div>
                        <div>{`${bidPrice.toLocaleString()}원`}</div>
                        <div>{bider.nickname}</div>
                      </History>
                    ))}
                </HistoryBox>
              </>
            )}
            {!hasBider && (
              <BeigeBox>
                입찰자를 기다리는 중입니다. 이 상품의 첫 입찰자가 되어 보세요!
              </BeigeBox>
            )}
          </RightBox>
        </LowerBox>
      </Container>
    </>
  );
}
