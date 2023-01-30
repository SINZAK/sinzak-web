import { Virtualizer, VirtualItem } from "@tanstack/react-virtual";

import { Message } from "../../types";
import { ChatText } from "../ChatText";

export const ChatRenderer = ({
  virtualizer,
  virtualItems,
  messageList,
  userId,
  reverseIndex,
}: {
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  virtualItems: VirtualItem[];
  messageList: Message[];
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

const messageFormatter = (messageList: Message[], userId: number) => {
  const { data: formattedMessageList } = messageList.reduce<{
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
  }>(
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
    }
  );
  return formattedMessageList;
};
