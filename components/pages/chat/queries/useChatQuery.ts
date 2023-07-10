import { useInfiniteQuery } from "@tanstack/react-query";

import { http } from "@lib/services/http";

import { MessageResponse } from "../types";

export const useChatQuery = (roomId: string) => {
  const { data, ...query } = useInfiniteQuery({
    queryKey: ["prevChat", roomId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await http.get<MessageResponse>(
        `/chat/rooms/${roomId}/message?page=${pageParam}`
      );
      return data;
    },
    select: ({ pages, pageParams }) => {
      return {
        pages: pages.map((page) => page.content),
        pageParams,
      };
    },
    getNextPageParam: (data) =>
      data.last ? undefined : data.pageable.pageNumber + 1,
  });
  return {
    data: data?.pages.flat(),
    ...query,
  };
};
