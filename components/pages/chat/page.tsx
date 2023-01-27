import { useAtomValue } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import useBreakpoint from "use-breakpoint";

import NoSsr from "@components/atoms/NoSsr";
import { createLayout, MobileNav } from "@components/layout/layout";
import { atomWithHash } from "@lib/utils/atomWithHash";

import { ChatListView } from "./components/ChatListView";
import { ChatRoomPreview } from "./components/ChatRoomPreview";
import { ChatRoomView } from "./components/ChatRoomView";
import { postIdAtom, roomIdAtom } from "./states";

const BREAKPOINTS = { narrow: 0, wide: 960 };

const Chat = () => {
  const roomId = useAtomValue(roomIdAtom);
  const postId = useAtomValue(postIdAtom);
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  if (breakpoint === "narrow")
    return (
      <>
        {postId === RESET && roomId === RESET && (
          <>
            <MobileNav />
            <div className="sticky top-0 z-30 md:hidden">
              <div className="container relative flex h-12 items-center justify-between bg-white">
                <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
                  채팅
                </span>
                <span></span>
                <span></span>
              </div>
            </div>
            <ChatListView />
          </>
        )}
        {postId !== RESET && <ChatRoomPreview />}
        {roomId !== RESET && <ChatRoomView roomId={roomId} />}
      </>
    );
  if (breakpoint === "wide")
    return (
      <div className="container">
        <div className="relative mx-auto mt-7 grid h-[80vh] max-w-5xl grid-cols-2 divide-x ring-1 ring-gray-100">
          <div className="overflow-y-scroll px-4">
            <ChatListView />
          </div>
          <div className="h-full min-h-0">
            {postId !== RESET && <ChatRoomPreview />}
            {roomId !== RESET && <ChatRoomView roomId={roomId} />}
          </div>
        </div>
      </div>
    );
  return null;
};

export default function Page() {
  return (
    <NoSsr>
      <Chat />
    </NoSsr>
  );
}

Page.getLayout = createLayout({
  authenticated: true,
});
