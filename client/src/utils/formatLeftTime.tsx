const formatLeftTime = (deadline: number, type = ""): string => {
  const now = Date.now();
  if (now > deadline) return "마감";

  const leftTime: Date = new Date(deadline - now);

  const day: string | number = leftTime.getDate();
  const hour: string | number = leftTime.getHours();
  const minute: string | number = leftTime.getMinutes();
  const second: string | number = leftTime.getSeconds();

  if (type === "second") {
    return `마감까지 ${day}일 ${hour}시간 ${minute}분 ${second}초`;
  }

  return `마감까지 ${day}일 ${hour}시간 ${minute}분`;
};

export default formatLeftTime;
