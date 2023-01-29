import React from "react";
import { twMerge } from "tailwind-merge";

export const ChatText = React.memo(
  ({
    text,
    own,
    timestamp,
  }: {
    text: string;
    own?: boolean;
    timestamp?: Date;
  }) => {
    return (
      <div
        className={twMerge(
          "relative max-w-[75%]",
          own ? "self-end" : "self-start"
        )}
      >
        <div
          className={twMerge(
            "absolute bottom-0 whitespace-nowrap pb-0.5 text-xs text-gray-600",
            own
              ? "left-0 -translate-x-full pr-1.5"
              : "right-0 translate-x-full pl-1.5"
          )}
        >
          {timestamp?.toLocaleTimeString().slice(0, -3)}
        </div>
        <div
          className={twMerge(
            "whitespace-pre-wrap rounded-[1.5rem] px-4 py-2",
            own ? "bg-red text-white" : "bg-gray-100 text-black"
          )}
        >
          {text}
        </div>
      </div>
    );
  }
);
ChatText.displayName = "ChatText";
