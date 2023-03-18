import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";

import { http } from "@lib/services/http";
import { formatRelativeTime } from "@lib/services/intl/format";

import { roomIdAtom } from "../states";

export const ChatListView = () => {
  const [roomId, setRoomId] = useAtom(roomIdAtom);
  const { data } = useQuery<
    {
      image: string;
      latestMessage: string;
      latestMessageTime: string;
      roomUuid: string;
      roomName: string;
      univ: string;
    }[]
  >({
    queryKey: ["chat-rooms"],
    queryFn: async () => {
      return (await http.post.default("/chat/rooms")).data;
    },
  });

  return (
    <div className="flex flex-col max-md:container max-md:flex-1 md:h-full">
      {data && data.length > 0 ? (
        data?.map((room, i) => (
          <div
            className={twMerge(
              "flex items-center justify-between py-4 max-md:bleed md:-mx-4 md:px-4",
              room.roomUuid === roomId && "bg-gray-100"
            )}
            key={i}
            onClick={() => setRoomId(room.roomUuid)}
          >
            <div className="flex space-x-4">
              {room.image ? (
                <img
                  alt="사진"
                  src={room.image}
                  className="inline-block h-12 w-12 rounded-xl bg-gray-200"
                />
              ) : (
                <span className="inline-block h-12 w-12 rounded-xl bg-gray-200" />
              )}
              <div className="flex flex-col justify-around">
                <p className="flex items-center font-medium">
                  <span>{room.roomName}</span>
                  <span className="ml-2 space-x-1 text-sm text-gray-600">
                    {room.univ && (
                      <>
                        <span>{room.univ}</span>
                        <span>·</span>
                      </>
                    )}
                    <span>{formatRelativeTime(room.latestMessageTime)}</span>
                  </span>
                </p>
                <p className="flex space-x-1">
                  <span>{room.latestMessage}</span>
                </p>
              </div>
            </div>
            <div className="mr-2">
              <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                1
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="grid flex-1 place-items-center text-gray-600">
          <p className="text-center">아직 시작한 채팅이 없어요</p>
        </div>
      )}
    </div>
  );
};
