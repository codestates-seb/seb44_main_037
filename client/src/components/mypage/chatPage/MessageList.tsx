import * as S from "./ChatPage.style";
import { useUser } from "../../routerTemplate/ForMyPage";
import { ChatRoom } from "./ChatPage";
import findWhoIsTalkingTo from "../../../utils/findWhoIsTalkingTo";

type MessageList = {
  chatRoomList: Array<ChatRoom>;
  showingChatRoom: any;
  handleChatRoomClick: any;
};

export default function MessageList({
  chatRoomList,
  showingChatRoom,
  handleChatRoomClick,
}: MessageList) {
  const { userInfo } = useUser();

  return (
    <S.MessageListBox>
      <S.Title>메시지 목록</S.Title>
      {chatRoomList.length > 0 &&
        chatRoomList.map(({ product, buyer, seller, _id }, index: number) => (
          <S.ChatRoomCard
            onClick={() => handleChatRoomClick(index)}
            key={_id}
            isSelected={_id === showingChatRoom._id}
          >
            <S.ProductImage src={product.images[0]} />
            <S.CardTextInfo>
              <S.SmallText>{product.category}</S.SmallText>
              <S.ProductTitle>{product.title}</S.ProductTitle>
              <S.SmallText>
                {findWhoIsTalkingTo(userInfo._id, seller, buyer).nickname}
              </S.SmallText>
            </S.CardTextInfo>
          </S.ChatRoomCard>
        ))}
      {chatRoomList.length === 0 && <div>메시지가 없습니다.</div>}
    </S.MessageListBox>
  );
}
