import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 430px;
  height: 180px;
`;

export const ProfileImageTool = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 180px;
  height: 180px;
`;

export const Image = styled.img`
  position: absolute;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
`;

export const UploaderImage = styled.img`
  cursor: pointer;
`;

export const ImageUploader = styled.div`
  position: absolute;
  bottom: -0.3rem;
`;

export const Uploader = styled.input`
  display: none;
`;
