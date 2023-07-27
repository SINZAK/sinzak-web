import { FeaturedCarousel } from "./FeaturedCarousel";
import { useFeaturedQuery } from "../queries/useFeaturedQuery";

export const FeaturedView = () => {
  const { data } = useFeaturedQuery();

  if (!data)
    return (
      <div className="space-y-12 md:space-y-16">
        <FeaturedCarousel />
        <FeaturedCarousel />
      </div>
    );

  return (
    <div className="space-y-12 md:space-y-16">
      {data.recommend && data.recommend?.length > 0 && (
        <FeaturedCarousel
          href="/market"
          title="추천하는 거래"
          data={data.recommend}
        />
      )}
      {data.following && data.following?.length > 0 && (
        <FeaturedCarousel title="내가 팔로잉하는 작가" data={data.following} />
      )}
      {data.new && data.new?.length > 0 && (
        <FeaturedCarousel
          href='/market#align="recent"'
          title="최신 작품"
          data={data.new}
        />
      )}
      {data.hot && data.hot?.length > 0 && (
        <FeaturedCarousel
          href="/market"
          title="신작에서 사랑받는 작품"
          data={data.hot}
        />
      )}
    </div>
  );
};
