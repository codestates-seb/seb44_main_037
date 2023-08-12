import * as S from "./ProductImage.style";

type ProductImageProps = {
  imageUrlList: Array<string>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductImage({
  imageUrlList,
  handleFileChange,
}: ProductImageProps) {
  const leftBlanks = Array.from({ length: 4 - imageUrlList.length });

  return (
    <S.Wrapper>
      <S.BoxWrapper>
        {imageUrlList.map(url => (
          <S.Image src={url} alt="" key={url} />
        ))}
        {leftBlanks.map((el, index) => (
          <S.BlankBox key={index} />
        ))}
      </S.BoxWrapper>
      <S.ImageUploader>
        <label htmlFor="uploader">
          <S.Button>클릭하여 사진 업로드하기</S.Button>
        </label>
        <S.Uploader
          type="file"
          id="uploader"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          multiple
        />
      </S.ImageUploader>
    </S.Wrapper>
  );
}
