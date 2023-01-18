import { cx } from "class-variance-authority";
import useBreakpoint from "use-breakpoint";

import { BackIcon, MenuIcon, PictureFilledIcon } from "@lib/icons";

import NoSsr from "@components/atoms/NoSsr";
import { createLayout } from "@components/layout/layout";

const BREAKPOINTS = { narrow: 0, wide: 960 };

const ChatListView = () => {
  return (
    <div className="flex flex-col max-md:container">
      {Array.from({ length: 20 }).map((_, i) => (
        <button
          className="flex items-center justify-between py-4 max-md:bleed md:-mx-4 md:px-4"
          key={i}
        >
          <div className="flex space-x-4">
            <span className="inline-block h-12 w-12 rounded-xl bg-gray-200" />
            <div className="flex flex-col justify-around">
              <p className="flex items-center font-medium">
                <span>홍길동</span>
                <span className="ml-2 space-x-1 text-sm text-gray-600">
                  <span>홍익대</span>
                  <span>·</span>
                  <span>1시간 전</span>
                </span>
              </p>
              <p className="flex space-x-1">
                <span>동해물과 백두산이 마르고 닳도록</span>
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

const ChatText = ({ text, own }: any) => {
  return (
    <div
      className={cx(
        "rounded-full px-4 py-2",
        own ? "self-end bg-red text-white" : "self-start bg-gray-100 text-black"
      )}
    >
      동해물과 백두산이 마르고 닳도록
    </div>
  );
};

const ChatRoomView = () => {
  return (
    <div className="flex h-full flex-col max-md:container max-md:bleed md:px-4">
      <div className="relative flex h-12 items-center justify-between bg-white">
        <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
          홍길동
        </span>
        <span>
          <BackIcon />
        </span>
        <span>
          <MenuIcon />
        </span>
      </div>
      <div className="flex space-x-4 px-2 py-4">
        <span className="inline-block h-10 w-10 rounded-xl bg-gray-200" />
        <div className="flex flex-col justify-around">
          <p className="flex items-center">
            <span className="space-x-1 text-sm">
              <span className="font-bold">거래중</span>
              <span>환상</span>
            </span>
          </p>
          <p className="flex space-x-1">
            <span className="space-x-1 text-sm">
              <span className="text-gray-800">43,000원</span>
              <span className="text-gray-600">가격제안불가</span>
            </span>
          </p>
        </div>
      </div>
      <div className="flex min-h-0 flex-[1_1_auto] flex-col space-y-1 overflow-y-scroll max-md:bleed md:-mx-4 md:px-4">
        <ChatText own />
        <ChatText />
        <ChatText />
        <ChatText own />
        <ChatText own />
        <ChatText own />
        <ChatText />
        <ChatText own />
        <ChatText />
        <ChatText />
        <ChatText own />
        <ChatText own />
        <ChatText own />
        <ChatText /> <ChatText own />
        <ChatText />
        <ChatText />
        <ChatText own />
        <ChatText own />
        <ChatText own />
        <ChatText /> <ChatText own />
        <ChatText />
        <ChatText />
        <ChatText own />
        <ChatText own />
        <ChatText own />
        <ChatText />
      </div>
      <div className="flex items-center space-x-3 px-4 py-4 max-md:bleed md:-mx-4">
        <span>
          <PictureFilledIcon className="h-10 w-10 fill-gray-600" />
        </span>
        <span className="flex h-12 flex-1 items-center rounded-full bg-gray-100 px-6 font-medium text-gray-600">
          메세지 보내기
        </span>
      </div>
    </div>
  );
};

const Chat = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  if (breakpoint === "narrow")
    return (
      <>
        <ChatListView />
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
            <ChatRoomView />
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
  mobileNav: true,
  rawHeader: (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
          채팅
        </span>
        <span></span>
        <span></span>
      </div>
    </>
  ),
});
