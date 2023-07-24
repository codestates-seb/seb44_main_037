import * as S from "./MessageInput.style";

type MessageInputProps = {
  handleTextareaChange: any;
  text: any;
  handleButtonClick: any;
};

export default function MessageInput({
  handleTextareaChange,
  text,
  handleButtonClick,
}: MessageInputProps) {
  return (
    <S.InputBox>
      <S.Textarea rows={4} onChange={handleTextareaChange} value={text} />
      <S.InputFloor>
        <div>{`${text.length}/500`}</div>
        <S.Button onClick={handleButtonClick}>전송</S.Button>
      </S.InputFloor>
    </S.InputBox>
  );
}
