import { KR_TIME_DIFF } from "../constants/time";

const formatCreatedAt = (createdAt: number): string => {
  const now = Date.now();
  const date = new Date(createdAt);
  const timesAgo = new Date(now - createdAt - KR_TIME_DIFF);

  const month: string | number = date.getMonth() + 1;
  const day: string | number = date.getDate();

  const hour: string | number = timesAgo.getHours();
  const minute: string | number = timesAgo.getMinutes();

  if (Number(timesAgo) < 3600000) {
    return `${minute}분 전`;
  }

  if (Number(timesAgo) < 86400000) {
    return `${hour}시간 전`;
  }

  return `${date.getFullYear()}년 ${month}월 ${day}일`;
};

export default formatCreatedAt;
