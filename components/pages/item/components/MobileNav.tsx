import { useAuth } from "@lib/services/auth";
import { useQueryContext } from "../states/QueryProvider";
import { LikeButton, LikeButtonPlaceholder } from "./LikeButton";

export const MobileNav = () => {
  const { useItemQuery } = useQueryContext();
  const { user } = useAuth();
  const { data } = useItemQuery();

  return (
    <div className="fixed bottom-0 z-30 w-full bg-white md:hidden">
      <div className="flex w-full items-start space-x-2 px-3 pt-3 pb-2">
        <div className="mt-1.5 flex divide-x px-4 text-lg">
          {data ? (
            <LikeButton
              id={data.id}
              userId={data.userId}
              likesCnt={data.likesCnt}
              isLike={data.like}
            />
          ) : (
            <LikeButtonPlaceholder />
          )}
          <button className="flex flex-col items-center pl-4">
            <img
              alt="bookmark"
              src="/assets/icons/bookmark.svg"
              className="h-8 opacity-50"
            />
            <p className="mt-1 text-sm text-gray-600">찜하기</p>
          </button>
        </div>
        {data && data?.userId !== user?.userId ? (
          <div className="flex h-[4.25rem] flex-1 flex-col">
            <button className="flex items-center justify-center rounded-full bg-red p-2 font-bold text-white">
              <img
                alt="ask"
                src="/assets/icons/ask.svg"
                className="mr-1 h-7 brightness-0 invert"
              />
              거래 문의하기
            </button>
            <button className="mt-1 text-sm font-bold text-purple">
              가격 제안하기
            </button>
          </div>
        ) : (
          <div className="flex h-[4.25rem] flex-1 flex-col self-center">
            <button className="flex items-center justify-center rounded-full bg-red p-2 font-bold text-white">
              <img
                alt="ask"
                src="/assets/icons/ask.svg"
                className="mr-1 h-7 brightness-0 invert"
              />
              문의 중인 채팅방 {data?.chatCnt || 0}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
