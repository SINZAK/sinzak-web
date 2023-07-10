import { FormEventHandler } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import { useMarketItemQuery } from "@components/pages/item/market/queries/useMarketItemQuery";
import { BackIcon } from "@lib/icons";
import { http } from "@lib/services/http";
import { formatNumber } from "@lib/services/intl/format";

import { postIdAtom, roomIdAtom } from "../states";

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
  const id = useAtomValue(postIdAtom);
  const { data } = useMarketItemQuery({
    variables: {
      id: id === RESET ? undefined : id,
    },
  });
  const [postId, setPostId] = useAtom(postIdAtom);
  const setRoomId = useSetAtom(roomIdAtom);
  const router = useRouter();

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
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
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
      <div className="grid flex-1 place-items-center">
        <div className="text-center text-gray-800">
          <p>채팅 시작하기 버튼을 눌러</p>
          <p>상대방과 대화해 보세요</p>
        </div>
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
