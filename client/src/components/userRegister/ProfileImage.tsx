import * as S from "./ProfileImage.style";
import uploaderIcon from "../../assets/images/image_uploader_icon.svg";

type ProfileImageProps = {
  imageUrl: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileImage({
  imageUrl,
  handleFileChange,
}: ProfileImageProps) {
  return (
    <S.Wrapper>
      <S.ProfileImageTool>
        <S.Image src={imageUrl} alt="프로필 이미지" width="180" height="180" />
        <S.ImageUploader>
          <label htmlFor="uploader">
            <S.UploaderImage
              src={uploaderIcon}
              alt="이미지 첨부"
              width="45px"
              height="40px"
              title="이미지 첨부하기"
            />
          </label>
          <S.Uploader
            type="file"
            id="uploader"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
          />
        </S.ImageUploader>
      </S.ProfileImageTool>
    </S.Wrapper>
  );
}
