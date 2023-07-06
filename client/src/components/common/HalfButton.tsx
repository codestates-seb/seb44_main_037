import styled from "styled-components";

const Button = styled.button<{ backgroundColor: undefined | string }>`
  width: 14rem;
  height: 3rem;
  margin: 0 0.2rem;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: ${props => props.backgroundColor || "var(--green)"};
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    transition: filter 0.2s ease-out;
    filter: brightness(120%);
  }
`;

type HalfButtonProps = {
  onClick?: () => void;
  name: string;
  backgroundColor?: string;
};

function HalfButton({ onClick, name, backgroundColor }: HalfButtonProps) {
  return (
    <Button onClick={onClick} backgroundColor={backgroundColor}>
      {name}
    </Button>
  );
}

export default HalfButton;
