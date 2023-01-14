import { ProductElement } from "@components/elements/product/ProductElement";
import { useProductQuery } from "../queries/product";
import { useFilter } from "../states/filter";

export const ProductsView = () => {
  const filter = useFilter();
  const { data, isLoading } = useProductQuery(filter);

  return (
    <div className="flex flex-wrap flex-1 gap-x-3 md:gap-x-7 gap-y-7">
      {(isLoading
        ? Array.from({ length: 16 }, () => undefined)
        : data?.content || []
      ).map((_, i) => (
        <ProductElement
          data={_}
          className="flex-[1_1_40%] sm:flex-[1_1_240px]"
          key={i}
        />
      ))}
      {Array.from({ length: 2 }).map((_, i) => (
        <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
      ))}
    </div>
  );
};
