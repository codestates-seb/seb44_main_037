import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import formatCreatedAt from "../../utils/formatCreatedAt";
import TradingAPI from "../../api/trading";
import {
  DEMAND_LOGIN,
  FAILED,
  FAILED_FULFILLMENT,
  OK,
  SUCCESSFUL_BUY,
} from "../../constants/messages";
import { NOT_ONSALE_KO } from "../../constants/products";
import { showToast } from "../common/Toast";
import { ERROR, SUCCESS } from "../../constants/toast";
import HalfButton from "../common/HalfButton";

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

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftBox = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RightBox = styled.div`
  flex-basis: 50%;

  :nth-child(3) {
    margin: 3rem 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const ImageInfo = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.isDark && "#ffffff"};
`;

const MainImage = styled.img<{ isDark?: boolean }>`
  width: 50%;
  min-width: 100%;
  max-height: 25rem;
  margin-bottom: 1rem;
  object-fit: contain;
  background-color: var(--line-gray);
  filter: ${props => props.isDark && "brightness(50%)"};
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

const Description = styled.pre`
  margin: 2rem 0;
  font-size: 1rem;
  line-height: 1.4rem;
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

const PriceInfo = styled.div`
  & > * {
    display: inline;
    margin-right: 0.5rem;
  }
`;

const Price = styled.div`
  color: var(--red);
  font-size: 1.6rem;
  font-weight: bold;
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

  const navigate = useNavigate();

  const isSeller = user?._id === product.seller._id;
  const leftBlanks = Array.from({ length: 4 - product?.images.length });

  const handleBuyClick = async () => {
    const body = { productId: product._id };
    const response: any = await tradingAPI.buy(body, accessToken);

    if (response.result === OK) {
      setProduct(response.payload.product);
      showToast({ type: SUCCESS, message: SUCCESSFUL_BUY });
      navigate(`/mypage/chat`);
    }

    if (response.message === DEMAND_LOGIN) {
      showToast({ type: ERROR, message: DEMAND_LOGIN });
      return;
    }

    if (response.result === FAILED) {
      showToast({ type: ERROR, message: FAILED_FULFILLMENT });
    }
  };

  return (
    <>
      <Container>
        <UpperBox>
          <LeftBox>
            {product.isOnSale && <MainImage src={selectedImage} />}
            {!product.isOnSale && (
              <Wrapper>
                <MainImage src={selectedImage} isDark={true} />
                <ImageInfo isDark={true}>{NOT_ONSALE_KO}</ImageInfo>
              </Wrapper>
            )}
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
            <PriceInfo>
              <Price>{`${product.price.toLocaleString()}원`}</Price>
              <Text>배송비 포함</Text>
            </PriceInfo>
            <Description>{product.description}</Description>
            {!isSeller && product.isOnSale && (
              <ButtonBar>
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
      </Container>
    </>
  );
}
