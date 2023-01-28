import {
  Dispatch,
  FormEventHandler,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useVirtualizer,
  VirtualItem,
  Virtualizer,
} from "@tanstack/react-virtual";
import { useSetAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import Skeleton from "react-loading-skeleton";

import { Button } from "@components/atoms/Button";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const programmaticScroll = useRef(false);

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
          if (message.senderId === user?.userId) setAutoScroll(true);
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
    <>
      <div
        className={
          "absolute flex h-[100dvh] flex-col max-md:container max-md:-mb-24 max-md:pb-20 md:px-4" +
          " " +
          "h-full"
        }
      >
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
        {messageList?.size() ? (
          <VirtualizedChatScroller
            autoScroll={autoScroll}
            setAutoScroll={setAutoScroll}
            programmaticScroll={programmaticScroll}
            scrollRef={scrollRef}
            inputRef={inputRef}
            userId={user.userId}
            messageList={messageList}
          />
        ) : (
          <div className="min-h-0 flex-[1_1_auto] max-md:bleed md:-mx-4 md:px-4" />
        )}
        <div
          className="flex items-center space-x-3 px-4 py-4
        max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:bg-white
        md:-mx-4"
        >
          <span>
            <PictureFilledIcon className="h-10 w-10 fill-gray-600" />
          </span>
          <form className="flex-1" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              placeholder="메세지 보내기"
              className="flex h-12 w-full items-center rounded-full bg-gray-100 px-6 font-medium"
            />
          </form>
        </div>
      </div>
    </>
  );
};

const VirtualizedChatScroller = ({
  messageList,
  userId,
  scrollRef,
  inputRef,
  autoScroll,
  setAutoScroll,
  programmaticScroll,
}: {
  messageList: MessageQueue;
  userId: number;
  scrollRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  autoScroll: boolean;
  setAutoScroll: Dispatch<SetStateAction<boolean>>;
  programmaticScroll: MutableRefObject<boolean>;
}) => {
  const prevScrollTop = useRef(0);
  const virtualizer = useVirtualizer({
    count: messageList.size(),
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 44,
    overscan: 4,
  });

  const items = virtualizer.getVirtualItems();
  const height = virtualizer.getTotalSize();

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const direction = scrollTop <= prevScrollTop.current ? "up" : "down";
    if (!programmaticScroll.current) {
      if (
        scrollTop + event.currentTarget.offsetHeight >=
        event.currentTarget.scrollHeight - 4
      ) {
        setAutoScroll(true);
      } else if (autoScroll) {
        if (direction === "up") setAutoScroll(false);
      }
    }
    programmaticScroll.current = false;
    prevScrollTop.current = scrollTop;
  };

  useLayoutEffect(() => {
    if (autoScroll) {
      programmaticScroll.current = true;
      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }
  });

  return (
    <div className="relative min-h-0 flex-[1_1_auto] max-md:bleed md:-mx-4 md:px-4">
      <div
        onScroll={scrollHandler}
        ref={scrollRef}
        className="h-full overflow-y-scroll overscroll-contain"
      >
        <div
          className="relative"
          style={{
            height: `${height}px`,
          }}
        >
          <div
            className="absolute inset-x-0 top-0 flex w-full flex-col space-y-1"
            style={{
              transform: `translateY(${items[0].start}px)`,
            }}
          >
            <ChatRenderer
              virtualizer={virtualizer}
              virtualItems={items}
              userId={userId}
              messageList={messageList}
            />
          </div>
        </div>
      </div>
      {!autoScroll && (
        <Button
          onClick={() => {
            inputRef.current?.focus();
            setAutoScroll(true);
          }}
          size="small"
          intent="primary"
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          맨 아래로
        </Button>
      )}
    </div>
  );
};

const ChatRenderer = ({
  virtualizer,
  virtualItems,
  messageList,
  userId,
}: {
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  virtualItems: VirtualItem[];
  messageList: MessageQueue;
  userId: number;
}) => {
  const startIndex = virtualItems[0].index;
  const endIndex = virtualItems[virtualItems.length - 1].index;
  const messageListSlice = messageList
    .toArray()
    .slice(startIndex, endIndex + 1);
  const { data: formattedMessageList } = messageListSlice.reverse().reduce(
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
      {virtualItems.map((virtualRow) => {
        const { own, text, timestamp } =
          formattedMessageList[virtualRow.index - startIndex];
        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            className="flex w-full flex-col"
          >
            <ChatText own={own} text={text} timestamp={timestamp} />
          </div>
        );
      })}
    </>
  );
};
