import { Client } from "@stomp/stompjs";
import { atom, useAtomValue } from "jotai";
import SockJS from "sockjs-client";

import { API } from "@lib/utils/consts";

const useClient = () => useAtomValue(clientAtom);
export default useClient;

export const clientAtom = atom<null | Client>(null);
clientAtom.onMount = (setAtom) => {
  console.log("mounted");
  const stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(API.WS_ENDPOINT + API.BASE_STOMP_CHAT_PATH_PREFIX),
    debug: function (str) {
      console.log(str);
    },
    onConnect: () => {
      console.log("connected");
      setAtom(stompClient);
    },
    onDisconnect: () => {
      console.log("disconnected");
      setAtom(null);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  stompClient.activate();
};

// anAtom.onMount = (setAtom) => {
//   console.log('atom is mounted in provider')
//   setAtom(c => c + 1) // increment count on mount
//   return () => { ... } // return optional onUnmount function
// }

// const useClient = () => {
//   const [client, setClient] = useState<Client | null>(null);

//   useEffect(() => {
//     if (!stompClient) {
//       stompClient = new Client({
//         webSocketFactory: () =>
//           new SockJS("http://localhost:8080/api/stomp/chat"),
//         debug: function (str) {
//           console.log(str);
//         },
//         onConnect: () => {
//           console.log("connected");
//           setClient(stompClient);
//         },
//         onDisconnect: () => {
//           console.log("disconnected");
//           setClient(null);
//         },
//         reconnectDelay: 5000,
//         heartbeatIncoming: 4000,
//         heartbeatOutgoing: 4000,
//       });
//       stompClient.activate();
//     }
//   }, [client]);

//   return client;
// };

// export default useClient;
