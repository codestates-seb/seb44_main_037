const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const timestamp = date.getTime();
  const now: number = Date.now();
  const timesAgo: Date = new Date(now - timestamp);

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
