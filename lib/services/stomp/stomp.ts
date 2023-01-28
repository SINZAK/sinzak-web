import { useCallback, useEffect, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";

import useClient from "./client";

const useStomp = ({
  topic,
  enabled,
  callback,
}: {
  topic: string;
  enabled: boolean;
  callback: (message: any) => void;
}) => {
  const client = useClient();

  const subscribe = useCallback(
    (client: Client, callback: (message: any) => void) => {
      return client.subscribe(topic, (msg) => {
        const change = JSON.parse(msg.body);
        console.log(change);
        callback(change);
      });
    },
    [topic]
  );

  const unSubscribe = useCallback((subscription: StompSubscription) => {
    subscription.unsubscribe();
  }, []);

  return useEffect(() => {
    if (!client || !callback || !enabled) return;
    const subscripton = subscribe(client, callback);
    return () => {
      unSubscribe(subscripton);
    };
  }, [callback, client, enabled, subscribe, unSubscribe]);
};

export default useStomp;
