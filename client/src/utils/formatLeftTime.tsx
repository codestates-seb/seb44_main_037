import { KR_TIME_DIFF } from "../constants/time";

const formatLeftTime = (
  deadline: number,
  type = "",
  currentTime = Date.now()
): string => {
  const now = currentTime || Date.now();

  if (now > deadline) return "마감";

  const leftTime: Date = new Date(deadline - now - KR_TIME_DIFF);

  const day: string | number = leftTime.getDate() - 1;
  const hour: string | number = leftTime.getHours();
  const minute: string | number = leftTime.getMinutes();
  const second: string | number = leftTime.getSeconds();

  if (type === "second") {
    return `마감까지 ${day}일 ${hour}시간 ${minute}분 ${second}초`;
  }

  return `마감까지 ${day}일 ${hour}시간 ${minute}분`;
};

export default formatLeftTime;
