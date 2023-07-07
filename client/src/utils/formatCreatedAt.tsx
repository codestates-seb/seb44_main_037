const formatCreatedAt = (createdAt: number): string => {
  const now: number = Date.now();
  const timesAgo: Date = new Date(now - createdAt);
  const date = new Date(createdAt);

  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();

  let hour: string | number = timesAgo.getHours();
  const minute: string | number = timesAgo.getMinutes();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;

  if (Number(timesAgo) < 3600000) {
    return `${minute}분 전`;
  }

  if (Number(timesAgo) < 86400000) {
    return `${hour}시간 전`;
  }

  return `${date.getFullYear()}년 ${month}월 ${day}일`;
};

export default formatCreatedAt;
