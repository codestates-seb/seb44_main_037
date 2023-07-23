import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import type { ServerToClientEvents, ClientToServerEvents } from "../../../App";
import ChatAPI from "../../../api/chat";
import { useUser } from "../../routerTemplate/ForMyPage";
import { DEMAND_LOGIN, FAILED, OK } from "../../../constants/messages";
import formatCreatedAt from "../../../utils/formatCreatedAt";

const Background = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 4rem;
  gap: 2rem;
  background-color: var(--background);
`;

const BoldText = styled.div`
  margin-top: 0.2rem;
  color: #474747;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ProductTitle = styled(BoldText)`
  width: 100%;
`;

const Box = styled.div`
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

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 3rem;

  :nth-child(2) {
    text-align: right;
  }
`;

const ProductImage = styled.img<{
  size?: string;
}>`
  width: ${props => props.size || "5rem"};
  height: ${props => props.size || "5rem"};
  margin-right: 1rem;
  background-color: var(--gray);
`;

const ChatRoomCard = styled.div<{
  isSelected?: boolean;
}>`
  display: flex;
  width: 22rem;
  padding: 1rem;
  background-color: ${props => props.isSelected && "var(--input-gray)"};
`;

const CardTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :nth-child(3) {
    margin-top: 2rem;
  }
`;

const MessageBox = styled.div`
  height: 60%;
  flex-grow: 1;
  overflow-y: scroll;
`;

const MessageWrapper = styled.div<{
  isMe?: boolean;
}>`
  display: flex;
  flex-direction: ${props => (props.isMe ? "row" : "row-reverse")};
  align-items: end;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const Time = styled.div`
  font-size: 0.7rem;
  color: var(--dark-gray);
`;

const SpeechBubble = styled.div`
  max-width: 60%;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 0.5rem;

  :nth-child(3) {
    margin-top: 2rem;
  }
`;

const chatAPI = new ChatAPI();

const SmallText = styled.div<{
  color?: string;
}>`
  font-size: 0.8rem;
  color: ${props => props.color || "var(--gray)"};
`;

const InputBox = styled.div`
  margin: 1rem;
  border-radius: 0.3rem;
  background: var(--background);
`;

const Textarea = styled.textarea`
  width: 100%;
  color: var(--dark-gray);
  border: none;
  border-radius: 0.3rem;
  background: var(--background);
  font-size: 1rem;
  resize: none;
`;

const InputFloor = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;

  :nth-child(1) {
    color: var(--dark-gray);
    font-size: 0.8rem;
  }
`;

const Button = styled.div`
  width: 3.5rem;
  height: 2rem;
  padding: 0.6rem 0.2rem;
  font-size: 0.8rem;
  color: #fff;
  background-color: var(--navy);
  border-radius: 0.5rem;
  text-align: center;
`;

type ChatRoom = {
  _id: any;
  product: any;
  buyer: any;
  seller: string;
  numOfMessages: number;
  messages: Array<Message>;
};

type Message = {
  sender: any;
  receiver: any;
  text: string;
  createdAt: number;
};

export default function ChatPage() {
  const scrollRef = useRef<any>();

  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >();
  const [chatRoomList, setChatRoomList] = useState<Array<ChatRoom>>([]);
  const [showingChatRoom, setShowingChatRoom] = useState<any>();
  const [newMessage, setNewMessage] = useState<Message>();
  const [text, setText] = useState("");

  const { userInfo, accessToken } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await chatAPI.getAllChatRooms(accessToken);

      if (response.result === OK) {
        setChatRoomList(response.payload.chatRooms);
        setShowingChatRoom(response.payload.chatRooms[0]);
      }

      if (response.message === DEMAND_LOGIN) {
        alert("로그인이 필요합니다.");
        return;
      }

      if (response.result === FAILED) {
        alert("메시지 내역을 불러오는 데 실패했습니다.");
      }
    };

    fetchData();

    const URL: string = process.env.REACT_APP_SERVER || "";
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${URL}/chat`,
      {
        withCredentials: true,
        extraHeaders: {
          "user-id": userInfo._id,
        },
      }
    );

    setSocket(socket);
  }, []);

  useEffect((): any => {
    socket?.on("message", (data: any) => {
      setNewMessage(data);
    });

    return () => socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [showingChatRoom]);

  useEffect(() => {
    if (!showingChatRoom || !newMessage) return;

    const newMessageList = [...showingChatRoom.messages, { ...newMessage }];

    setShowingChatRoom((prev: any) => {
      return {
        ...prev,
        messages: newMessageList,
      };
    });
  }, [newMessage]);

  const handleChatRoomClick = (index: number) => {
    setShowingChatRoom(chatRoomList[index]);
  };

  const findWhoIsTalkingTo = (myId: string, seller: any, buyer: any) => {
    if (myId === seller._id) {
      return buyer;
    }

    return seller;
  };

  const findBuyer = (myId: string, seller: any, buyer: any) => {
    switch (true) {
      case myId === seller._id:
        return "내가 이 상품의 구매자입니다.";

      case myId === buyer._id:
        return "상대방이 이 상품의 구매자입니다.";

      default:
        return "";
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = async () => {
    const whoIsTalkingTo = findWhoIsTalkingTo(
      userInfo._id,
      showingChatRoom.seller,
      showingChatRoom.buyer
    );
    const body = {
      text,
      roomId: showingChatRoom._id,
      receiver: {
        _id: whoIsTalkingTo._id,
        nickname: whoIsTalkingTo.nickname,
      },
    };
    const response: any = await chatAPI.sendMessage(body, accessToken);

    if (response.result === OK) {
      setShowingChatRoom(response.payload.updatedChatRoom);

      const message = response.payload.newMessage;

      socket?.emit("message", message, (response: any) => {
        console.log(response);
      });

      setText("");
    }

    if (response.message === DEMAND_LOGIN) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (response.result === FAILED) {
      alert("실패.");
    }
  };

  return (
    <Background>
      <Box>
        <BoldText>메시지 목록</BoldText>
        {chatRoomList.length > 0 &&
          chatRoomList.map(({ product, buyer, seller, _id }, index: number) => (
            <ChatRoomCard
              onClick={() => handleChatRoomClick(index)}
              key={_id}
              isSelected={_id === showingChatRoom._id}
            >
              <ProductImage src={product.images[0]} />
              <CardTextInfo>
                <SmallText>{product.category}</SmallText>
                <ProductTitle>{product.title}</ProductTitle>
                <SmallText>
                  {findWhoIsTalkingTo(userInfo._id, seller, buyer).nickname}
                </SmallText>
              </CardTextInfo>
            </ChatRoomCard>
          ))}
        {chatRoomList.length === 0 && <div>메시지가 없습니다.</div>}
      </Box>
      <Box>
        {showingChatRoom && (
          <>
            <LineWrapper>
              <BoldText>
                {
                  findWhoIsTalkingTo(
                    userInfo._id,
                    showingChatRoom.seller,
                    showingChatRoom.buyer
                  ).nickname
                }
              </BoldText>
              <SmallText color="var(--green)">
                {findBuyer(
                  userInfo._id,
                  showingChatRoom.seller,
                  showingChatRoom.buyer
                )}
              </SmallText>
            </LineWrapper>
            <LineWrapper>
              <ProductImage
                src={showingChatRoom.product.images[0]}
                size="3rem"
              />
              <ProductInfo>
                <ProductTitle>{showingChatRoom.product.title}</ProductTitle>
                <Link to={`/products/${showingChatRoom.product._id}`}>
                  <SmallText>판매글로 이동하기</SmallText>
                </Link>
              </ProductInfo>
            </LineWrapper>
            <MessageBox ref={scrollRef}>
              {showingChatRoom.messages.map((message: any) => (
                <MessageWrapper isMe={message.sender._id === userInfo._id}>
                  <SpeechBubble key={message._id}>{message.text}</SpeechBubble>
                  <Time>{formatCreatedAt(message.createdAt)}</Time>
                </MessageWrapper>
              ))}
            </MessageBox>
            <InputBox>
              <Textarea rows={4} onChange={handleTextareaChange} value={text} />
              <InputFloor>
                <div>{`${text.length}/500`}</div>
                <Button onClick={handleButtonClick}>전송</Button>
              </InputFloor>
            </InputBox>
          </>
        )}
      </Box>
    </Background>
  );
}
