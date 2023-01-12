import NoSsr from "@components/atoms/NoSsr";
import { createLayout } from "@components/layout/layout";
import { BackIcon, MenuIcon, PictureFilledIcon } from "@lib/icons";
import { cx } from "class-variance-authority";
import useBreakpoint from "use-breakpoint";

const BREAKPOINTS = { narrow: 0, wide: 960 };

const ChatListView = () => {
  return (
    <div className="flex flex-col max-md:container">
      {Array.from({ length: 20 }).map((_, i) => (
        <button
          className="flex items-center justify-between py-4 md:-mx-4 md:px-4 max-md:bleed"
          key={i}
        >
          <div className="flex space-x-4">
            <span className="inline-block w-12 h-12 bg-gray-200 rounded-xl" />
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
            <span className="inline-flex min-w-[1.5rem] h-6 bg-purple items-center justify-center rounded-full text-sm text-white font-bold">
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
        "px-4 py-2 rounded-full",
        own ? "self-end bg-red text-white" : "self-start bg-gray-100 text-black"
      )}
    >
      동해물과 백두산이 마르고 닳도록
    </div>
  );
};

const ChatRoomView = () => {
  return (
    <div className="flex flex-col h-full max-md:container md:px-4 max-md:bleed">
      <div className="relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
          홍길동
        </span>
        <span>
          <BackIcon />
        </span>
        <span>
          <MenuIcon />
        </span>
      </div>
      <div className="flex px-2 py-4 space-x-4">
        <span className="inline-block w-10 h-10 bg-gray-200 rounded-xl" />
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
      <div className="flex flex-col flex-[1_1_auto] min-h-0 space-y-1 overflow-y-scroll max-md:bleed md:-mx-4 md:px-4">
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
      <div className="flex items-center px-4 py-4 space-x-3 max-md:bleed md:-mx-4">
        <span>
          <PictureFilledIcon className="w-10 h-10 fill-gray-600" />
        </span>
        <span className="flex items-center flex-1 h-12 px-6 font-medium text-gray-600 bg-gray-100 rounded-full">
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
        <div className="grid mx-auto grid-cols-2 divide-x relative max-w-5xl h-[80vh] mt-7 ring-1 ring-gray-100">
          <div className="px-4 overflow-y-scroll">
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
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
          채팅
        </span>
        <span></span>
        <span></span>
      </div>
    </>
  ),
});
