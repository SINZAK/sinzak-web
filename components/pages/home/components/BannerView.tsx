import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";

export const BannerView = () => {
  const { data } = useQuery<
    {
      id: number;
      title: string;
      content: string;
      imageUrl: string;
    }[]
  >(["bannerTest"], async () => {
    return (await http.get("/banner")).data;
  });

  return (
    <div className="max-md:container lg:w-full md:pt-7 lg:bg-gray-100 lg:py-7">
      <Flicking
        circular={true}
        clrcularFallback="bound"
        align="center"
        hideBeforeInit={true}
      >
        {data
          ? data?.map((banner, i) => (
              <div
                className="mr-3 lg:mr-7 w-full md:w-4/5 lg:w-lg aspect-[343/147] md:aspect-[4/1] bg-white rounded-xl bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${banner.imageUrl})`,
                }}
                key={i}
              >
                <p className="absolute text-4xl font-bold text-white top-6 left-8">
                  테스트
                </p>
                <p className="absolute text-2xl font-bold text-white bottom-6 left-8">
                  테스트
                </p>
              </div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div
                className="mr-3 lg:mr-7 w-full md:w-4/5 lg:w-lg aspect-[343/147] md:aspect-[4/1] bg-gray-200 rounded-xl"
                key={i}
              />
            ))}
      </Flicking>
    </div>
  );
};
