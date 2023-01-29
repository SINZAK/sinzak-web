import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useVirtualizer,
  VirtualItem,
  Virtualizer,
} from "@tanstack/react-virtual";
import { useSetAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import ReactTextareaAutosize from "react-textarea-autosize";

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
type MessageQueue = Message[];

let c = 0;

type MessageResponse = {
  content: MessageQueue;
  last: boolean;
  pageable: {
    pageNumber: number;
  };
};

const useChatQuery = (roomId: string) => {
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
    lastPageSize: data?.pages[data?.pages.length - 1]?.length,
    ...query,
  };
};

export const ChatRoomView = ({ roomId }: { roomId: string }) => {
  const client = useClient();
  const { user } = useAuth();
  const setRoomId = useSetAtom(roomIdAtom);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const programmaticScroll = useRef(false);

  const queryClient = useQueryClient();
  const { data } = useRoomInfoQuery(roomId);

  const {
    data: messageList,
    fetchNextPage,
    lastPageSize,
  } = useChatQuery(roomId);

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

  if (!user) return null;

  return (
    <>
      <div
        className={
          "flex h-[100dvh] flex-col max-md:container max-md:absolute max-md:-mb-24 max-md:pb-20 md:h-full md:px-4" +
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
        {messageList?.length ? (
          <VirtualizedChatScroller
            autoScroll={autoScroll}
            setAutoScroll={setAutoScroll}
            programmaticScroll={programmaticScroll}
            scrollRef={scrollRef}
            inputRef={inputRef}
            userId={user.userId}
            messageList={messageList}
            lastPageSize={lastPageSize!}
            fetchNextPage={fetchNextPage}
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

const itemSize = 120;

const VirtualizedChatScroller = ({
  messageList,
  userId,
  scrollRef,
  inputRef,
  autoScroll,
  setAutoScroll,
  programmaticScroll,
  lastPageSize,
  fetchNextPage,
}: {
  messageList: MessageQueue;
  userId: number;
  scrollRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLTextAreaElement>;
  autoScroll: boolean;
  setAutoScroll: Dispatch<SetStateAction<boolean>>;
  programmaticScroll: MutableRefObject<boolean>;
  lastPageSize: number;
  fetchNextPage: ReturnType<typeof useChatQuery>["fetchNextPage"];
}) => {
  const count = messageList.length;
  const reverseIndex = useCallback(
    (index: number) => count - 1 - index,
    [count]
  );

  const virtualizer = useVirtualizer({
    getScrollElement: () => scrollRef.current,
    count,
    estimateSize: () => itemSize,
    getItemKey: useCallback(
      (index: number) => messageList[reverseIndex(index)].messageId,
      [messageList, reverseIndex]
    ),
    overscan: 4,
    scrollMargin: 64,
  });

  useMemo(() => {
    const nextOffset = virtualizer.scrollOffset + lastPageSize * itemSize;
    virtualizer.scrollToOffset(nextOffset, { align: "start" });
    virtualizer.scrollOffset = nextOffset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [virtualizer, virtualizer.options.count]);

  const virtualItems = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(0, virtualItems[0].start - virtualizer.options.scrollMargin),
          Math.max(
            0,
            virtualizer.getTotalSize() -
              virtualItems[virtualItems.length - 1].end
          ),
        ]
      : [0, 0];

  const prevScrollTop = useRef(0);

  const scrollHandler = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
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
    },
    [autoScroll, programmaticScroll, setAutoScroll]
  );

  useEffect(() => {
    if (autoScroll) {
      programmaticScroll.current = true;
      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }
  });

  const { ref: intersectionRef, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="relative min-h-0 flex-[1_1_auto] max-md:bleed md:-mx-4">
      <div
        onScroll={scrollHandler}
        ref={scrollRef}
        className="relative h-full w-full overflow-y-scroll overscroll-contain [overflow-anchor:none]"
      >
        <div ref={intersectionRef} className="absolute top-32 left-0" />
        <div
          className="md:px-4"
          style={{
            paddingTop,
            paddingBottom,
          }}
        >
          <ChatRenderer
            virtualizer={virtualizer}
            virtualItems={virtualItems}
            userId={userId}
            messageList={messageList}
            reverseIndex={reverseIndex}
          />
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

const messageFormatter = (messageList: Message[], userId: number) => {
  const { data: formattedMessageList } = messageList.reverse().reduce(
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
  return formattedMessageList;
};

const ChatRenderer = ({
  virtualizer,
  virtualItems,
  messageList,
  userId,
  reverseIndex,
}: {
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  virtualItems: VirtualItem[];
  messageList: MessageQueue;
  userId: number;
  reverseIndex: (index: number) => number;
}) => {
  const startIndex = reverseIndex(virtualItems[virtualItems.length - 1].index);
  const endIndex = reverseIndex(virtualItems[0].index);
  const formattedMessageList = messageFormatter(
    messageList.slice(startIndex, endIndex + 1),
    userId
  );

  return (
    <>
      {virtualItems.map((virtualRow) => {
        const index = reverseIndex(virtualRow.index);
        const { own, text, timestamp } =
          formattedMessageList[index - startIndex];

        return (
          <div
            key={virtualRow.key}
            data-key={virtualRow.key}
            data-index={virtualRow.index}
            data-reverse-index={index}
            ref={virtualizer.measureElement}
            className="flex w-full flex-col pt-1"
          >
            <ChatText own={own} text={text} timestamp={timestamp} />
          </div>
        );
      })}
    </>
  );
};
