import { useState } from "react";
import { useNavigate } from "react-router";
import * as S from "./GeneralPage.style";
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
      <S.Container>
        <S.UpperBox>
          <S.LeftBox>
            {product.isOnSale && <S.MainImage src={selectedImage} />}
            {!product.isOnSale && (
              <S.Wrapper>
                <S.MainImage src={selectedImage} isDark={true} />
                <S.ImageInfo isDark={true}>{NOT_ONSALE_KO}</S.ImageInfo>
              </S.Wrapper>
            )}
            <S.Images>
              {product.images.map((url: string) => (
                <S.ImageWrapper>
                  <S.Image
                    src={url}
                    alt=""
                    key={url}
                    isSelected={url === selectedImage ? true : false}
                    onClick={() => setSelectedImage(url)}
                  />
                </S.ImageWrapper>
              ))}
              {leftBlanks.map((el, index) => (
                <S.ImageWrapper>
                  <S.BlankBox key={index} />
                </S.ImageWrapper>
              ))}
            </S.Images>
          </S.LeftBox>
          <S.RightBox>
            <S.BigTitle>{product.title}</S.BigTitle>
            <S.Text>{formatCreatedAt(product.createdAt)}</S.Text>
            <S.PriceInfo>
              <S.Price>{`${product.price.toLocaleString()}원`}</S.Price>
              <S.Text>배송비 포함</S.Text>
            </S.PriceInfo>
            <S.Description>{product.description}</S.Description>
            {!isSeller && product.isOnSale && (
              <S.ButtonBar>
                <HalfButton
                  name="즉시 구매하기"
                  onClick={handleBuyClick}
                  backgroundColor={"var(--green)"}
                  width="100%"
                  isUnable={product.isOnSale ? false : true}
                />
              </S.ButtonBar>
            )}
          </S.RightBox>
        </S.UpperBox>
      </S.Container>
    </>
  );
}
