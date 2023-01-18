import { StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";

import useClient from "./client";

const useStomp = (topic: string) => {
  const [message, setMessage] = useState({});
  const client = useClient();

  const subscribe = useCallback(() => {
    return client.subscribe(topic, (msg) => {
      const change = JSON.parse(msg.body);
      console.log("asdf");
      setMessage(change);
    });
  }, [client, topic]);

  const unSubscribe = useCallback((subscription: StompSubscription) => {
    subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscripton = subscribe();
    return () => {
      unSubscribe(subscripton);
    };
  }, [subscribe, unSubscribe]);

  return message;
};

export default useStomp;
