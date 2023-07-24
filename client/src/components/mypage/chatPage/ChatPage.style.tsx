import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 4rem;
  gap: 2rem;
  background-color: var(--background);
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1rem solid var(--line-gray);
  border-radius: 0.5rem;
  background-color: #fff;
  height: 80vh;

  & > * {
    padding: 1rem;
    border-bottom: 0.1rem solid var(--line-gray);

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const MessageListBox = styled(Box)`
  overflow-y: scroll;
`;

export const Title = styled.div`
  margin-top: 0.2rem;
  color: #474747;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const ProductTitle = styled(Title)`
  width: 100%;
`;

export const ProductImage = styled.img<{
  size?: string;
}>`
  width: ${props => props.size || "5rem"};
  height: ${props => props.size || "5rem"};
  margin-right: 1rem;
  background-color: var(--gray);
`;

export const ChatRoomCard = styled.div<{
  isSelected?: boolean;
}>`
  display: flex;
  width: 22rem;
  padding: 1rem;
  background-color: ${props => props.isSelected && "var(--input-gray)"};
`;

export const CardTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :nth-child(3) {
    margin-top: 2rem;
  }
`;

export const SmallText = styled.div<{
  color?: string;
}>`
  font-size: 0.8rem;
  color: ${props => props.color || "var(--gray)"};
`;

export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 3rem;

  :nth-child(2) {
    text-align: right;
  }
`;

export const MessageBox = styled.div`
  height: 60%;
  flex-grow: 1;
  overflow-y: scroll;
`;

export const MessageWrapper = styled.div<{
  isMe?: boolean;
}>`
  display: flex;
  flex-direction: ${props => (props.isMe ? "row-reverse" : "row")};
  align-items: end;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

export const Time = styled.div`
  font-size: 0.7rem;
  color: var(--dark-gray);
`;

export const SpeechBubble = styled.div`
  max-width: 60%;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 0.5rem;

  :nth-child(3) {
    margin-top: 2rem;
  }
`;
