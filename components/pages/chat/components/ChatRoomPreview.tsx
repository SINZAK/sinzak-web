import { FormEventHandler } from "react";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import Skeleton from "react-loading-skeleton";

import { BackIcon, MenuIcon } from "@lib/icons";
import { http } from "@lib/services/http";
import { formatNumber } from "@lib/services/intl/format";
import { MarketItemDetail } from "@types";

import { postIdAtom, roomIdAtom } from "../states";

const useMarketItemQuery = () => {
  const id = useAtomValue(postIdAtom);
  return useQuery<MarketItemDetail>(
    ["market-item", id],
    async () => {
      return (await http.post.default(`/products/${id as number}`)).data;
    },
    {
      enabled: typeof id === "number",
    }
  );
};

const useCreateChatRoomMutation = (
  config?: UseMutationOptions<
    {
      roomUuid: string;
    },
    unknown,
    number,
    unknown
  >
) => {
  return useMutation({
    mutationFn: async (postId: number) => {
      const res = await http.post.json<{
        roomUuid: string;
      }>("/chat/rooms/create", {
        postId,
        postType: "product",
      });
      return res.data;
    },
    ...config,
  });
};

export const ChatRoomPreview = () => {
  const { data } = useMarketItemQuery();
  const [postId, setPostId] = useAtom(postIdAtom);
  const setRoomId = useSetAtom(roomIdAtom);

  const { mutate } = useCreateChatRoomMutation({
    onSuccess: (data) => {
      setPostId(RESET);
      setRoomId(data.roomUuid);
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (typeof postId === "number") mutate(postId);
  };

  return (
    <div className="flex h-screen flex-col max-md:container max-md:-mb-24 md:h-full md:px-4">
      <div className="relative flex h-12 flex-shrink-0 items-center justify-between bg-white max-md:sticky max-md:top-0">
        <span className="absolute inset-y-0 left-1/2 grid -translate-x-1/2 place-items-center font-bold">
          {data?.author}
        </span>
        <button onClick={() => setRoomId(RESET)}>
          <BackIcon />
        </button>
        <span>
          <MenuIcon />
        </span>
      </div>
      <div className="flex space-x-4 px-2 py-4">
        <span className="inline-block h-10 w-10 rounded-xl bg-gray-200" />
        <div className="flex flex-col justify-around">
          <p className="flex items-center">
            <span className="space-x-1 text-sm">
              {data ? (
                <>
                  <span className="font-bold">
                    {data.complete ? "판매중" : "판매완료"}
                  </span>
                  <span>{data.title}</span>
                </>
              ) : (
                <Skeleton className="w-28" />
              )}
            </span>
          </p>
          <p className="flex space-x-1">
            <span className="space-x-1 text-sm">
              {data ? (
                <>
                  <span className="text-gray-800">
                    {formatNumber(data.price)}원
                  </span>
                  <span className="text-gray-600">
                    {data.suggest ? "가격제안가능" : "가격제안불가"}
                  </span>
                </>
              ) : (
                <Skeleton className="w-32" />
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="flex min-h-0 flex-[1_1_auto] flex-col space-y-1 overflow-y-scroll max-md:bleed md:-mx-4 md:px-4">
        프리뷰
      </div>
      <div className="flex items-center space-x-3 px-4 py-4 max-md:bleed md:-mx-4">
        <form className="flex-1" onSubmit={onSubmit}>
          <button className="flex h-12 w-full items-center justify-center rounded-full bg-red px-6 font-medium text-white">
            채팅 시작하기
          </button>
        </form>
      </div>
    </div>
  );
};
