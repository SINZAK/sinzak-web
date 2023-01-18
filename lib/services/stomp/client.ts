import { Client } from "@stomp/stompjs";
import React, { createContext } from "react";

let stompClient: Client;

const useClient = () => {
  const [client, setClient] = React.useState(stompClient);

  React.useEffect(() => {
    if (!stompClient) {
      stompClient = new Client({
        brokerURL: "ws://localhost:15674/ws",
        connectHeaders: {
          login: "user",
          passcode: "password",
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      stompClient.activate();
    }
    if (!client) {
      setClient(stompClient);
    }
  }, [client]);

  return client;
};

export default useClient;
