import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai/react";

import { http } from "@lib/services/http";

import { roomIdAtom } from "../states";


export const ChatListView = () => {
  const setRoomId = useSetAtom(roomIdAtom);
  const { data } = useQuery<
    {
      roomUuid: string;
      roomName: string;
      image: null;
      univ: string;
    }[]
  >({
    queryKey: ["chat-rooms"],
    queryFn: async () => {
      return (await http.post.default("/chat/rooms")).data;
    },
  });

  return (
    <div className="flex flex-col max-md:container">
      {data?.map((room, i) => (
        <button
          className="flex items-center justify-between py-4 max-md:bleed md:-mx-4 md:px-4"
          key={i}
          onClick={() => setRoomId(room.roomUuid)}
        >
          <div className="flex space-x-4">
            <span className="inline-block h-12 w-12 rounded-xl bg-gray-200" />
            <div className="flex flex-col justify-around">
              <p className="flex items-center font-medium">
                <span>{room.roomName}</span>
                <span className="ml-2 space-x-1 text-sm text-gray-600">
                  <span>{room.univ}</span>
                  <span>·</span>
                  <span>1시간 전</span>
                </span>
              </p>
              <p className="flex space-x-1">
                <span>마지막 채팅</span>
              </p>
            </div>
          </div>
          <div className="mr-2">
            <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
              1
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
