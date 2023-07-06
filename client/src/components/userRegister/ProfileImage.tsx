import styled from "styled-components";
import uploaderIcon from "../../assets/images/image_uploader_icon.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 430px;
  height: 180px;
`;

const ProfileImageTool = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 180px;
  height: 180px;
`;

const Image = styled.img`
  position: absolute;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
`;

const UploaderImage = styled.img`
  cursor: pointer;
`;

const ImageUploader = styled.div`
  position: absolute;
  bottom: -0.3rem;
`;

const Uploader = styled.input`
  display: none;
`;

type ProfileImageProps = {
  imageUrl: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileImage({
  imageUrl,
  handleFileChange,
}: ProfileImageProps) {
  return (
    <Wrapper>
      <ProfileImageTool>
        <Image src={imageUrl} alt="프로필 이미지" width="180" height="180" />
        <ImageUploader>
          <label htmlFor="uploader">
            <UploaderImage
              src={uploaderIcon}
              alt="이미지 첨부"
              width="45px"
              height="40px"
              title="이미지 첨부하기"
            />
          </label>
          <Uploader
            type="file"
            id="uploader"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
          />
        </ImageUploader>
      </ProfileImageTool>
    </Wrapper>
  );
}
