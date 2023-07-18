import { useEffect, useState } from "react";
import styled from "styled-components";
import formatLeftTime from "../../utils/formatLeftTime";

const Text = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

type LeftTimeProps = {
  deadline: number;
};

export default function LeftTime({ deadline }: LeftTimeProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const fetchServerTime = () => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_SERVER}/products/time`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = async event => {
      const res = await event.data;
      setCurrentTime(res);
    };

    eventSource.onerror = (e: any) => {
      eventSource.close();
    };

    return eventSource;
  };

  useEffect(() => {
    const eventSource = fetchServerTime();

    return () => eventSource.close();
  }, []);

  return <Text>{formatLeftTime(deadline, "second", currentTime)}</Text>;
}
