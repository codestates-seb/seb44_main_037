import styled from "styled-components";

const Button = styled.button<{
  backgroundColor: undefined | string;
  width: undefined | string;
  isUnable: undefined | boolean;
}>`
  width: ${props => props.width || "14rem"};
  height: 3rem;
  margin: 0 0.2rem;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: ${props =>
    props.isUnable ? "var(--dropdown-gray)" : props.backgroundColor};
  border-radius: 0.2rem;
  cursor: ${props => (props.isUnable ? "default" : "pointer")};

  &:hover {
    transition: ${props => (props.isUnable ? "none" : "filter 0.2s ease-out")};
    filter: ${props => (props.isUnable ? "none" : "brightness(120%)")};
  }
`;

type HalfButtonProps = {
  onClick?: () => void;
  name: string;
  backgroundColor: string;
  width?: string;
  isUnable?: boolean;
};

function HalfButton({
  onClick,
  name,
  backgroundColor,
  width,
  isUnable,
}: HalfButtonProps) {
  return (
    <Button
      onClick={isUnable ? undefined : onClick}
      backgroundColor={backgroundColor}
      width={width}
      isUnable={isUnable}
    >
      {name}
    </Button>
  );
}

export default HalfButton;
