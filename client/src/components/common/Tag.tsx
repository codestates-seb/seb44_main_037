import styled from "styled-components";

const Wrapper = styled.div<{
  color?: string;
}>`
  height: 2rem;
  padding: 0 3rem;
  font-size: 0.5rem;
  background-color: ${props => props.color || "var(--green)"};
  border-radius: 0.5rem;
`;

type TagProps = {
  text: string;
  color: string;
};

export default function Tag({ text, color }: TagProps) {
  return <Wrapper color={color}>{text}</Wrapper>;
}
