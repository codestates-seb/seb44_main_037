import styled from "styled-components";
import icon from "../../assets/images/info_icon.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

const Icon = styled.img`
  width: 0.9rem;
  margin-right: 0.3rem;
`;

type InfoTextProps = {
  text: string;
};

export default function InfoText({ text }: InfoTextProps) {
  return (
    <Wrapper>
      <Icon src={icon} />
      <Text>{text}</Text>
    </Wrapper>
  );
}
