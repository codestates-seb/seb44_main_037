import { useState } from "react";
import styled from "styled-components";
import formatCreatedAt from "../../utils/formatCreatedAt";
import HalfButton from "../common/HalfButton";
import TradingAPI from "../../api/trading";
import { DEMAND_LOGIN, FAILED, OK } from "../../constants/messages";

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
  margin-bottom: 1.5rem;
  gap: 2.5rem;
`;

const LowerBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
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

const Description = styled.div`
  margin: 2rem 0;
  font-size: 1rem;
`;

const Text = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

const ButtonBar = styled.div`
  display: flex;
  margin-top: 7rem;
`;

const tradingAPI = new TradingAPI();

type GeneralPageProps = {
  user: any;
  product: any;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

export default function GeneralPage({
  user,
  product,
  setProduct,
  accessToken,
  setAccessToken,
}: GeneralPageProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

  const isSeller = user?._id === product.seller._id;
  const leftBlanks = Array.from({ length: 4 - product?.images.length });

  const handleChatClick = () => {
    console.log("chat 클릭!");
  };

  const handleBuyClick = async () => {
    const body = { productId: product._id };
    const response: any = await tradingAPI.buy(body, accessToken);

    if (response.result === OK) {
      setProduct(response.payload.product);
      alert("구매 성공!");
    }

    if (response.message === DEMAND_LOGIN) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (response.result === FAILED) {
      alert("구매 실패.");
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
                <ImageWrapper>
                  <Image
                    src={url}
                    alt=""
                    key={url}
                    isSelected={url === selectedImage ? true : false}
                    onClick={() => setSelectedImage(url)}
                  />
                </ImageWrapper>
              ))}
              {leftBlanks.map((el, index) => (
                <ImageWrapper>
                  <BlankBox key={index} />
                </ImageWrapper>
              ))}
            </Images>
          </LeftBox>
          <RightBox>
            <BigTitle>{product.title}</BigTitle>
            <Text>{formatCreatedAt(product.createdAt)}</Text>
            <Description>{product.description}</Description>
            {!isSeller && (
              <ButtonBar>
                <HalfButton
                  name="판매자와 연락하기"
                  onClick={handleChatClick}
                  backgroundColor="var(--navy)"
                  width="100%"
                />
                <HalfButton
                  name="즉시 구매하기"
                  onClick={handleBuyClick}
                  backgroundColor={"var(--green)"}
                  width="100%"
                  isUnable={product.isOnSale ? false : true}
                />
              </ButtonBar>
            )}
          </RightBox>
        </UpperBox>
        <LowerBox>
          <LeftBox></LeftBox>
          <RightBox></RightBox>
        </LowerBox>
      </Container>
    </>
  );
}
