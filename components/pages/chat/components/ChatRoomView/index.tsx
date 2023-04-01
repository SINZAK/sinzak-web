import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

import { Button } from "@components/atoms/Button";
import { Menu } from "@components/atoms/Menu";
import useBreakpoint from "@lib/hooks/useBreakpoint";
import { useImage, useSelectImage } from "@lib/hooks/useSelectImage";
import { BackIcon, MenuIcon, PictureFilledIcon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";
import { formatNumber } from "@lib/services/intl/format";
import useClient from "@lib/services/stomp/client";
import useStomp from "@lib/services/stomp/stomp";

import { VirtualizedScroller } from "./VirtualizedScroller";
import { useChatQuery } from "../../queries/chat";
import { useRoomInfoQuery } from "../../queries/roomInfo";
import { roomIdAtom } from "../../states";
import { MessageResponse } from "../../types";

// const test = Array.from({ length: 30 }, (_, i) => ({
//   messageId: i,
//   message: "asdf ".repeat(Math.ceil(Math.random() * 10)),
//   sendAt: new Date().toISOString(),
//   senderId: Math.round(Math.random()) ? 357 : 1,
//   senderName: "test",
//   messageType: null,
// }));

export const ChatRoomView = ({ roomId }: { roomId: string }) => {
  const client = useClient();
  const { user } = useAuth();
  const setRoomId = useSetAtom(roomIdAtom);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const programmaticScroll = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { breakpoint } = useBreakpoint();
  const ref = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { data } = useRoomInfoQuery({
    variables: {
      roomId,
    },
  });

  useLayoutEffect(() => {
    if (breakpoint !== "narrow" || !ref.current) return;
    const listener = () => {
      if (ref.current) ref.current.style.height = window.innerHeight + "px";
    };
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [breakpoint]);

  useLayoutEffect(() => {
    setAutoScroll(true);
  }, [roomId]);

  const { data: messageList, fetchNextPage } = useChatQuery(roomId);

  const callback = useCallback(
    (message: any) => {
      queryClient.setQueryData<InfiniteData<MessageResponse>>(
        ["prevChat", roomId],
        (data) => {
          if (!data) return data;
          const { pages, pageParams } = data;
          const [firstPage, ...restPages] = pages;
          const { content, ...firstPageData } = firstPage;
          message.sendAt = new Date().toISOString();
          message.messageId = Date.now();
          if (message.senderId === user?.userId) setAutoScroll(true);
          return {
            pages: [
              {
                content: [message, ...content],
                ...firstPageData,
              },
              ...restPages,
            ],
            pageParams,
          };
        }
      );
    },
    [queryClient, roomId, user?.userId]
  );

  useStomp({
    topic: `/sub/chat/rooms/${roomId}`,
    enabled: !!messageList,
    callback,
  });

  const onSubmit = (text: string) => {
    if (!client) return;
    const body = {
      roomId,
      message: text,
      sender: "test",
      senderId: user?.userId,
      messageType: "TEXT",
    };
    console.log(body);
    client.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify(body),
    });
  };

  const onLeave = () => {
    if (!client) return;
    const body = {
      roomId,
      message: "테스트님이 나가셨습니다.",
      sender: "test",
      senderId: user?.userId,
      messageType: "LEAVE",
    };
    console.log(body);
    client.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify(body),
    });
  };

  const { selectFile } = useImage(async (image) => {
    if (!client) return;

    const formData = new FormData();
    formData.append("multipartFile", image);
    const res = await http.post
      .multipart<{ url: string }[]>(`/chat/rooms/${roomId}/image`, formData)
      .catch((_) => {
        toast.error("이미지 업로드에 실패했습니다.");
      });
    if (!res) return;
    const imageUrl = res.data[0].url;

    const body = {
      roomId,
      message: imageUrl,
      sender: "test",
      senderId: user?.userId,
      messageType: "IMAGE",
    };
    console.log(body);
    client.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify(body),
    });
  });

  if (!user) return null;

  return (
    <>
      <div
        ref={ref}
        className="flex flex-col max-md:container max-md:absolute max-md:-mb-24 md:h-full md:px-4"
      >
        <div className="relative z-10 flex h-12 shrink-0 items-center justify-between bg-white max-md:sticky max-md:top-0">
          <span className="absolute inset-y-0 left-1/2 grid -translate-x-1/2 place-items-center font-bold">
            {data?.roomName}
          </span>
          <button onClick={() => setRoomId(RESET)}>
            <BackIcon />
          </button>
          <button>
            <Menu button={<MenuIcon />}>
              <Menu.Item onClick={onLeave} className="text-red">
                나가기
              </Menu.Item>
            </Menu>
          </button>
        </div>
        <Link
          href={
            data
              ? `/${data.postType === "PRODUCT" ? "market" : "work"}/${
                  data.postId
                }`
              : "#"
          }
          className="flex shrink-0 space-x-4 px-2 py-4"
        >
          <img
            alt="썸네일"
            src={data?.thumbnail}
            className="inline-block h-10 w-10 rounded-xl bg-gray-200"
          />
          <div className="flex flex-col justify-around">
            <p className="flex items-center">
              <span className="space-x-1 text-sm">
                {data ? (
                  <>
                    <span className="font-bold">
                      {data.complete ? "판매중" : "판매완료"}
                    </span>
                    <span>{data.productName}</span>
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
        </Link>
        <div className="relative min-h-0 flex-1 max-md:bleed md:-mx-4">
          {!!messageList?.length && (
            <VirtualizedScroller
              autoScroll={autoScroll}
              setAutoScroll={setAutoScroll}
              programmaticScroll={programmaticScroll}
              scrollRef={scrollRef}
              userId={user.userId}
              messageList={messageList}
              fetchNextPage={fetchNextPage}
            />
          )}
          {!autoScroll && (
            <Button
              ref={buttonRef}
              onClick={() => {
                setAutoScroll(true);
              }}
              size="small"
              intent="primary"
              className="absolute bottom-2 left-1/2 -translate-x-1/2"
            >
              맨 아래로
            </Button>
          )}
          <button onClick={(e) => e} />
        </div>
        <div className="-mx-4 flex items-center bg-white px-4 py-4">
          <input
            id="input-file"
            type="file"
            multiple
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={selectFile}
          />
          <label htmlFor="input-file" className="mr-3 cursor-pointer">
            <PictureFilledIcon className="h-10 w-10 fill-gray-600" />
          </label>
          <span className="flex-1 rounded-[1.5rem] bg-gray-100 py-3 ring-gray-200 focus-within:ring-1">
            <ReactTextareaAutosize
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (e.currentTarget.value.trim() === "") return;
                  onSubmit(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
              onBlur={(e) => {
                if (e.relatedTarget === buttonRef.current)
                  e.currentTarget.focus();
              }}
              maxRows={3}
              ref={inputRef}
              placeholder="메세지 보내기"
              className="flex w-full resize-none items-center bg-transparent px-6 font-medium scrollbar-hide focus:ring-0"
            />
          </span>
        </div>
      </div>
    </>
  );
};
