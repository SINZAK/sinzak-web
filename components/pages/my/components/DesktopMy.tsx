import { ProductElement } from "@components/elements/ProductElement";
import { FeaturedCarousel } from "@components/pages/home/components/FeaturedCarousel";

import { ProductsCarousel } from "./ProductsCarousel";
import Layout from "../layout";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

export const DesktopMy = () => {
  const { data } = useMyProfileQuery();

  if (!data) return <Layout />;
  const { products, works, workEmploys } = data;

  return (
    <Layout>
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
    </Layout>
  );
};
