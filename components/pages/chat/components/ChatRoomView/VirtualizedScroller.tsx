import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { Virtualizer, useVirtualizer } from "@tanstack/react-virtual";
import { useInView } from "react-intersection-observer";

import { ChatRenderer } from "./ChatRenderer";
import { useChatQuery } from "../../queries/chat";
import { Message } from "../../types";

const itemSize = 120;

export const VirtualizedScroller = ({
  messageList,
  userId,
  scrollRef,
  autoScroll,
  setAutoScroll,
  programmaticScroll,
  fetchNextPage,
}: {
  messageList: Message[];
  userId: number;
  scrollRef: RefObject<HTMLDivElement>;
  autoScroll: boolean;
  setAutoScroll: Dispatch<SetStateAction<boolean>>;
  programmaticScroll: MutableRefObject<boolean>;
  fetchNextPage: ReturnType<typeof useChatQuery>["fetchNextPage"];
}) => {
  const messageListCount = messageList.length;
  const reverseIndex = useCallback(
    (index: number) => messageListCount - 1 - index,
    [messageListCount]
  );

  const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element> | null>(
    null
  );

  if (
    virtualizerRef.current &&
    messageListCount !== virtualizerRef.current.options.count
  ) {
    const delta = messageListCount - virtualizerRef.current.options.count;
    const nextOffset = virtualizerRef.current.scrollOffset + delta * itemSize;
    virtualizerRef.current.scrollOffset = nextOffset;
    virtualizerRef.current.scrollToOffset(nextOffset, { align: "start" });
  }

  const virtualizer = useVirtualizer({
    getScrollElement: () => scrollRef.current,
    count: messageListCount,
    estimateSize: () => itemSize,
    getItemKey: useCallback(
      (index: number) => messageList[reverseIndex(index)].messageId,
      [messageList, reverseIndex]
    ),
    overscan: 4,
    scrollMargin: 64,
  });

  useLayoutEffect(() => {
    virtualizerRef.current = virtualizer;
  });

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

  useLayoutEffect(() => {
    if (autoScroll) {
      programmaticScroll.current = true;
      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }
  });

  const { ref: intersectionRef, inView } = useInView();

  useEffect(() => {
    if (inView && messageListCount > 0) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
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
  );
};
