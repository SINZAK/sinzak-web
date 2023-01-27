import { useQuery } from "@tanstack/react-query";

import { http } from "@lib/services/http";

import { FeaturedCarousel } from "./FeaturedCarousel";


export const FeaturedView = () => {
  const { data } = useQuery(["featuredTest"], async () => {
    return (await http.post.default("/home/products")).data;
  });

  return (
    <div className="space-y-12 md:space-y-16">
      <FeaturedCarousel title="최신 작품" data={data?.new} />
      <FeaturedCarousel title="신작에서 사랑받는 작품" data={data?.hot} />
      <FeaturedCarousel title="지금 거래중" data={data?.recommend} />
    </div>
  );
};
