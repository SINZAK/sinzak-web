import { FormEventHandler, useEffect, useLayoutEffect, useRef } from "react";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import Skeleton from "react-loading-skeleton";

import { BackIcon, MenuIcon, PictureFilledIcon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";
import { formatNumber } from "@lib/services/intl/format";
import useClient from "@lib/services/stomp/client";
import useStomp from "@lib/services/stomp/stomp";

import { ChatText } from "./ChatText";
import { roomIdAtom } from "../states";

const useRoomInfoQuery = (roomId: string) => {
  return useQuery<{
    roomName: string;
    productId: number;
    productName: string;
    price: number;
    thumbnail: string;
    complete: boolean;
    suggest: boolean;
  }>(["useRoomInfoStompQuery", roomId], async () => {
    return (await http.post.default(`/chat/rooms/${roomId as string}`)).data;
  });
};

type Message = {
  messageId: number;
  message: string;
  sendAt: string;
  senderId: number;
  senderName: string | null;
  messageType: null;
};
type MessageQueue = PriorityQueue<Message>;

export const ChatRoomView = ({ roomId }: { roomId: string }) => {
  const client = useClient();
  const { user } = useAuth();
  const setRoomId = useSetAtom(roomIdAtom);
  const scrollRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { data } = useRoomInfoQuery(roomId);

  const { data: messageData } = useQuery<[MessageQueue, number]>({
    queryKey: ["prevChat", roomId],
    queryFn: async () => {
      const { data } = await http.get(`/chat/rooms/${roomId}/message`);
      const messageQueue = PriorityQueue.fromArray<Message>(
        data.content,
        (a, b) => a.messageId - b.messageId
      );
      return [messageQueue, messageQueue.size()];
    },
  });
  const [messageList] = messageData || [];

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, (messageData || []).length === 0]);

  useStomp({
    topic: `/sub/chat/rooms/${roomId}`,
    enabled: !!messageList,
    callback: (message) => {
      queryClient.setQueryData<[MessageQueue, number]>(
        ["prevChat", roomId],
        (prev) => {
          const [messageList] = prev || [];
          if (!messageList) return prev;
          message.sendAt = new Date().toISOString();
          message.messageId = Date.now();
          if (message.senderId === user?.userId)
            scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
          console.log(message);
          messageList.enqueue(message);
          return [messageList, messageList.size()];
        }
      );
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!client) return;
    const text = (e.target as any)[0].value;
    if (!text) return;
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
    (e.target as any).reset();
  };

  if (!user) return null;

  return (
    <div className="flex h-screen flex-col max-md:container max-md:-mb-24 md:h-full md:px-4">
      <div className="relative flex h-12 flex-shrink-0 items-center justify-between bg-white max-md:sticky max-md:top-0">
        <span className="absolute inset-y-0 left-1/2 grid -translate-x-1/2 place-items-center font-bold">
          {data?.roomName}
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
      </div>
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-[1_1_auto] flex-col space-y-1 overflow-y-scroll max-md:bleed md:-mx-4 md:px-4"
      >
        {messageList && (
          <ChatRenderer userId={user.userId} messageList={messageList} />
        )}
      </div>
      <div className="flex items-center space-x-3 px-4 py-4 max-md:bleed md:-mx-4">
        <span>
          <PictureFilledIcon className="h-10 w-10 fill-gray-600" />
        </span>
        <form className="flex-1" onSubmit={onSubmit}>
          <input
            placeholder="메세지 보내기"
            className="flex h-12 w-full items-center rounded-full bg-gray-100 px-6 font-medium"
          />
        </form>
      </div>
    </div>
  );
};

const ChatRenderer = ({
  messageList,
  userId,
}: {
  messageList: MessageQueue;
  userId: number;
}) => {
  const { data: formattedMessageList } = messageList
    .toArray()
    .reverse()
    .reduce(
      (acc, cur) => {
        const time =
          Math.floor(new Date(cur.sendAt).getTime() / (60 * 1000)) * 60 * 1000;
        const own = userId === cur.senderId;
        if (!(acc.meta.prevOwn === own) || time !== acc.meta.lastTimestamp) {
          acc.meta.lastTimestamp = time;
          acc.data.push({
            text: cur.message,
            own,
            timestamp: new Date(time),
            key: cur.messageId,
          });
        } else {
          acc.data.push({
            text: cur.message,
            own,
            key: cur.messageId,
          });
        }
        acc.meta.prevOwn = own;
        return acc;
      },
      {
        meta: { lastTimestamp: 0, prevOwn: null },
        data: [],
      } as {
        meta: {
          lastTimestamp: number;
          prevOwn: boolean | null;
        };
        data: {
          key: number;
          text: string;
          own: boolean;
          timestamp?: Date;
        }[];
      }
    );
  formattedMessageList.reverse();

  return (
    <>
      {formattedMessageList.map(({ own, text, key, timestamp }, i) => (
        <ChatText
          own={own}
          text={text}
          key={key || "i_" + i}
          timestamp={timestamp}
        />
      ))}
    </>
  );
};
