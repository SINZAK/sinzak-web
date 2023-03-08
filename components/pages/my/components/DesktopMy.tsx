import { ProductElement } from "@components/elements/ProductElement";
import { FeaturedCarousel } from "@components/pages/home/components/FeaturedCarousel";

import { ProductsCarousel } from "./ProductsCarousel";
import DesktopLayout from "../DesktopLayout";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

export const DesktopMy = () => {
  const { data } = useMyProfileQuery();

  if (!data) return <DesktopLayout />;
  const { products, works, workEmploys } = data;

  return (
    <DesktopLayout>
      <div className="flex flex-col space-y-10">
        {products.length > 0 && (
          <ProductsCarousel type="market" title="판매 작품" data={products} />
        )}
        {works.length > 0 && (
          <ProductsCarousel type="work" title="의뢰해요" data={works} />
        )}
        {workEmploys.length > 0 && (
          <ProductsCarousel type="work" title="작업해요" data={workEmploys} />
        )}
      </div>
    </DesktopLayout>
  );
};
