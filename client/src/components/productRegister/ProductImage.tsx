import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const BlankBox = styled.div`
  width: 25%;
  height: 10rem;
  background-color: #d8d8d8;
`;

const Image = styled.img`
  width: 25%;
  height: 10rem;
`;

const Button = styled.div`
  width: 100%;
  height: 2.5rem;
  line-height: 2.2rem;
  margin: 1rem 0.2rem;
  color: var(--green);
  font-size: 1rem;
  text-align: center;
  border: 0.15rem solid var(--green);
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    transition: filter 0.2s ease-out;
    filter: brightness(120%);
  }
`;

const ImageUploader = styled.div`
  width: 100%;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const Uploader = styled.input`
  display: none;
`;

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
    <Wrapper>
      <BoxWrapper>
        {imageUrlList.map(url => (
          <Image src={url} alt="" key={url} />
        ))}
        {leftBlanks.map((el, index) => (
          <BlankBox key={index} />
        ))}
      </BoxWrapper>
      <ImageUploader>
        <label htmlFor="uploader">
          <Button>클릭하여 사진 업로드하기</Button>
        </label>
        <Uploader
          type="file"
          id="uploader"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          multiple
        />
      </ImageUploader>
    </Wrapper>
  );
}
