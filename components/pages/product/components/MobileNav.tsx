import { useProductQuery } from "../queries/product";
import { LikeButton, LikeButtonPlaceholder } from "./LikeButton";

export const MobileNav = () => {
  const { data } = useProductQuery();

  return (
    <div className="flex items-start w-full px-3 pt-3 pb-2 space-x-2">
      <div className="flex text-lg divide-x mt-1.5 px-4">
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
      <div className="flex flex-col flex-1">
        <button className="flex items-center justify-center p-2 font-bold text-white rounded-full bg-red">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="mr-1 h-7 invert brightness-0"
          />
          거래 문의하기
        </button>
        <button className="mt-1 text-sm font-bold text-purple">
          가격 제안하기
        </button>
      </div>
    </div>
  );
};
