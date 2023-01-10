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
          className="py-4 md:-mx-4 md:px-4 max-md:bleed flex justify-between items-center"
          key={i}
        >
          <div className="flex space-x-4">
            <span className="inline-block w-12 h-12 rounded-xl bg-gray-200" />
            <div className="flex flex-col justify-around">
              <p className="font-medium flex items-center">
                <span>홍길동</span>
                <span className="space-x-1 text-sm ml-2 text-gray-600">
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
    <div className="flex flex-col max-md:container h-full md:px-4 max-md:bleed">
      <div className="h-12 flex items-center justify-between bg-white relative">
        <span className="font-bold absolute w-full flex top-0 left-0 h-full items-center justify-center">
          홍길동
        </span>
        <span>
          <BackIcon />
        </span>
        <span>
          <MenuIcon />
        </span>
      </div>
      <div className="flex space-x-4 py-4 px-2">
        <span className="inline-block w-10 h-10 rounded-xl bg-gray-200" />
        <div className="flex flex-col justify-around">
          <p className="flex items-center">
            <span className="text-sm space-x-1">
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
      <div className="flex flex-1 justify-end flex-col space-y-1">
        <ChatText own />
        <ChatText />
        <ChatText />
        <ChatText own />
        <ChatText own />
        <ChatText own />
        <ChatText />
      </div>
      <div className="flex max-md:bleed md:-mx-4 px-4 space-x-3 py-4 items-center">
        <span>
          <PictureFilledIcon className="fill-gray-600 w-10 h-10" />
        </span>
        <span className="flex-1 bg-gray-100 h-12 flex items-center px-6 font-medium rounded-full text-gray-600">
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
          <div className="overflow-y-scroll px-4">
            <ChatListView />
          </div>
          <div className="">
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
      <div className="h-12 flex container items-center justify-between bg-white relative">
        <span className="font-bold absolute w-full flex top-0 left-0 h-full items-center justify-center">
          채팅
        </span>
        <span></span>
        <span></span>
      </div>
    </>
  ),
});
