import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

export type RoomInfo = {
  image: string;
  latestMessage: string;
  latestMessageTime: string;
  roomUuid: string;
  roomName: string;
  univ: string;
};

export const useChatRoomsQuery = createQuery<RoomInfo[]>({
  primaryKey: "/chat/rooms",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return (await http.post.default(`${primaryKey}`)).data;
  },
});
