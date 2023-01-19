import { useAuth } from "@lib/services/auth";

import { Button } from "@components/atoms/Button";

import { useQueryContext } from "../states/QueryProvider";
import { LikeButton, LikeButtonPlaceholder } from "./LikeButton";
import { WishButton, WishButtonPlaceholder } from "./WishButton";

export const MobileNav = () => {
  const { useItemQuery } = useQueryContext();
  const { user } = useAuth();
  const { data } = useItemQuery();

  return (
    <div className="fixed bottom-0 z-30 h-[5.25rem] w-full bg-white md:hidden">
      <div className="flex w-full items-start space-x-2 px-3 py-2">
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
          {data ? (
            <WishButton id={data.id} userId={data.userId} isWish={data.wish} />
          ) : (
            <WishButtonPlaceholder />
          )}
        </div>
        {data ? (
          data?.userId !== user?.userId ? (
            <div className="flex flex-1 flex-col">
              <Button size="large" intent="primary">
                <img
                  alt="ask"
                  src="/assets/icons/ask.svg"
                  className="mr-1 h-7 brightness-0 invert"
                />
                거래 문의하기
              </Button>
              <button className="-pb-1 py-1 text-sm font-bold text-purple">
                가격 제안하기
              </button>
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <Button size="large" intent="primary">
                <img
                  alt="ask"
                  src="/assets/icons/ask.svg"
                  className="mr-1 h-7 brightness-0 invert"
                />
                문의 중인 채팅방 {data?.chatCnt || 0}
              </Button>
            </div>
          )
        ) : (
          <div className="flex flex-1 flex-col">
            <Button size="large" intent="primary" as="div"></Button>
          </div>
        )}
      </div>
    </div>
  );
};
