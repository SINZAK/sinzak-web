import {
  filterCategoriesAtom,
  filterStore,
} from "@components/pages/market/states/filter";
import Flicking from "@egjs/react-flicking";
import Link from "next/link";

const categories = [
  ["회화\n일반", "painting"],
  ["동양화", "orient"],
  ["조소", "sculpture"],
  ["판화", "print"],
  ["공예", "craft"],
  ["기타", "other"],
] as const;

export const GenreView = () => {
  return (
    <div className="flex flex-col space-y-5 md:space-y-10 md:items-center">
      <div className="flex flex-col space-y-2 md:items-center">
        <p className="text-xl font-bold md:text-2xl">장르별 작품</p>
        <p className="hidden md:block">원하는 장르의 작품을 직접 찾아보세요</p>
      </div>
      <Flicking
        bound
        align="prev"
        className="bleed"
        cameraClass="space-x-3 lg:space-x-7"
      >
        {categories.map((_, i) => (
          <Link
            href={`/market#categories=${encodeURIComponent(
              JSON.stringify(`[${_[1]}]`)
            )}`}
            onClick={() => {
              setTimeout(
                () => filterStore.set(filterCategoriesAtom, [_[1]]),
                0
              );
            }}
            key={_[1]}
            className="flex items-center justify-center w-24 text-lg font-bold leading-tight text-white whitespace-pre-line bg-cover aspect-square rounded-xl"
            draggable="false"
            style={{
              backgroundImage: `url("/assets/images/cate-${_[1]}.jpg")`,
            }}
          >
            {_[0]}
          </Link>
        ))}
      </Flicking>
    </div>
  );
};
