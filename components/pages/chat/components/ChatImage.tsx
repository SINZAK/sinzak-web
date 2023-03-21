import React from "react";
import { twMerge } from "tailwind-merge";

export const ChatImage = React.memo(
  ({
    imageSrc,
    own,
    timestamp,
  }: {
    imageSrc: string;
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
        <img className="rounded-xl" alt={imageSrc} src={imageSrc} />
      </div>
    );
  }
);
ChatImage.displayName = "ChatText";
