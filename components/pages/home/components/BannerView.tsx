import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

export const BannerView = () => {
  return (
    <div className="max-md:container lg:w-full md:pt-7 lg:bg-gray-100 lg:py-7">
      <Flicking
        circular={true}
        clrcularFallback="bound"
        align="center"
        hideBeforeInit={true}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            className="mr-3 lg:mr-7 w-full md:w-4/5 lg:w-lg aspect-[343/147] md:aspect-[4/1] bg-gray-200 rounded-xl"
            key={i}
          ></div>
        ))}
      </Flicking>
    </div>
  );
};
