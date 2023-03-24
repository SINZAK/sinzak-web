import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

type Response = {
  roomName: string;
  postId: number;
  productName: string;
  price: number;
  thumbnail: string;
  complete: boolean;
  suggest: boolean;
  postType: "PRODUCT" | "WORK";
};

type Variables = { roomId: string };

export const useRoomInfoQuery = createQuery<Response, Variables>({
  primaryKey: "/chat/rooms/",
  queryFn: async ({ queryKey: [primaryKey, { roomId }] }) => {
    return (await http.post.default(`${primaryKey}${roomId}`)).data;
  },
});
