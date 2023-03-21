import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

type Response = {
  roomName: string;
  productId: number;
  productName: string;
  price: number;
  thumbnail: string;
  complete: boolean;
  suggest: boolean;
};

type Variables = { roomId: string };

export const useRoomInfoQuery = createQuery<Response, Variables>({
  primaryKey: "/chat/rooms/",
  queryFn: async ({ queryKey: [primaryKey, { roomId }] }) => {
    return (await http.post.default(`${primaryKey}${roomId}`)).data;
  },
});
