import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import * as S from "./ChatPage.style";
import type { ServerToClientEvents, ClientToServerEvents } from "../../../App";
import ChatAPI from "../../../api/chat";
import { useUser } from "../../routerTemplate/ForMyPage";
import {
  DEMAND_LOGIN,
  FAILED,
  FAILED_GET_MESSAGES,
  FAILED_SEND_MESSAGE,
  OK,
} from "../../../constants/messages";
import formatCreatedAt from "../../../utils/formatCreatedAt";
import { showToast } from "../../common/Toast";
import { ERROR } from "../../../constants/toast";
import MessageList from "./MessageList";
import findBuyer from "../../../utils/findBuyer";
import findWhoIsTalkingTo from "../../../utils/findWhoIsTalkingTo";
import MessageInput from "./MessageInput";

const chatAPI = new ChatAPI();

export type ChatRoom = {
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

  const { user, accessToken } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await chatAPI.getAllChatRooms(accessToken);

      if (response.result === OK) {
        setChatRoomList(response.payload.chatRooms);
        setShowingChatRoom(response.payload.chatRooms[0]);
      }

      if (response.message === DEMAND_LOGIN) {
        showToast({ type: ERROR, message: DEMAND_LOGIN });

        return;
      }

      if (response.result === FAILED) {
        showToast({
          type: ERROR,
          message: FAILED_GET_MESSAGES,
        });
      }
    };

    fetchData();

    const URL: string = process.env.REACT_APP_SERVER || "";
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${URL}/chat`,
      {
        withCredentials: true,
        extraHeaders: {
          "user-id": user._id,
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

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = async () => {
    const whoIsTalkingTo = findWhoIsTalkingTo(
      user._id,
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
      showToast({ type: ERROR, message: DEMAND_LOGIN });
      return;
    }

    if (response.result === FAILED) {
      showToast({ type: ERROR, message: FAILED_SEND_MESSAGE });
    }
  };

  return (
    <S.Background>
      <MessageList
        chatRoomList={chatRoomList}
        showingChatRoom={showingChatRoom}
        handleChatRoomClick={handleChatRoomClick}
      />
      <S.ChatBox>
        {showingChatRoom && (
          <>
            <S.LineWrapper>
              <S.Title>
                {
                  findWhoIsTalkingTo(
                    user._id,
                    showingChatRoom.seller,
                    showingChatRoom.buyer
                  ).nickname
                }
              </S.Title>
              <S.SmallText color="var(--green)">
                {findBuyer(
                  user._id,
                  showingChatRoom.seller._id,
                  showingChatRoom.buyer._id
                )}
              </S.SmallText>
            </S.LineWrapper>
            <S.LineWrapper>
              <S.ProductImage
                src={showingChatRoom.product.images[0]}
                size="3rem"
              />
              <S.ProductInfo>
                <S.ProductTitle>{showingChatRoom.product.title}</S.ProductTitle>
                <Link to={`/products/${showingChatRoom.product._id}`}>
                  <S.SmallText>판매글로 이동하기</S.SmallText>
                </Link>
              </S.ProductInfo>
            </S.LineWrapper>
            <S.MessageBox ref={scrollRef}>
              {showingChatRoom.messages.map((message: any) => (
                <S.MessageWrapper isMe={message.sender._id === user._id}>
                  <S.SpeechBubble key={message._id}>
                    {message.text}
                  </S.SpeechBubble>
                  <S.Time>{formatCreatedAt(message.createdAt)}</S.Time>
                </S.MessageWrapper>
              ))}
            </S.MessageBox>
            <MessageInput
              handleTextareaChange={handleTextareaChange}
              text={text}
              handleButtonClick={handleButtonClick}
            />
          </>
        )}
      </S.ChatBox>
    </S.Background>
  );
}
