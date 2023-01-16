import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import { ProductDetail } from "@types";
import { useRouter } from "next/router";

export const useProductQuery = () => {
  const router = useRouter();

  return useQuery<ProductDetail>(
    ["productTest", Number(router.query.slug)],
    async () => {
      return (await http.post.default(`/products/${router.query.slug}`)).data;
    },
    {
      enabled: !!router.query.slug,
    }
  );
};
